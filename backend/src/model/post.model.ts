import { Schema, model, Document, Types, type InferSchemaType } from 'mongoose';



//  Post Relationships

// Each Post:
// Belongs to one User (One-to-One via author)
// Can be liked by many Users (Many-to-Many)
// Can have many Comments (One-to-Many)


// Step 1: Define the Mongoose schema
const postSchema = new Schema(
  {
    caption: { type: String, default: '' },
    image: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  },
  { timestamps: true }
);


// step 2: infer the typescript type from the schema 
export type IPost = InferSchemaType<typeof postSchema>


// Step 3: Export the model
export const Post = model<IPost>('Post', postSchema);
