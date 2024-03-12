import { ProductStatus } from '@prisma/client';

export type IProductFilterRequest = {
  searchTerm?: string | undefined;
  productColor?: string | undefined;
  productSize?: string | undefined;
  categoryName?: string | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
};

export type IProductRequest = {
  productName: string;
  productDescription: string;
  productImage: string;
  productPrice: number;
  categoryId: string;
  variantPrice: number;
  color: string;
  size: string;
  stock: number;
};

export type IProductUpdateRequest = {
  productName?: string;
  productDescription?: string;
  productPrice?: number;
  productStock?: number;
  categoryId?: string;
  productStatus?: ProductStatus;
  oldFilePath?: string;
};
