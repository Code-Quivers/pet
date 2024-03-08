import { FileType } from "rsuite/esm/Uploader";

export type ICreateProduct = {
  productName: string;
  productDescription: string;
  productPrice: string;
  productStock: string;
  categoryId: string;
  colorVarientId: string;
  sizeVarientId?: string;
  productImage: FileType;
};

// ! edit product details
export type IUpdateProduct = {
  productName?: string;
  productDescription?: string;
  productPrice?: string;
  productStock?: string;
  categoryId?: string;
  productStatus?: string;
  colorVarientId?: string;
  sizeVarientId?: string;
  productImage?: FileType;
};
export type ICreateBatchProduct = {
  productVat: string;
  batchPrice: string;
  batchPackType: string;
  productId: string;
  categoryHref: string;
  subCategoryHref: string;
};

// ! edit batch product
export type IUpdateBatchProduct = {
  productVat?: string;
  batchPrice?: string;
  batchPackType?: string;
  productId?: string;
};
export type IAddOptionalItems = {
  productId: string;
  batchProductId: string[];
  categoryHref: string;
  subCategoryHref: string;
};

export type ICreateProductQA = {
  productId: string;
  question: string;
  answer: string;
  categoryHref: string;
};
