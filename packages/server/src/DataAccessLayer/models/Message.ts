import mongoose, { Schema, Types } from 'mongoose';
import { IMessage } from 'monorepo-shared';

const MessageSchema = new Schema<IMessage>({
  date: { type: Date, required: true },
  sent: { type: Boolean, required: true },
  viewed: { type: Boolean, required: true },
  message: { type: String, required: true },
  user: { type: Types.ObjectId, required: true, ref: 'User' },
});

export default mongoose.model('Message', MessageSchema);
