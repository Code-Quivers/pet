export type ICategoryFilterRequest = {
  searchTerm?: string | undefined;
};

export type ICategoryRequest = {
  categoryName: string;
  description: string;
  categoryImg: string;
};

export type ICategoryUpdateRequest = {
  categoryName?: string;
  categoryHref?: string;
  categoryImg?: string;
  oldFilePath?: string;
};
