import mongoose, { Schema, Document } from 'mongoose';

export interface IContactDocument extends Document {
  name: string;
  email: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

const contactSchema = new Schema<IContactDocument>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'closed'],
    default: 'new'
  }
}, {
  timestamps: true
});

export const Contact = mongoose.model<IContactDocument>('Contact', contactSchema);
