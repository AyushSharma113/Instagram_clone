import type { Response } from "express";
import type { CustomRequest } from "../types/post-request.ts";
import sharp from "sharp";
import cloudinary from "../utils/claudinary.ts";
import { Post } from "../model/post.model.ts";
import { User } from "../model/user.model.ts";
import { Comment } from "../model/comment.model.ts";



export const addNewPost = async (req: CustomRequest, res: Response): Promise<Response | void> => {
    try {
        const {caption} = req.body;
        const image = req.file;
        const authorId = req.id;

        if(!image){
            return res.status(400).json({
                message: 'image is required'
            })
        }
        
        // optimize image 
        const optimizedImageBuffer = await sharp(image?.buffer)
            .resize({width: 800, height: 800, fit: "inside"})
            .toFormat('jpeg', {quality: 80})
            .toBuffer();
        
        // convert buffer to data uri 
        const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
        
        // upload it on the cloudinary 
        const cloudResponse = await cloudinary.uploader.upload(fileUri)
        

        const post = await Post.create({
            caption,
            image: cloudResponse.secure_url,
            author: authorId
        })
        

        // push the post id to the author's post list
        const user = await User.findById(authorId);
        if(user){
            user.posts.push(post._id)
            await user.save()
        }
        

        await post.populate({path: 'author', select: '-password'})
        
                
        return res.status(201).json({
            message: 'new post uploaded',
            post,
            success: true
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'internal server error'
        })
    }
}



export const getAllPost = async (req: CustomRequest, res: Response): Promise<Response | void> => {
    try {
        const posts = await Post.find().sort({createdAt: -1})
            .populate({path: 'author', select: 'username profilePicture'} )
            .populate({
                path:'comments',
                populate: {
                    path: 'author',
                    select: 'username profilePicture'
                }
            })
            .sort({ 'comments.createdAt': -1 })

        return res.status(200).json({
            posts,
            success: true
        })
        
    } catch (error) {
          console.log(error)
        return res.status(500).json({
            message: 'internal server error'
        })
    
    }
}


export const getUserPost = async (req: CustomRequest, res: Response): Promise<Response | void> => {
    try {

        const authorId = req.id;
        const posts = await Post.find({author: authorId}).sort({createdAt: -1}).populate({
            path: 'author',
            select: 'username, profilePicture'
        }).populate({
            path: 'comments',
            populate: {
                path: 'author',
                select: 'username, profilePicture'
            }
        })
        .sort({ 'comments.createdAt': -1 })
        
         return res.status(200).json({
            posts,
            success: true
        })
    } catch (error) {
         console.log(error)
        return res.status(500).json({
            message: 'internal server error'
        })
    }
}


