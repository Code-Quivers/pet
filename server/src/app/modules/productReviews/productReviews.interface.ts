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
  productId?: string;
  productDetails?: IProductReviewProductDetails;
  otherDetails?: IProductReviewCustomerDetails;
  oldFilePaths?: string[];
  reviewAttachments?: IProductReviewAttachMents[];
};

export type IProductReviewAttachMents = {
  size: number;
  fileUrl: string;
  filename: string;
  mimetype: string;
};
