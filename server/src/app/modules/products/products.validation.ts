import { z } from 'zod';

const addProduct = z.object({
  productName: z.string().nonempty({ message: 'Product Name is required' }),
  productDescription: z.string().nonempty({ message: 'Product Description is required' }),
  productPrice: z.number().min(0, { message: 'Product Price must be a positive number' }),
  categoryId: z.string().nonempty({ message: 'Category is required' }),
  variantPrice: z.number().min(0, { message: 'Variant Price must be a positive number' }),
  color: z.string(),
  size: z.string(),
  stock: z.number().min(0, { message: 'Stock must be a positive number' }),
});

const editProduct = z.object({
  productName: z.string().optional(),
  productDescription: z.string().optional(),
  productPrice: z.number().optional(),
  categoryId: z.string().optional(),
  productStatus: z.string().optional(),
});

export const ProductZodValidation = {
  addProduct,
  editProduct,
};
