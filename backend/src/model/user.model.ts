import { Schema, model, Document, Types } from 'mongoose';


// 🔗 1. User Relationships

// Each User:
// Can create many Posts (One-to-Many)
// Can have many followers and following — both are arrays of other Users (Many-to-Many)
// Can bookmark many Posts (Many-to-Many)
// Can be the author of many Comments and Messages
// Can participate in many Conversations (Many-to-Many)
// Can receive and send many Messages (Two One-to-Many relationships)


// Step 1: Define the TypeScript interface
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  bio: string;
  gender?: 'male' | 'female';
  followers: Types.ObjectId[];
  following: Types.ObjectId[];
  posts: Types.ObjectId[];
  bookmarks: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

// Step 2: Define the Mongoose schema
const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: '' },
    bio: { type: String, default: '' },
    gender: { type: String, enum: ['male', 'female'] },
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    bookmarks: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  },
  { timestamps: true }
);

// Step 3: Export the model
export const User = model<IUser>('User', userSchema);
