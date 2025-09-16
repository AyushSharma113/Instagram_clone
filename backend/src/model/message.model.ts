import { Schema, model, Document, Types } from 'mongoose';


// 📩 4. Message Relationships
// Each Message:
// Is sent by one User (senderId)
// Is received by one User (receiverId)
// Belongs to a Conversation indirectly (via its inclusion in Conversation.messages[])

// Step 1: Define the TypeScript interface
export interface IMessage extends Document {
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

// Step 2: Define the Mongoose schema
const messageSchema = new Schema<IMessage>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Step 3: Export the model
export const Message = model<IMessage>('Message', messageSchema);
