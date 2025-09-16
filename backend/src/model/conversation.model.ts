import { Schema, model, Document, Types } from 'mongoose';


// 🧵 5. Conversation Relationships
// Each Conversation:
// Has multiple participants (array of Users)
// Has multiple messages (array of Messages)



// Step 1: Define the TypeScript interface
export interface IConversation extends Document {
  participants: Types.ObjectId[];
  messages: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

// Step 2: Define the Mongoose schema
const conversationSchema = new Schema<IConversation>(
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

// Step 3: Export the model
export const Conversation = model<IConversation>('Conversation', conversationSchema);
