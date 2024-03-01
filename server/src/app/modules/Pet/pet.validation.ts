import { z } from 'zod';

const addPet = z.object({
  petName: z.string().nonempty({ message: 'Pet Name is required' }),
  petDescription: z.string().nonempty({ message: 'Pet Description is required' }),
  petGender: z.string().nonempty({ message: 'Pet Gender is required' }),
  petAge: z.string().nonempty({ message: 'Pet Age is required' }),
  petWeight: z.string().nonempty({ message: 'Pet Weight is required' }),
  petAddress: z.string().nonempty({ message: 'Pet Address is required' }),
  petBehavior: z.string().nonempty({ message: 'Pet Behavior is required' }),
  petHealth: z.string().nonempty({ message: 'Pet Health is required' }),
  petVaccination: z.string().nonempty({ message: 'Pet Vaccination is required' }),
  petProvider: z.string().nonempty({ message: 'Pet Provider is required' }),
  productId: z.string().nonempty({ message: 'Product Id is required' }),
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

export const PetValidation = {
  addPet,
  // editPet,
};
