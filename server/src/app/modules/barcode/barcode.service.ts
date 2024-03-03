/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Pet } from '@prisma/client';

import prisma from '../../../shared/prisma';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

// !----------------------------------get Single barcode ---------------------------------------->>>
const getSingleBarCode = async (productCode: string): Promise<Pet | null> => {
  if (!productCode) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product Code is required');
  }

  // Find the product using the productCode
  const product = await prisma.product.findUnique({
    where: {
      productCode,
    },
  });

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product Not Found');
  }

 
  const result = await prisma.pet.findUnique({
    where: {
      productId: product.productId, 
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Pet Not Found');
  }

  return result;
};

export const BarcodeService = {
  getSingleBarCode,
};
