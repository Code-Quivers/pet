import { FileType } from "rsuite/esm/Uploader";

export type ICreateProduct = {
  productName: string;
  productDescription: string;
  productPrice: string;
  productStock: string;
  categoryId: string;
  colorVarientId: string;
  sizeVarientId: string;
  productImage: FileType;
};

// ! edit product details
export type IUpdateProduct = {
  productName?: string;
  productDescription?: string;
  productPrice?: string;
  productStock?: string;
  categoryId?: string;
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

export const batchPackTypeEnums = [
  {
    label: "Case",
    value: "Case",
  },
  {
    label: "Box",
    value: "Box",
  },
  {
    label: "Bag",
    value: "Bag",
  },
  {
    label: "Unit",
    value: "Unit",
  },
  {
    label: "Portion",
    value: "Portion",
  },
  {
    label: "Tetrapack",
    value: "Tetrapack",
  },
  {
    label: "Set",
    value: "Set",
  },
  {
    label: "Packung",
    value: "Packung",
  },
  {
    label: "Stuck",
    value: "Stuck",
  },
  {
    label: "PerDay",
    value: "PerDay",
  },
];

export const packTypeEnums = [
  {
    label: "Bottle",
    value: "Bottle",
  },
  {
    label: "Barrel",
    value: "Barrel",
  },
  {
    label: "FI",
    value: "Fi",
  },
  {
    label: "Tin",
    value: "Tin",
  },
  {
    label: "Person",
    value: "Person",
  },
];
