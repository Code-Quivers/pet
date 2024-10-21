/* eslint-disable @typescript-eslint/no-explicit-any */

export type IProductReviewFilterRequest = {
  searchTerm?: string | undefined;
};

export type IProductReviewRequest = {
  productId: string;
  rating: number;
  reviewDescription: string;
  verifiedPurchase?: boolean;
  productDetails?: IProductReviewProductDetails;
  otherDetails: IProductReviewCustomerDetails;
};
type IProductReviewProductDetails = {
  productName?: string;
  productCategoryName?: string;
  productImage?: string;
};
type IProductReviewCustomerDetails = {
  email: string;
  phoneNumber: string;
  fullName: string;
  designation: string;
};

export type IProductReviewUpdateRequest = {
  rating?: number;
  reviewDescription?: string;
  verifiedPurchase?: boolean;
  productId?: string | any;
  productDetails?: IProductReviewProductDetails;
  otherDetails?: IProductReviewCustomerDetails;
  oldFilePaths?: string[];
  reviewAttachments?: any[];
};

export type IProductReviewAttachMents = {
  size: number;
  fileUrl: string;
  filename: string;
  mimetype: string;
};
