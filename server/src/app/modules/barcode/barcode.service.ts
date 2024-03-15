/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Pet, Prisma, ProductVariation } from '@prisma/client';

import prisma from '../../../shared/prisma';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IBarCodeFilterRequest } from '../products/products.interface';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { BarcodeRelationalFields, BarcodeRelationalFieldsMapper, BarcodeSearchableFields } from './barcode.constant';

// !----------------------------------get Single barcode ---------------------------------------->>>

const getProductBarcode = async (filters: IBarCodeFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<ProductVariation[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, categoryName, startDate, endDate, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.ProductVariationWhereInput[] = [];

  // Add search term condition if provided

  if (searchTerm) {
    andConditions.push({
      OR: [
        ...BarcodeSearchableFields.map((field: any) => ({
          [field]: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        })),
        {
          product: {
            productName: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        },
      ],
    });
  }

  // Add filterData conditions if filterData is provided
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (BarcodeRelationalFields.includes(key)) {
          return {
            [BarcodeRelationalFieldsMapper[key]]: {
              subCategoryName: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  if (categoryName) {
    andConditions.push({
      product: {
        category: {
          categoryName: {
            equals: categoryName,
          },
        },
      },
    });
  }

  if (startDate && endDate) {
    andConditions.push({
      createdAt: {
        gte: startDate, // Greater than or equal to startDate
        lte: endDate, // Less than or equal to endDate
      },
    });
  }

  // Create a whereConditions object with AND conditions
  const whereConditions: Prisma.ProductVariationWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Courier with filtering and pagination
  const result = await prisma.productVariation.findMany({
    where: whereConditions,
    include: {
      product: {
        select: {
          productId: true,
          productName: true,
          category: {
            select: {
              categoryName: true,
            },
          },
        },
      },
    },
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { updatedAt: 'desc' },
  });

  // Count total matching orders for pagination
  const total = await prisma.productVariation.count({
    where: whereConditions,
  });

  // Calculate total pages
  const totalPage = limit > 0 ? Math.ceil(total / limit) : 0;

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: result,
  };
};

const getSingleBarCode = async (barcodeCode: string): Promise<Pet | null> => {
  if (!barcodeCode) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Barcode is required');
  }

  // Find the product using the productCode
  const product = await prisma.productVariation.findUnique({
    where: {
      barcodeCode,
    },
  });

  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product Not Found');
  }

  console.log('product', product);

  const result = await prisma.pet.findUnique({
    where: {
      productId: product.productId,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Kid Not Found');
  }

  return result;
};

export const BarcodeService = {
  getSingleBarCode,
  getProductBarcode,
};
