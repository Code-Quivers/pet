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
  rating: z.number().min(1).max(10).optional(),
  reviewDescription: z.string().nonempty().optional(),
  verifiedPurchase: z.boolean().optional(),
  productId: z.string().optional(),
  otherDetails: z
    .object({
      email: z.string(),
      phoneNumber: z.string().optional(),
      fullName: z.string().nonempty(),
      designation: z.string().optional(),
    })
    .optional(),
  oldFilePaths: z.array(z.string()).optional(),
});

export const ProductReviewValidation = {
  addProductReview,
  editProductReview,
};
