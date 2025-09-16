import { Schema, model, Document, Types } from 'mongoose';



// 📸 2. Post Relationships

// Each Post:
// Belongs to one User (One-to-One via author)
// Can be liked by many Users (Many-to-Many)
// Can have many Comments (One-to-Many)



// Step 1: Define the TypeScript interface
export interface IPost extends Document {
  caption?: string;
  image: string;
  author: Types.ObjectId;
  likes: Types.ObjectId[];
  comments: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

// Step 2: Define the Mongoose schema
const postSchema = new Schema<IPost>(
  {
    caption: { type: String, default: '' },
    image: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true }
);

// Step 3: Export the model
export const Post = model<IPost>('Post', postSchema);
