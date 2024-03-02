export type IQAFilterRequest = {
  searchTerm?: string | undefined;
};

export type IQARequest = {
  productId: string;
  question: string;
  answer: string;
};

export type IQAUpdateRequest = {
  productId?: string;
  question?: string;
  answer?: string;
};
