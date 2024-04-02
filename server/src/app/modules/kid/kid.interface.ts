export type IProductFilterRequest = {
  searchTerm?: string | undefined;
};

export type IKidRequest = {
  kidName: string;
  kidAge: number;
  userId: string;
  code: string;
  relations: IRelation[];
};

export type IKidUpdateRequest = {
  kidName?: string;
  kidImage?: string;
  kidDescription?: string;
  kidGender?: string;
  kidAge?: string;
  kidAddress?: string;
  userId?: string;
  code?: string;
  relations?: IRelation[];
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
