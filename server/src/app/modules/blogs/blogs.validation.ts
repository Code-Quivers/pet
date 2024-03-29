import { z } from 'zod';

const addNewBlog = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  categoryName: z.string().nonempty(),
});

const updateBlog = z.object({
  clientName: z.string().nonempty().optional(),
  testimonialTitle: z.string().nonempty().optional(),
  testimonialDescription: z.string().nonempty().optional(),
  rating: z.string().optional(),
});

export const BlogsValidation = {
  addNewBlog,
  updateBlog,
};
