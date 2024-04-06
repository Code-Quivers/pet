import { z } from 'zod';

export const IRelationSchema = z.object({
  name: z.string(),
  relation: z.string(),
  phoneNo: z.string(),
});

export const addKid = z.object({
  kidName: z.string(),
  email: z.string(),
  password: z.string(),
  kidAge: z.string(),
  code: z.string(),
  relations: z.array(IRelationSchema).optional(),
});

export const KidValidation = {
  addKid,
};
