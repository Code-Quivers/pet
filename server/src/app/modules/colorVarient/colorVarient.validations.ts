import { z } from 'zod';

const addColor = z.object({
  body: z.object({
    productColor: z
      .string()
      .min(1, { message: 'Name should be at least 1 character' })
      .max(255, { message: ' Name should be at most 500 characters' }),
  }),
});

export const ColorVarientValidation = {
  addColor,
};
