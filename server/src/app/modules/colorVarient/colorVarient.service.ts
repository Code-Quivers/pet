/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColorVarient, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IColorVarientRequest, IColorVarientUpdateRequest, IEColorVarientFilterRequest } from './colorVarient.interface';
import { ColorVarientRelationalFields, ColorVarientRelationalFieldsMapper, ColorVarientSearchableFields } from './colorVarient.constants';
import { IGenericResponse } from '../../../interfaces/common';

// modules

// !----------------------------------Create New Event------------------------------------->>>
const addColorVarient = async (data: IColorVarientRequest): Promise<ColorVarient> => {
  if (!data.productColor) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name is required');
  }

  const dataObj = {
    productColor: data.productColor,
  };

  const result = await prisma.colorVarient.create({
    data: dataObj,
  });

  if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to add Color Varient');

  return result;
};

// !----------------------------------get all Event---------------------------------------->>>
const getColorVarient = async (filters: IEColorVarientFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<ColorVarient[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.ColorVarientWhereInput[] = [];

  // Add search term condition if provided

  if (searchTerm) {
    andConditions.push({
      OR: ColorVarientSearchableFields.map((field: any) => ({
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
        if (ColorVarientRelationalFields.includes(key)) {
          return {
            [ColorVarientRelationalFieldsMapper[key]]: {
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
  const whereConditions: Prisma.ColorVarientWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Courier with filtering and pagination
  const result = await prisma.colorVarient.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { createdAt: 'desc' },
  });

  // Count total matching orders for pagination
  const total = await prisma.colorVarient.count({
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
const updateColorVarient = async (colorVarientId: string, payload: IColorVarientUpdateRequest): Promise<ColorVarient> => {
  const result = await prisma.$transaction(async transactionClient => {
    const existingColorVarient = await transactionClient.colorVarient.findUnique({
      where: {
        colorVarientId,
      },
    });

    if (!existingColorVarient) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Color Varient Not Found!!');
    }

    const updatedDetails = {
      productColor: payload?.productColor,
    };

    const updatedEvent = await transactionClient.colorVarient.update({
      where: {
        colorVarientId,
      },
      data: updatedDetails,
    });

    return updatedEvent;
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update Color Varient!!');
  }

  return result;
};

const deleteColorVarient = async (colorVarientId: string): Promise<ColorVarient> => {
  if (!colorVarientId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'colorVarientId is required');
  }

  const result = await prisma.colorVarient.delete({
    where: {
      colorVarientId,
    },
  });

  return result;
};

export const ColorVarientService = {
  addColorVarient,
  getColorVarient,
  updateColorVarient,
  deleteColorVarient,
};
