import { z } from 'zod';

const addEvent = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Name should be at least 1 character' }).max(255, { message: ' Name should be at most 500 characters' }),
    description: z
      .string()
      .min(1, { message: 'End Time should be at least 1 character' })
      .max(255, { message: 'End Time should be at most 1000 characters' }),
  }),
});

export const EventValidation = {
  addEvent,
};
