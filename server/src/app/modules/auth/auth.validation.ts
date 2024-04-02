/* eslint-disable no-useless-escape */
import { z } from 'zod';

const createUser = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(1, { message: 'Password is required' }),
    fullName: z.string().min(1, { message: 'First name is required' }),
    role: z
      .enum(['USER', 'ADMIN', 'SUPERADMIN'])
      .or(z.string().refine(value => ['USER', 'ADMIN', 'SUPERADMIN'].includes(value)))
      .optional(),
  }),
});

export const AuthValidation = {
  createUser,
};
