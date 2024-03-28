import { z } from 'zod';

const addProducts = z.object({
  productName: z.string().nonempty(),
  productDescription: z.string().nonempty({ message: 'Product Description is required' }),
  productPrice: z.number().min(0, { message: 'Product Price must be a positive number' }),
  categoryId: z.string().nonempty(),
  productVariations: z.array(
    z.object({
      id: z.string(),
      variantPrice: z.number().min(0, { message: 'Variant Price must be a positive number' }),
      color: z.string(),
      size: z.string(),
      stock: z.number().min(0, { message: 'Stock must be a positive number' }),
    })
  ),
});

const editProduct = z.object({
  productName: z.string().optional(),
  productDescription: z.string().optional(),
  productPrice: z.number().optional(),
  categoryId: z.string().optional(),
  productStatus: z.string().optional(),
});

export const ProductZodValidation = {
  addProducts,
  editProduct,
};
