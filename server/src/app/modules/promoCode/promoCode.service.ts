/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Promotion, PromotionRule } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IGenericResponse } from '../../../interfaces/common';
import { IPromoFilterRequest, IPromoRequest, IPromoUpdateRequest } from './promoCode.interface';
import { PromoCodeRelationalFields, PromoCodeRelationalFieldsMapper, PromoCodeSearchableFields } from './promoCode.constants';
// modules

// !----------------------------------Create New Promo Code------------------------------------->>>
const addPromoCode = async (data: IPromoRequest) => {
  const findProduct = await prisma.product.findUnique({
    where: {
      productId: data.productId,
    },
  });

  if (!findProduct) throw new ApiError(httpStatus.BAD_REQUEST, 'Product not found !!!');

  const dataObj = {
    products: {
      connect: {
        productId: data.productId,
      },
    },
    promotionName: data.promotionName,
    promoCode: data.promoCode,
    expireDate: data.expireDate,
    type: data.type,
  };

  const createPromotion = await prisma.promotion.create({
    data: dataObj,
  });

  if (!createPromotion) throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to add Promotion !!!');

  const result = await prisma.promotionRule.create({
    data: {
      buy: data.buy,
      get: data.get,
      threshold: data.threshold,
      discount: data.discount,
      promotion: {
        connect: {
          promotionId: createPromotion.promotionId,
        },
      },
    },
  });

  if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to add Promotion Rule !!!');

  return result;
};

// !----------------------------------get all Event---------------------------------------->>>
const getPromoCode = async (filters: IPromoFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<Promotion[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.PromotionWhereInput[] = [];

  // Add search term condition if provided

  if (searchTerm) {
    andConditions.push({
      OR: [
        ...PromoCodeSearchableFields.map((field: any) => ({
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
        if (PromoCodeRelationalFields.includes(key)) {
          return {
            [PromoCodeRelationalFieldsMapper[key]]: {
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
  const whereConditions: Prisma.PromotionWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.promotion.findMany({
    include: {
      promotionRules: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { createdAt: 'desc' },
  });

  // Count total matching for pagination
  const total = await prisma.promotion.count({
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

const getPromotionalOffer = async (filters: IPromoFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<PromotionRule[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.PromotionRuleWhereInput[] = [];

  // Add search term condition if provided

  if (searchTerm) {
    andConditions.push({
      OR: [
        ...PromoCodeSearchableFields.map((field: any) => ({
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
        if (PromoCodeRelationalFields.includes(key)) {
          return {
            [PromoCodeRelationalFieldsMapper[key]]: {
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
  const whereConditions: Prisma.PromotionRuleWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.promotionRule.findMany({
    select: {
      promotion: {
        include: {
          products: true,
        },
      },
      buy: true,
      get: true,
      threshold: true,
      discount: true,
      id: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { createdAt: 'desc' },
  });

  // Count total matching for pagination
  const total = await prisma.promotionRule.count({
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
    // @ts-ignore
    data: result,
  };
};

// !----------------------------------Update Courier---------------------------------------->>>
const updatePromoCode = async (id: string, payload: IPromoUpdateRequest): Promise<PromotionRule> => {
  const result = await prisma.$transaction(async transactionClient => {
    const existingPromotionRule = await transactionClient.promotionRule.findUnique({
      where: {
        id,
      },
    });

    if (!existingPromotionRule) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Promotion Rule Not Found!!');
    }

    const updatedDetails = {
      buy: payload.buy,
      get: payload.get,
      threshold: payload.threshold,
      discount: payload.discount,
    };

    const updatedData = await transactionClient.promotionRule.update({
      where: {
        id,
      },
      data: updatedDetails,
    });

    if (!updatedData) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update !!');
    }

    const findPromotion = await transactionClient.promotion.findUnique({
      where: {
        promotionId: existingPromotionRule.promotionId,
      },
      include: {
        products: true,
      },
    });

    if (!findPromotion) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Promotion Not Found !!');
    }

    const updatedPromotion = await transactionClient.promotion.update({
      where: {
        promotionId: findPromotion.promotionId,
      },
      data: {
        products: {
          set: payload?.productId?.map(productId => ({ productId })),
        },
        promotionName: payload.promotionName,
        promoCode: payload.promoCode,
        expireDate: payload.expireDate,
        type: payload.type,
      },
    });

    if (!updatedPromotion) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update !!');
    }

    return updatedData;
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update !!');
  }

  return result;
};

const deletePromotionRuleCode = async (id: string): Promise<PromotionRule> => {
  if (!id) {
    throw new ApiError(httpStatus.BAD_REQUEST, ' Promotion Rule Id is required');
  }

  const result = await prisma.promotionRule.delete({
    where: {
      id,
    },
  });

  return result;
};

export const PromoCodeService = {
  addPromoCode,
  getPromoCode,
  updatePromoCode,
  deletePromotionRuleCode,
  getPromotionalOffer,
};
