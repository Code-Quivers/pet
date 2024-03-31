import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { IKidRequest } from './kid.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const KidValidation = async (data: IKidRequest, userId: string) => {
  if (!data.barcodeId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'BarCode is required');
  }

  const isProductExist = await prisma.barCode.findUnique({
    where: {
      barcodeId: data.barcodeId,
    },
  });

  if (!isProductExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product Not Found!!');
  }

  if (!userId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User Id is required');
  }

  const kidAssign = await prisma.kidDetails.findFirst({
    where: {
      userId: userId,
      barcodeId: isProductExist.barcodeId,
    },
  });

  if (kidAssign) {
    throw new ApiError(httpStatus.CONFLICT, 'Pet Already Assigned with User ');
  }

  const kidAssignToOtherUser = await prisma.kidDetails.findFirst({
    where: {
      NOT: {
        userId: userId,
      },
      barcodeId: isProductExist.barcodeId,
    },
  });

  if (kidAssignToOtherUser) {
    throw new ApiError(httpStatus.CONFLICT, 'Pet Already Assigned to a different user');
  }
};
