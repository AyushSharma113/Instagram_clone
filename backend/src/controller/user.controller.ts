import type { Request, Response } from "express";
import { User } from "../model/user.model.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Post } from "../model/post.model.ts";
import { populate } from "dotenv";
import getDataUri from "../utils/dataUri.ts";
import cloudinary from "../utils/claudinary.ts";

interface AuthRequest extends Request {
  id?: string;
}

export const register = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(401).json({
        message: "Something is missing, please check!",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "Try different email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error as Error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

export const login = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: "Something is missing, please check!",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "account dont exist",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "1d",
      }
    );

    // populate each post if in the posts array
    const populatedPosts = await Promise.all(
      user.posts.map(async (postId) => {
        const post = await Post.findById(postId);
        if (post && post.author.equals(user._id)) {
          return post;
        }
        return null;
      })
    );

    const filteredPosts = populatedPosts.filter((post) => post !== null);

    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      posts: filteredPosts,
    };

    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: `Welcome back ${userData.username}`,
        success: true,
        user: userData,
      });
  } catch (error) {
    console.log(error as Error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

export const logout = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    return res.cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error as Error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

export const getProfile = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(401).json({
        message: "something is wrong",
        success: false,
      });
    }

    let user = await User.findById(userId)
      .populate({ path: "posts", options: { sort: { createdAt: -1 } } })
      .populate("bookmarks");

    return res.status(200).json({
      user,
      success: true,
    });
  } catch (error) {
    console.log(error as Error);
    return res.status(401).json({
      message: "internal server error",
      success: false,
    });
  }
};

export const editProfile = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const userId = (req as AuthRequest).id;
    const { bio, gender } = req.body;
    const profilePicture = req.file;

    let cloudResponse;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    if (profilePicture) {
      const fileUri = getDataUri(profilePicture);
      cloudResponse = await cloudinary.uploader.upload(fileUri);
    }

    if (bio) user.bio = bio;
    if (gender) user.gender = gender;
    if (profilePicture && cloudResponse?.secure_url)
      user.profilePicture = cloudResponse.secure_url;

    await user.save();

    return res.status(200).json({
      message: "Profile updated.",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error as Error);
    return res.status(401).json({
      message: "internal server error",
      success: false,
    });
  }
};

export const getSuggestedUsers = async (
  req: AuthRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const suggestedUsers = await User.find({ _id: { $ne: req.id } }).select(
      "-password"
    ); // “Find all users whose _id is not equal to the currently logged-in user's ID.”

    if (!suggestedUsers) {
      return res.status(400).json({
        message: "currently do not have any Users",
      });
    }

    return res.status(200).json({
      success: true,
      users: suggestedUsers,
    });
  } catch (error) {
    console.log(error as Error);
    return res.status(401).json({
      message: "internal server error",
      success: false,
    });
  }
};

export const followOrUnfollow = async (
  req: AuthRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const followKrneWalaUser = req.id as string;
    const jiskoFollowKrunga = req.params.id;

    if (followKrneWalaUser === jiskoFollowKrunga) {
      return res.status(400).json({
        message: "You cannot follow/unfollow yourself",
        success: false,
      });
    }

    const user = await User.findById(followKrneWalaUser);
    const targetUser = await User.findById(jiskoFollowKrunga);

    if (!user || !targetUser) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

      // Check if already following
        const isFollowing = user.following.includes(jiskoFollowKrunga as any);

          if (isFollowing) {
            // unfollow logic ayega
            await Promise.all([
                User.updateOne({ _id: followKrneWalaUser }, { $pull: { following: jiskoFollowKrunga } }),
                User.updateOne({ _id: jiskoFollowKrunga }, { $pull: { followers: followKrneWalaUser } }),
            ])
            return res.status(200).json({ message: 'Unfollowed successfully', success: true });
        } else {
            // follow logic ayega
            await Promise.all([
                User.updateOne({ _id: followKrneWalaUser }, { $push: { following: jiskoFollowKrunga } }),
                User.updateOne({ _id: jiskoFollowKrunga }, { $push: { followers: followKrneWalaUser } }),
            ])
            return res.status(200).json({ message: 'followed successfully',user: User, success: true });
        }

    
  } catch (error) {
    console.log(error);
  }
};
