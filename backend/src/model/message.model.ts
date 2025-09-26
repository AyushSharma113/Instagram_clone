import { Schema, model, Document, Types, type InferSchemaType } from 'mongoose';


//  Message Relationships
// Each Message:
// Is sent by one User (senderId)
// Is received by one User (receiverId)
// Belongs to a Conversation indirectly (via its inclusion in Conversation.messages[])



// Step 1: Define the Mongoose schema
const messageSchema = new Schema(
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

// step 2: infer the typescript type from the schema 
export type IMessage = InferSchemaType<typeof messageSchema>

// Step 3: Export the model
export const Message = model<IMessage>('Message', messageSchema);
