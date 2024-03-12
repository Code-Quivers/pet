import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { IProductRequest } from './products.interface';

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

  if (!data.productDescription) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product Description is required');
  }

  if (!data.variantPrice) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Variant Price is required');
  }

  if (!data.color) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Color is required');
  }

  if (!data.size) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Size is required');
  }

  if (!data.stock) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Stock is required');
  }

  // const colorAndSizeExist = await prisma.productVariation.findFirst({
  //   where: {
  //     color: data.color,
  //     size: data.size,
  //   },
  // });
};

// Product Code Generator

// const existingCodes: number[] = []; // Array to store existing codes

// const generateRandomCode = (): string => {
//   const min = 100000;
//   const max = 999999;
//   let code: number;

//   do {
//     code = Math.floor(Math.random() * (max - min + 1)) + min;
//   } while (existingCodes.includes(code)); // Check if the code already exists

//   existingCodes.push(code); // Add the new code to the array of existing codes
//   return 'et' + code.toString(); // Prepend "et" before the code and convert it to string
// };

// export const productCodeGenerator: string = generateRandomCode();

const existingCodes: number[] = []; // Array to store existing codes

const generateRandomCode = (): string => {
  const min = 100000;
  const max = 999999;
  let code: number;

  do {
    code = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (existingCodes.includes(code)); // Check if the code already exists

  existingCodes.push(code); // Add the new code to the array of existing codes

  const timestamp = Date.now(); // Get current timestamp in milliseconds
  const truncatedCode = code.toString().slice(-8); // Extract last 8 digits of the code
  return 'et' + truncatedCode + timestamp.toString(); // Prepend "et" and append timestamp
};

export const productCodeGenerator: string = generateRandomCode();
