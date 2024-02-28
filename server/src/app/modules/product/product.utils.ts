import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ProductValidation = async (data: any) => {
  if (!data.productName) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product Name is required');
  }

  if (!data.subCategoryId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Sub Category is required');
  }

  const isExistSubCategory = await prisma.subCategory.findUnique({
    where: {
      subCategoryId: data.subCategoryId,
    },
  });

  if (!isExistSubCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Sub Category Not Found');
  }
};
