import { z } from 'zod';

const addProduct = z.object({
  productName: z.string().nonempty({ message: 'Product Name is required' }),
  description: z.string().optional(),
  productVat: z.number().optional(),
  shortSummery: z.string().optional(),
  subCategoryId: z.string().nonempty({ message: 'Sub Category Id is required' }),
});

const editProduct = z.object({
  productName: z.string().optional(),
  description: z.string().optional(),
  shortSummery: z.string().optional(),
  price: z.number().optional(),
  productVat: z.number().optional(),
  packType: z.string().optional(),
  subCategoryId: z.string().optional(),
});

export const ProductZodValidation = {
  addProduct,
  editProduct,
};
