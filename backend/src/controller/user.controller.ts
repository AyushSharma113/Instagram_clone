import type { Request, Response } from "express";
import { User } from "../model/user.model.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Post } from "../model/post.model.ts";
import { populate } from "dotenv";

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

export const login = async (req: Request, res: Response): Promise<Response | void> => {
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

    const filteredPosts = populatedPosts.filter(post => post !== null)
    

     const userData = {
         _id: user._id,
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
            bio: user.bio,
            followers: user.followers,
            following: user.following,
            posts: filteredPosts
    }
    
      return res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 1 * 24 * 60 * 60 * 1000 }).json({
            message: `Welcome back ${userData.username}`,
            success: true,
            user: userData
        });
  } catch (error) {
    console.log(error as Error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};


export const logout = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        
          return res.cookie("token", "", { maxAge: 0 }).json({
            message: 'Logged out successfully.',
            success: true
        });
        
    } catch (error) {
         console.log(error as Error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
    }
}
