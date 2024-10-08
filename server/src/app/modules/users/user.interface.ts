/* eslint-disable @typescript-eslint/no-explicit-any */
import { Profile, UserRoles } from '@prisma/client';

export type IRequestUser = {
  role: UserRoles;
  userId: string;
  profileId: string;
  iat: number;
  exp: number;
};

export type IUserFilterRequest = {
  searchTerm?: string | undefined;
};

export type IUpdateUserRequest = {
  firstName: string;
  lastName: string;
  profileImage: string;
  password: string;
  role: UserRoles;
};

export type UserProfile = {
  profileId: string;
  firstName: string;
  lastName: string;
  role: UserRoles;
  profileImage: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type IUsersResponse = {
  userId: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  profile: Profile | null;
  // userStatus: UserStatus;
};
export type IUpdateProfileReqAndResponse = {
  fullName?: string;
  email?: string;
  password?: string;
  phoneNumber?: string;
  companyName?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
};

export type IUserUpdateReqAndResponse = {
  fullName?: string;
  email?: string;
  password?: string;
  role?: UserRoles;
};
