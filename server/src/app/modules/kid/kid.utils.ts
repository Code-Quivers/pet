import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { IKidRequest } from './kid.interface';
import { BarcodeStatus } from '@prisma/client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const KidValidation = async (data: IKidRequest) => {
  console.log('data', data);

  if (!data.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'BarCode is required');
  }

  const isProductExist = await prisma.barCode.findUnique({
    where: {
      code: data.code,
      barcodeStatus: BarcodeStatus.AVAILABLE,
    },
  });

  if (!isProductExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product Not Found!!');
  }

  // const kidAssign = await prisma.kidDetails.findFirst({
  //   where: {
  //     userId: userId,
  //     barcodeId: isProductExist.barcodeId,
  //   },
  // });

  // if (kidAssign) {
  //   throw new ApiError(httpStatus.CONFLICT, 'Kid Already Assigned');
  // }

  // const kidAssignToOtherUser = await prisma.kidDetails.findFirst({
  //   where: {
  //     NOT: {
  //       userId: userId,
  //     },
  //     barcodeId: isProductExist.barcodeId,
  //   },
  // });

  // if (kidAssignToOtherUser) {
  //   throw new ApiError(httpStatus.CONFLICT, 'Kid Already Assigned to a different user');
  // }
};
