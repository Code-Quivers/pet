/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import { Prisma, ProductReview } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IProductReviewFilterRequest, IProductReviewRequest, IProductReviewUpdateRequest } from './productReviews.interface';
import { IUploadFile } from '../../../interfaces/file';
import { Request } from 'express';
import { errorLogger } from '../../../shared/logger';
import { ProductReviewRelationalFields, ProductReviewRelationalFieldsMapper, ProductReviewSearchableFields } from './productReviews.constants';

// !----------------------------------Add New Product Review--------------------------------------->>>
const addProductReview = async (req: Request): Promise<ProductReview> => {
  // Check if the file is present and extract its path

  const allFiles = req?.files as IUploadFile[];

  const allAttachments = allFiles?.map(single => {
    return {
      fileUrl: single?.path?.substring(8),
      mimetype: single?.mimetype,
      filename: single?.filename,
      size: single?.size,
    };
  });

  if (!allAttachments?.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Review image is required.');
  }

  const data: IProductReviewRequest = req?.body;

  // Fetch product details to ensure it exists
  const isExistProduct = await prisma.product.findUnique({
    where: { productId: data?.productId },
    select: {
      productId: true,
      productName: true,
      productPrice: true,
      featuredImage: true,
      category: {
        select: {
          categoryHref: true,
          categoryName: true,
        },
      },
    },
  });
  // Prepare the review object
  const newReview: any = {
    reviewDescription: data.reviewDescription,
    otherDetails: data?.otherDetails,
    productDetails: {
      productCategoryName: isExistProduct?.category?.categoryName,
      productImage: isExistProduct?.featuredImage,
      productName: isExistProduct?.productName,
    },
    productId: isExistProduct?.productId ? isExistProduct?.productId : undefined,
    verifiedPurchase: data?.verifiedPurchase,
    rating: data.rating,
    reviewAttachments: allAttachments,
  };
  // getting user data if available via provided email
  const isExistUser = await prisma.user.findUnique({
    where: {
      email: data?.otherDetails?.email,
    },
  });
  if (isExistUser) {
    newReview['userId'] = isExistUser?.userId;
  }

  // Create the product review in the database
  const createdReview = await prisma.productReview.create({
    data: newReview,
  });

  // Check if the creation was successful
  if (!createdReview) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to create product review.');
  }

  return createdReview;
};

// !----------------------------------Get all Product Reviews---------------------------------------->>>
const getAllProductReviews = async (
  filters: IProductReviewFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<ProductReview[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.ProductReviewWhereInput[] = [];

  // Add search term condition if provided

  if (searchTerm) {
    andConditions.push({
      OR: ProductReviewSearchableFields.map((field: any) => ({
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
        if (ProductReviewRelationalFields.includes(key)) {
          return {
            [ProductReviewRelationalFieldsMapper[key]]: {
              [key]: (filterData as any)[key],
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
  const whereConditions: Prisma.ProductReviewWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Courier with filtering and pagination
  const result = await prisma.productReview.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { createdAt: 'desc' },
  });

  // Count total matching orders for pagination
  const total = await prisma.productReview.count({
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

// !----------------------------------Update Product Review---------------------------------------->>>
const editProductReview = async (productReviewId: string, req: Request): Promise<ProductReview> => {
  const allFiles = req?.files as IUploadFile[];

  const allAttachments = allFiles?.map(single => {
    return {
      fileUrl: single?.path?.substring(8),
      mimetype: single?.mimetype,
      filename: single?.filename,
      size: single?.size,
    };
  });

  if (!allAttachments?.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Review image is required.');
  }
  const isExistReview = await prisma.productReview.findUnique({
    where: {
      productReviewId,
    },
  });
  if (!isExistReview?.productReviewId) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review Not Found');
  }
  //

  const { oldFilePaths, otherDetails, productId, rating, reviewDescription } = req.body as IProductReviewUpdateRequest;

  // Deleting old style Image
  if (oldFilePaths?.length && oldFilePaths?.length > 0) {
    oldFilePaths?.map(oldFilePath => {
      if (oldFilePath !== undefined) {
        const oldPath = `uploads/` + oldFilePath;
        fs.unlink(oldPath, err => {
          if (err) {
            errorLogger.error('Error deleting old file');
          }
        });
      }
    });
  }

  const updatedDetails: Partial<IProductReviewUpdateRequest> = {
    otherDetails,
    rating,
    reviewDescription,
    reviewAttachments: allAttachments,
  };

  //
  const isExistProduct = await prisma.product.findUnique({
    where: {
      productId,
    },
    select: {
      productId: true,
      featuredImage: true,
      productName: true,
      category: {
        select: {
          categoryName: true,
        },
      },
    },
  });

  if (isExistProduct?.productId) {
    updatedDetails['productId'] = isExistReview?.productId !== isExistProduct?.productId ? isExistProduct?.productId : undefined;
    updatedDetails['productDetails'] = {
      productCategoryName: isExistProduct?.category?.categoryName,
      productImage: isExistProduct?.featuredImage,
      productName: isExistProduct?.productName,
    };
  }

  // Updated data from request
  const newData: Partial<IProductReviewUpdateRequest> = { ...updatedDetails };

  const result = await prisma.productReview.update({
    where: {
      productReviewId,
    },
    data: newData,
  });

  return result;
};

const deleteProductReview = async (productReviewId: string): Promise<ProductReview> => {
  if (!productReviewId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Testimonial Id is required');
  }
  const isExistProductReview = await prisma.productReview.findUnique({
    where: {
      productReviewId,
    },
  });
  if (!isExistProductReview) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Review Not Found');
  }

  const result = await prisma.productReview.delete({
    where: {
      productReviewId,
    },
  });

  return result;
};

export const ProductReviewService = {
  addProductReview,
  getAllProductReviews,
  editProductReview,
  deleteProductReview,
};
