import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { IProductRequest } from './product.interface';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ProductValidation = async (data: IProductRequest) => {
  if (!data.productName) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product Name is required');
  }

  if (!data.categoryId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category is required');
  }

  const isExistCategory = await prisma.category.findUnique({
    where: {
      categoryId: data.categoryId,
    },
  });

  if (!isExistCategory) {
    throw new ApiError(httpStatus.BAD_REQUEST, ' Category Not Found');
  }

  if (!data.productPrice) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product Price is required');
  }

  if (!data.productStock) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product Stock is required');
  }

  if (!data.colorVarientId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Color Varient is required');
  }

  const isColorExist = await prisma.colorVarient.findUnique({
    where: {
      colorVarientId: data.colorVarientId,
    },
  });

  if (!isColorExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Color Varient Not Found');
  }

  if (!data.sizeVarientId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Size Varient is required');
  }

  const isSizeExist = await prisma.sizeVarient.findUnique({
    where: {
      sizeVarientId: data.sizeVarientId,
    },
  });

  if (!isSizeExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Size Varient Not Found');
  }

  const colorAndSizeMatch = await prisma.product.findFirst({
    where: {
      colorVarientId: data.colorVarientId,
      sizeVarientId: data.sizeVarientId,
    },
  });

  if (colorAndSizeMatch) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Same Color and Size already exist in Product List');
  }
};

// Product Code Generator

const existingCodes: number[] = []; // Array to store existing codes

const generateRandomCode = (): string => {
  const min = 100000;
  const max = 999999;
  let code: number;

  do {
    code = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (existingCodes.includes(code)); // Check if the code already exists

  existingCodes.push(code); // Add the new code to the array of existing codes
  return 'et' + code.toString(); // Prepend "et" before the code and convert it to string
};

export const productCodeGenerator: string = generateRandomCode();
