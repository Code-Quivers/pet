import { UserRoles } from '@prisma/client';

export type IUserCreate = {
  fullName: string;
  phoneNumber:string;
  companyName:string;
  email: string;
  password: string;
  role: UserRoles | null;
};

export type IUserProfileResponse = {
  profileId: string;
  firstName: string;
  lastName: string;
  role: UserRoles | null;
  createdAt: Date;
  updatedAt: Date;
};

export type IUserResponse = {
  userId: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  profile: IUserProfileResponse;
};

export type IUserLogin = {
  email: string;
  password: string;
};
export type ILoginUserResponse = {
  accessToken: string;
  refreshToken: string;
};
export type IRefreshTokenResponse = {
  accessToken: string;
};
