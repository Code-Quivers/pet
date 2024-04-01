import { IBarCodeFilterRequest } from './barcode.interface';
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { BarCode, KidDetails, Prisma, ProductVariation } from '@prisma/client';

import prisma from '../../../shared/prisma';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { BarcodeRelationalFields, BarcodeRelationalFieldsMapper, BarcodeSearchableFields } from './barcode.constant';

// !----------------------------------get Single barcode ---------------------------------------->>>

const getProductBarcodeVarientWise = async (
  filters: IBarCodeFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<ProductVariation[]>> => {
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

  // Retrieve product vriants with filtering and pagination
  const result = await prisma.productVariation.findMany({
    where: whereConditions,
    include: {
      product: {
        select: {
          productName: true,
          category: {
            select: {
              categoryName: true,
            },
          },
        },
      },
      barCodes: {
        select: {
          barcodeId: true,
          code: true,
          barcodeStatus: true,
        },
      },
    },
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { updatedAt: 'desc' },
  });

  const variants = result
    .filter(variant => variant.product) // Filter out variants without a product
    .map(({ product, ...rest }) => ({
      ...rest,
      productName: product?.productName,
      categoryName: product?.category?.categoryName,
    }));

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
    data: variants,
  };
};

const getSingleBarCodeDetailsForKid = async (code: string): Promise<KidDetails | null> => {
  if (!code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Barcode is required');
  }

  // Find the product using the productCode
  const barCodeDetails = await prisma.barCode.findUnique({
    where: {
      code,
    },
  });

  if (!barCodeDetails) {
    throw new ApiError(httpStatus.NOT_FOUND, 'BarCode is Invalid');
  }

  const result = await prisma.kidDetails.findUnique({
    where: {
      barcodeId: barCodeDetails.barcodeId,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Kid Not Found');
  }

  return result;
};

const getAvailableBarCode = async (code: string): Promise<BarCode | null> => {
  if (!code) throw new ApiError(httpStatus.BAD_REQUEST, 'Please enter a Code');

  const findBarCode = await prisma.barCode.findUnique({
    where: {
      code,
      barcodeStatus: 'AVAILABLE',
    },
  });

  if (!findBarCode) {
    throw new ApiError(httpStatus.NOT_FOUND, 'This Barcode is not available.');
  }

  return findBarCode;
};

const getAllBarCodeForPrint = async (filters: IBarCodeFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<BarCode[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, startDate, endDate, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.BarCodeWhereInput[] = [];

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

  if (startDate && endDate) {
    andConditions.push({
      createdAt: {
        gte: startDate, // Greater than or equal to startDate
        lte: endDate, // Less than or equal to endDate
      },
    });
  }

  // Create a whereConditions object with AND conditions
  const whereConditions: Prisma.BarCodeWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve product vriants with filtering and pagination
  const result = await prisma.barCode.findMany({
    include: {
      variant: {
        include: {
          product: true,
        },
      },
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { updatedAt: 'desc' },
  });

  // Count total matching orders for pagination
  const total = await prisma.barCode.count({
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

export const BarcodeService = {
  getSingleBarCodeDetailsForKid,
  getProductBarcodeVarientWise,
  getAvailableBarCode,
  getAllBarCodeForPrint,
};
