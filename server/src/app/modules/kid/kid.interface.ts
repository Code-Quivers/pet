export type IProductFilterRequest = {
  searchTerm?: string | undefined;
};

export type IKidRequest = {
  kidName: string;
  email: string;
  password: string;
  kidAge: Date;
  userId: string;
  code: string;
  relations: IRelation[];
};

export type IKidUpdateRequest = {
  kidName?: string;
  kidAge?: Date;
  relations?: IRelation[];
  kidImage?: string;
};

export type IRelation = {
  name: string;
  relation: string;
  phoneNo: string;
};

export type IRequestUser = {
  email: string;
  userId: string;
  profileId: string;
  iat: number;
  exp: number;
};
export type ICreateKidDetails = {
  kidImage?: string;
  barcodeId: string;
  kidName: string;
  userId?: string;
  kidAge: Date;
  relations: IRelation[];
};
