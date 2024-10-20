export type IProductReviewFilterRequest = {
  searchTerm?: string | undefined;
};

export type IProductReviewRequest = {
  productId: string;
  rating: number;
  reviewDescription: string;
  verifiedPurchase?: boolean;
  productDetails: IProductReviewProductDetails;
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
  clientName?: string | undefined;
  testimonialTitle?: string | undefined;
  testimonialDescription?: string | undefined;
  rating?: string | undefined;
  clientImage?: string | undefined;
  oldFilePath?: string;
};
