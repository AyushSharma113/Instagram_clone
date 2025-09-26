import { Schema, model, Document, Types, type InferSchemaType } from 'mongoose';

// 💬 3. Comment Relationships

// Each Comment:
// Is written by one User (One-to-One via author)
// Belongs to one Post (One-to-One via post)




// Step 1: Define the Mongoose schema
const commentSchema = new Schema(
  {
    text: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  },
  { timestamps: true }
);

// step 2: infer the typescript type from the schema 
export type IComment = InferSchemaType<typeof commentSchema>

// Step 3: Export the model
export const Comment = model<IComment>('Comment', commentSchema);
