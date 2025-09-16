npm install express bcryptjs cookie-parser cors jsonwebtoken mongoose
npm install -D typescript ts-node @types/node @types/express

change type to module form commonjs

genrate tsconfig.json file
npx tsc --init  


https://youtu.be/ZgBdPqKVpEk?si=9RUwaJzEdYq87-a5


***************user.controller.ts****************
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/userModel";
import Post from "../models/postModel";

// Helper: standardized error response
const handleServerError = (res: Response, error: unknown, label: string) => {
  console.error(`${label} Error:`, (error as Error).message);
  return res.status(500).json({
    message: "Internal Server Error",
    success: false,
  });
};

// Helper: Shape safe user
const shapeUser = async (user: IUser) => {
  const populatedPosts = await Promise.all(
    user.posts.map(async (postId) => {
      const post = await Post.findById(postId);
      return post?.author.equals(user._id) ? post : null;
    })
  );

  return {
    _id: user._id,
    username: user.username,
    email: user.email,
    profilePicture: user.profilePicture,
    bio: user.bio,
    followers: user.followers,
    following: user.following,
    posts: populatedPosts.filter(Boolean),
  };
};

// ------------------ REGISTER ------------------
export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists.",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashedPassword });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (error) {
    return handleServerError(res, error, "Register");
  }
};

// ------------------ LOGIN ------------------
export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        message: "Invalid email or password.",
        success: false,
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY as string, {
      expiresIn: "1d",
    });

    const safeUser = await shapeUser(user);

    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        message: `Welcome back ${user.username}`,
        success: true,
        user: safeUser,
      });
  } catch (error) {
    return handleServerError(res, error, "Login");
  }
};

// ------------------ LOGOUT ------------------
export const logout = async (_: Request, res: Response): Promise<Response> => {
  try {
    return res
      .cookie("token", "", { maxAge: 0 })
      .json({ message: "Logged out successfully.", success: true });
  } catch (error) {
    return handleServerError(res, error, "Logout");
  }
};

// ------------------ GET PROFILE ------------------
export const getProfile = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const user = await User.findById(id)
      .populate({ path: "posts", options: { sort: { createdAt: -1 } } })
      .populate("bookmarks");

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    return res.status(200).json({ user, success: true });
  } catch (error) {
    return handleServerError(res, error, "Get Profile");
  }
};


