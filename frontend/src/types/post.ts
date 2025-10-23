// src/types/post.ts
export interface Post {
  _id: string;
  author: {
    _id: string;
    username: string;
    profilePicture?: string;
  };
  caption: string;
  image: string;
  comments: unknown;
  likes: unknown;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
