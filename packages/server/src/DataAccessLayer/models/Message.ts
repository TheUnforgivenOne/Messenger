import { Schema, Types, model } from 'mongoose';
import { IMessage } from 'monorepo-shared';

const MessageSchema = new Schema<IMessage>({
  date: { type: Date, default: () => new Date() },
  sent: { type: Boolean, default: false },
  viewed: { type: Boolean, default: false },
  message: { type: String, required: true },
  user: { type: Types.ObjectId, ref: 'User', required: true },
  chat: { type: Types.ObjectId, ref: 'Chat', required: true, }
});

export default model('Message', MessageSchema);
