import { z } from 'zod';

export const contactValidation = {
  createContactZodSchema: z.object({
    name: z.string({
      required_error: 'Name is required',
    }).min(1, 'Name is required').max(100, 'Name cannot exceed 100 characters'),
    email: z.string({
      required_error: 'Email is required',
    }).email('Please enter a valid email address'),
    message: z.string({
      required_error: 'Message is required',
    }).min(1, 'Message is required').max(1000, 'Message cannot exceed 1000 characters'),
  }),
};
