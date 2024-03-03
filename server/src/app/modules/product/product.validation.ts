import { z } from 'zod';

const addProduct = z.object({
  productName: z.string().nonempty({ message: 'Product Name is required' }),
  productDescription: z.string().nonempty({ message: 'Product Description is required' }),
  productPrice: z.number().min(0, { message: 'Product Price must be a positive number' }),
  productStock: z.number().min(0, { message: 'Product Stock must be a positive number' }),
  categoryId: z.string().nonempty({ message: 'Category is required' }),
  colorVarientId: z.string().nonempty({ message: 'Color Varient is required' }),
  sizeVarientId: z.string().nonempty({ message: 'Size Varient is required' }),
});

const editProduct = z.object({
  productName: z.string().optional(),
  productDescription: z.string().optional(),
  productPrice: z.number().optional(),
  productStock: z.number().optional(),
  categoryId: z.string().optional(),
  colorVarientId: z.string().optional(),
  sizeVarientId: z.string().optional(),
});

export const ProductZodValidation = {
  addProduct,
  editProduct,
};
