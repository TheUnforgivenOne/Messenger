import mongoose, { Schema, Types } from 'mongoose';
import { IChat } from 'monorepo-shared';

const ChatSchema = new Schema<IChat>({
  title: {
    type: String,
    required: true,
  },
  users: {
    type: [Types.ObjectId],
    ref: 'User',
    required: true,
    minlength: 2,
  },
  messages: {
    type: [Types.ObjectId],
    ref: 'Message',
    default: [],
  },
});

export default mongoose.model('Chat', ChatSchema);
