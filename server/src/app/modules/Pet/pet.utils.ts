import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

import { IPetRequest } from './pet.interface';
import prisma from '../../../shared/prisma';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PetValidation = async (data: IPetRequest) => {

  if(!data.productId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Pet name is required');
  }

  const isProductExist = await prisma.product.findUnique({
    where: {
      productId: data.productId,
    },
  })

  if (!isProductExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product Not Found!!');
  }



}
