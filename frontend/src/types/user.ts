import type { Post } from './post';

export interface User {
  _id: string;
  username: string;
  email: string;
  bio?: string;
  profilePicture?: string;
  followers: string[]; // or maybe User[] if you populate them later
  following: string[];
  posts: Post[];
}
