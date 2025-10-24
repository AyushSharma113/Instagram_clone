import type { Response } from "express";
import type { CustomRequest } from "../types/post-request.ts";
import sharp from "sharp";
import cloudinary from "../utils/claudinary.ts";
import { Post } from "../model/post.model.ts";
import { User, type IUser } from "../model/user.model.ts";
import { Comment } from "../model/comment.model.ts";

export const addNewPost = async (
  req: CustomRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const { caption } = req.body;
    const image = req.file;
    const authorId = req.id;

    if (!image) {
      return res.status(400).json({
        message: "image is required",
      });
    }

    // optimize image
    const optimizedImageBuffer = await sharp(image?.buffer)
      .resize({ width: 800, height: 800, fit: "inside" })
      .toFormat("jpeg", { quality: 80 })
      .toBuffer();

    // convert buffer to data uri
    const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
      "base64"
    )}`;

    // upload it on the cloudinary
    const cloudResponse = await cloudinary.uploader.upload(fileUri);

    const post = await Post.create({
      caption,
      image: cloudResponse.secure_url,
      author: authorId,
    });

    // push the post id to the author's post list
    const user = await User.findById(authorId);
    if (user) {
      user.posts.push(post._id);
      await user.save();
    }

    await post.populate({ path: "author", select: "-password" });

    return res.status(201).json({
      message: "new post uploaded",
      post,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const getAllPost = async (
  req: CustomRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "username profilePicture" })
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "username profilePicture",
        },
      })
      .sort({ "comments.createdAt": -1 });

    return res.status(200).json({
      posts,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const getUserPost = async (
  req: CustomRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const authorId = req.id;
    const posts = await Post.find({ author: authorId })
      .sort({ createdAt: -1 })
      .populate({
        path: "author",
        select: "username, profilePicture",
      })
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "username, profilePicture",
        },
      })
      .sort({ "comments.createdAt": -1 });

    return res.status(200).json({
      posts,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const likePost = async (
  req: CustomRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const userWhoLikes = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "post not found",
        success: false,
      });
    }

    // liking post logic
    await post.updateOne({ $addToSet: { likes: userWhoLikes } });
    await post.save();

    return res.status(200).json({
      message: "Post liked",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const dislikePost = async (
  req: CustomRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const userWhoDislikes = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "page not found",
        success: false,
      });
    }

    // dislike logic here
    await post.updateOne({ $pull: { likes: userWhoDislikes } });
    await post.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const addComment = async (
  req: CustomRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const postId = req.params.id;
    const userWhoComments = req.id;
    const { text } = req.body;
    const post = await Post.findById(postId);

    if (!text)
      return res
        .status(400)
        .json({ message: "text is required", success: false });

    const comment = await Comment.create({
      text,
      author: userWhoComments,
      post: postId,
    });

    await comment.populate({
      path: "author",
      select: "username profilePicture",
    });

    post?.comments.push(comment._id);
    await post?.save();

    return res.status(201).json({
      message: "comment added",
      comment,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const getCommentOfPost = async (
  req: CustomRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const postId = req.params.id;

    const comments = await Comment.find({ post: postId }).populate(
      "author",
      "username profilePicture"
    );
    if (!comments)
      return res.status(404).json({
        message: "no comments found for this post",
        success: false,
      });

    return res.status(200).json({ success: true, comments });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const deletePost = async (
  req: CustomRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const postId = req.params.id;
    const authorId = req.id;

    const post = await Post.findById(postId);
    if (!post)
      return res.status(404).json({
        message: "post not found",
        success: false,
      });

    // check the loggedin user is the owner of the post or not
    if (post?.author?.toString() !== authorId)
      return res.status(403).json({ message: "Unauthorized" });

    // delete post
    await Post.findByIdAndDelete(postId);

    // remove the post id from the user post
    const user = await User.findById(authorId);
    if (user) {
      user.posts = user.posts.filter((id) => id.toString() !== postId);
      await user.save();
    } else {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // delete associated comments
    await Comment.deleteMany({ post: postId });

    return res.status(200).json({
      success: true,
      message: "Post deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};

export const bookmarkPost = async (
  req: CustomRequest,
  res: Response
): Promise<Response | void> => {
  try {
    const postId = req.params.id;
    const authorId = req.id;
    const post = await Post.findById(postId);
    if (!post)
      return res
        .status(404)
        .json({ message: "Post not found", success: false });

    const user = await User.findById(authorId);

    // already bookmarked -> remove from the bookmark
    if (user?.bookmarks.includes(post._id)) {
      await user.updateOne({ $pull: { bookmarks: post } });
      await user.save();
      return res
        .status(200)
        .json({
          type: "unsaved",
          message: "post removed from bookmark",
          success: true,
        });
    } else {
      // bookmark krna pdega
      await user.updateOne({ $addToSet: { bookmarks: post._id } });
      await user.save();
      return res
        .status(200)
        .json({ type: "saved", message: "Post bookmarked", success: true });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "internal server error",
    });
  }
};
