export type IProductFilterRequest = {
  searchTerm?: string | undefined;
};

export type IKidRequest = {
  kidName: string;
  kidImage: string;
  kidDescription: string;
  kidGender: string;
  kidAge: string;
  kidAddress?: string;
  barcodeId: string;
  relations: string[];
};

export type IKidUpdateRequest = {
  kidName?: string;
  kidImage?: string;
  kidDescription?: string;
  kidGender?: string;
  kidAge?: string;
  kidAddress?: string;
  barcodeId?: string;
  relations?: string[];
};

export type IRequestUser = {
  email: string;
  userId: string;
  profileId: string;
  iat: number;
  exp: number;
};
