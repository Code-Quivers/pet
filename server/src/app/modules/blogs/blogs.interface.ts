export type ITestimonialFilterRequest = {
  searchTerm?: string | undefined;
};

export type IAddRequest = {
  title: string;
  description: string;
  categoryName: string;
};

export type ITestimonialUpdateRequest = {
  clientName?: string | undefined;
  testimonialTitle?: string | undefined;
  testimonialDescription?: string | undefined;
  rating?: string | undefined;
  clientImage?: string | undefined;
  oldFilePath?: string;
};
