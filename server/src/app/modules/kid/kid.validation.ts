import { z } from 'zod';

export const IRelationSchema = z.object({
  name: z.string(),
  relation: z.string(),
  phoneNo: z.string(),
});

export const addKid = z.object({
  kidName: z.string().optional(),
  kidImage: z.string().optional(),
  kidDescription: z.string().optional(),
  kidGender: z.string().optional(),
  kidAge: z.string().optional(),
  kidAddress: z.string().optional(),
  userId: z.string().optional(),
  code: z.string().optional(),
  relations: z.array(IRelationSchema).optional(),
});

// const editPet = z.object({
//   productName: z.string().optional(),
//   productDescription: z.string().optional(),
//   productPrice: z.number().optional(),
//   productStock: z.number().optional(),
//   categoryId: z.string().optional(),
//   colorVarientId: z.string().optional(),
//   sizeVarientId: z.string().optional(),
// });

export const KidValidation = {
  addKid,
  // editPet,
};
