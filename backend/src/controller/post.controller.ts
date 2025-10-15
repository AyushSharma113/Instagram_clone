import type { Request ,Response } from "express";
import sharp from "sharp"
import cloudinary from "../utils/claudinary.ts";
import { Post } from "../model/post.model.ts";
import { User } from "../model/user.model.ts";
import type { CustomRequest } from "../types/post-request.ts";


export const addNewPost = async (req: CustomRequest, res: Response): Promise<Response | void> => {
    try {
        const {caption} = req.body;
        const image = req.file;
        const authorId = req.id;

        if(!image){
            res.status(400).json({message: "image required"})
        }
        
        // optimize image 
        const optimizedImageBuffer = await sharp(image?.buffer)
         .resize({ width: 800, height: 800, fit: 'inside' })
        .toFormat('jpeg', { quality: 80 })
        .toBuffer();

        // convert bufer to data uri 
        const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;

        const cloudResponse = await cloudinary.uploader.upload(fileUri);

        const post = await Post.create({
            caption,
            image: cloudResponse.secure_url,
            author: authorId
        })
        
        // push the post id to the author's post list 
        const user = await User.findById(authorId);
        if(user){
            user.posts.push(post._id);
            await user.save();
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
            message: "internal server error " + error
        })
    }
}

