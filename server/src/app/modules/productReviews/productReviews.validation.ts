import { z } from 'zod';

const addProductReview = z.object({
  rating: z.number().min(1).max(10),
  reviewDescription: z.string().nonempty(),
  verifiedPurchase: z.boolean().optional(),
  productId: z.string().optional(),
  otherDetails: z.object({
    email: z.string(),
    phoneNumber: z.string().optional(),
    fullName: z.string().nonempty(),
    designation: z.string().optional(),
  }),
});

const editProductReview = z.object({
  clientName: z.string().nonempty().optional(),
  testimonialTitle: z.string().nonempty().optional(),
  testimonialDescription: z.string().nonempty().optional(),
  rating: z.string().optional(),
});

export const ProductReviewValidation = {
  addProductReview,
  editProductReview,
};
