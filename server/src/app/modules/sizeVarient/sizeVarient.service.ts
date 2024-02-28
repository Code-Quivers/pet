/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, SizeVarient } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { ISizeVarientListFilterRequest, ISizeVarientRequest, ISizeVarientUpdateRequest } from './sizeVarient.interface';
import { IGenericResponse } from '../../../interfaces/common';
import { SizeVarientRelationalFields, SizeVarientRelationalFieldsMapper, SizeVarientSearchableFields } from './sizeVarient.constants';

// modules

// !----------------------------------Create New Size------------------------------------->>>
const addSizeVarient = async (data: ISizeVarientRequest): Promise<SizeVarient> => {
  if (!data.productSize) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Size is required');
  }

  const dataObj = {
    productSize: data.productSize,
  };

  const result = await prisma.sizeVarient.create({
    data: dataObj,
  });

  if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to add Size Varient');

  return result;
};

// !----------------------------------get all Event---------------------------------------->>>
const getSizeVarient = async (filters: ISizeVarientListFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<SizeVarient[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.SizeVarientWhereInput[] = [];

  // Add search term condition if provided

  if (searchTerm) {
    andConditions.push({
      OR: SizeVarientSearchableFields.map((field: any) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  // Add filterData conditions if filterData is provided
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (SizeVarientRelationalFields.includes(key)) {
          return {
            [SizeVarientRelationalFieldsMapper[key]]: {
              name: (filterData as any)[key],
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

  // Create a whereConditions object with AND conditions
  const whereConditions: Prisma.SizeVarientWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Courier with filtering and pagination
  const result = await prisma.sizeVarient.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { createdAt: 'desc' },
  });

  // Count total matching orders for pagination
  const total = await prisma.sizeVarient.count({
    where: whereConditions,
  });

  // Calculate total pages
  const totalPage = Math.ceil(total / limit);

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

// !----------------------------------Update Courier---------------------------------------->>>
const updateSizeVarient = async (sizeVarientId: string, payload: ISizeVarientUpdateRequest): Promise<SizeVarient> => {
  const result = await prisma.$transaction(async transactionClient => {
    const existingEvent = await transactionClient.sizeVarient.findUnique({
      where: {
        sizeVarientId,
      },
    });

    if (!existingEvent) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Size Not Found!!');
    }

    const updatedDetails = {
      productSize: payload?.productSize,
    };

    const updatedEvent = await transactionClient.sizeVarient.update({
      where: {
        sizeVarientId,
      },
      data: updatedDetails,
    });

    return updatedEvent;
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update Size');
  }

  return result;
};

const deleteSizeVarient = async (sizeVarientId: string): Promise<SizeVarient> => {
  if (!sizeVarientId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'sizeVarientId is required');
  }

  const result = await prisma.sizeVarient.delete({
    where: {
      sizeVarientId,
    },
  });

  return result;
};

export const SizeVarientService = {
  addSizeVarient,
  getSizeVarient,
  updateSizeVarient,
  deleteSizeVarient,
};
