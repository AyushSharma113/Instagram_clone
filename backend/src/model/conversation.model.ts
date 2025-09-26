import { Schema, model, Document, Types, type InferSchemaType } from 'mongoose';


//  Conversation Relationships
// Each Conversation:
// Has multiple participants (array of Users)
// Has multiple messages (array of Messages)


// Step 1: Define the Mongoose schema
const conversationSchema = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Message',
      },
    ],
  },
  { timestamps: true } // Adds createdAt and updatedAt
);


// step 2: infer the typescript type from the schema 
export type IConversation = InferSchemaType<typeof conversationSchema>


// Step 3: Export the model
export const Conversation = model<IConversation>('Conversation', conversationSchema);
