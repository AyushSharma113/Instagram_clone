// src/types/post.ts
import type { Comment } from './comment'

export interface Post {
  _id: string;
  author: {
    _id: string;
    username: string;
    profilePicture?: string;
  };
  caption: string;
  image: string;
   likes: string[];       // array of user IDs
  comments: Comment[];   // array of comment objects
  createdAt: string;
  updatedAt: string;
  __v: number;
}
