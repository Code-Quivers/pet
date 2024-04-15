import { z } from 'zod';

export const IRelationSchema = z.object({
  name: z.string().optional(),
  relation: z.string().optional(),
  phoneNo: z.string().optional(),
});

export const addKid = z.object({
  kidName: z.string(),
  email: z.string(),
  password: z.string(),
  kidAge: z.string(),
  code: z.string(),
  relations: z.array(IRelationSchema).optional(),
});
export const updateKid = z.object({
  kidName: z.string().optional(),
  kidAge: z.string().optional(),
  relations: z.array(IRelationSchema).optional(),
});

export const KidValidation = {
  addKid,
  updateKid,
};
