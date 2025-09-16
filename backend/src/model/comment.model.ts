import { Schema, model, Document, Types } from 'mongoose';

// 💬 3. Comment Relationships

// Each Comment:
// Is written by one User (One-to-One via author)
// Belongs to one Post (One-to-One via post)


// Step 1: Define the TypeScript interface
export interface IComment extends Document {
  text: string;
  author: Types.ObjectId;
  post: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Step 2: Define the Mongoose schema
const commentSchema = new Schema<IComment>(
  {
    text: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  },
  { timestamps: true }
);

// Step 3: Export the model
export const Comment = model<IComment>('Comment', commentSchema);
