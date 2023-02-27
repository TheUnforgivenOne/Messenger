import mongoose, { Schema, Types } from 'mongoose';
import { IChat } from 'monorepo-shared';

const ChatSchema = new Schema<IChat>({
  title: { type: String, required: true },
  users: { type: [Types.ObjectId], required: true, ref: 'User' },
  messages: { type: [Types.ObjectId], required: true, ref: 'Message' },
});

export default mongoose.model('Chat', ChatSchema);
