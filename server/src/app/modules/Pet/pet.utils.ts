import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

import { IPetRequest } from './pet.interface';
import prisma from '../../../shared/prisma';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PetValidation = async (data: IPetRequest, userId: string) => {
  if (!data.productCode) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product Code is required');
  }

  const isProductExist = await prisma.product.findUnique({
    where: {
      productCode: data.productCode,
    },
  });

  if (!isProductExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product Not Found!!');
  }

  if (!userId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User Id is required');
  }

  const petAssign = await prisma.pet.findFirst({
    where: {
      userId: userId,
      productId: isProductExist.productId,
    },
  });

  if (petAssign) {
    throw new ApiError(httpStatus.CONFLICT, 'Pet Already Assigned with User ');
  }

  const petAssignToOtherUser = await prisma.pet.findFirst({
    where: {
      NOT: {
        userId: userId,
      },
      productId: isProductExist.productId,
    },
  });

  if (petAssignToOtherUser) {
    throw new ApiError(httpStatus.CONFLICT, 'Pet Already Assigned to a different user');
  }
};
