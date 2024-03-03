import { z } from 'zod';

const addSize = z.object({
  body: z.object({
    productSize: z
      .string()
      .min(1, { message: 'Name should be at least 1 character' })
      .max(255, { message: ' Name should be at most 500 characters' }),
  }),
});

export const SizeVarientValidation = {
  addSize,
};
