/* eslint-disable no-useless-escape */
import { z } from 'zod';

const createUser = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email address'}),
    password: z.string().min(1,{message :"Password is required"}),
    fullName: z.string().min(1, { message: 'First name is required'}),
    companyName: z.string().optional(),
    phoneNumber: z.string().min(1, { message: 'phoneNumber is required' }),
  }),
});

export const AuthValidation = {
  createUser,
};
