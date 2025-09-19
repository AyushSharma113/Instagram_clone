import type { Request, Response } from 'express';

import jwt from 'jsonwebtoken';
import { User } from '../model/user.model.ts';
import bcrypt from 'bcryptjs';
import { Post } from '../model/post.model.ts';


interface RegisterRequest extends Request {
    body: {
        username: string;
        email: string;
        password: string;
    };
}

interface LoginRequest extends Request {
    body: {
        email: string;
        password: string;
    };
}

export const register = async (req: RegisterRequest, res: Response): Promise<Response | void> => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: 'All fields are required.',
                success: false,
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: 'Email already in use.',
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
            message: 'Account created successfully.',
            success: true,
        });
    } catch (error) {
        console.error('Register Error:', error);
        return res.status(500).json({
            message: 'Internal server error.',
            success: false,
        });
    }
};

export const login = async (req: LoginRequest, res: Response): Promise<Response | void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required.',
                success: false,
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password.',
                success: false,
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid email or password.',
                success: false,
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY as string, {
            expiresIn: '1d',
        });

        // Populate user's own posts
        const populatedPosts = await Promise.all(
            user.posts.map(async (postId) => {
                const post = await Post.findById(postId);
                return post && post.author.equals(user._id) ? post : null;
            })
        );

        const filteredPosts = populatedPosts.filter(Boolean); // Remove nulls

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
            .cookie('token', token, {
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 24 * 60 * 60 * 1000, // 1 day
            })
            .json({
                message: `Welcome back ${user.username}`,
                success: true,
                user: userData,
            });
    } catch (error) {
        console.error('Login Error:', error);
        return res.status(500).json({
            message: 'Internal server error.',
            success: false,
        });
    }
};

export const logout = async (_: Request, res: Response): Promise<Response> => {
    try {
        return res
            .cookie('token', '', { maxAge: 0 })
            .json({
                message: 'Logged out successfully.',
                success: true,
            });
    } catch (error) {
        console.error('Logout Error:', error);
        return res.status(500).json({
            message: 'Internal server error.',
            success: false,
        });
    }
};
