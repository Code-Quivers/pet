import { ProductStatus } from '@prisma/client';

export type IProductFilterRequest = {
  searchTerm?: string | undefined;
  productColor?: string | undefined;
  productSize?: string | undefined;
  categoryName?: string | undefined;
};

export type IProductRequest = {
  productName: string;
  productDescription: string;
  productImage: string;
  productPrice: number;
  productStock: number;
  categoryId: string;
  colorVarientId: string;
  sizeVarientId?: string;
};

export type IProductUpdateRequest = {
  productName?: string;
  productDescription?: string;
  productPrice?: number;
  productStock?: number;
  categoryId?: string;
  productStatus?: ProductStatus;
  colorVarientId?: string;
  sizeVarientId?: string;
  oldFilePath?: string;
};
