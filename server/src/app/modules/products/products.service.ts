/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import { Prisma, Product } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUploadFile } from '../../../interfaces/file';

import { Request } from 'express';
import { errorLogger } from '../../../shared/logger';
import { IProductFilterRequest, IProductRequest, IProductUpdateRequest } from './products.interface';
import { generateBarCode } from './products.utils';
import { ProductRelationalFields, ProductRelationalFieldsMapper, ProductSearchableFields } from './prroduct.constants';

// modules

// !----------------------------------Create New Category--------------------------------------->>>
const addProducts = async (req: Request): Promise<Product> => {
  //@ts-ignore
  const file = req.file as IUploadFile;

  const filePath = file?.path?.substring(8);

  //@ts-ignore
  const data = req.body as IProductRequest;

  // await ProductValidation(data);

  const result = await prisma.$transaction(async transactionClient => {
    const newProduct = {
      productName: data.productName,
      productPrice: data.productPrice,
      productDescription: data.productDescription,
      productImage: filePath,
      categoryId: data.categoryId,
    };

    const createProduct = await transactionClient.product.create({
      data: newProduct,
    });

    if (!createProduct) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Product creation failed');
    }

    const productVariations = data?.productVariations?.map((variant: any) => ({
      productId: createProduct.productId,
      barcodeCode: generateBarCode(),
      variantPrice: variant.variantPrice,
      color: variant.color,
      size: variant.size,
      stock: variant.stock,
    }));

    console.log('productVariations', productVariations);

    const createProductVariation = await transactionClient.productVariation.createMany({
      data: productVariations,
    });

    if (!createProductVariation) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Product variation creation failed');
    }

    return createProduct;
  });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to create Product, result error');
  }
  return result;
};

// !----------------------------------get all Product---------------------------------------->>>
const getProducts = async (filters: IProductFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<Product[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, categoryName, startDate, endDate, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.ProductWhereInput[] = [];

  // Add search term condition if provided

  if (searchTerm) {
    andConditions.push({
      OR: ProductSearchableFields.map((field: any) => ({
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
        if (ProductRelationalFields.includes(key)) {
          return {
            [ProductRelationalFieldsMapper[key]]: {
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

  //Filter By CreatedAt
  if (startDate && endDate) {
    andConditions.push({
      createdAt: {
        gte: startDate, // Greater than or equal to startDate
        lte: endDate, // Less than or equal to endDate
      },
    });
  }

  //Filter By Category
  if (categoryName) {
    andConditions.push({
      category: {
        categoryName: {
          equals: categoryName,
        },
      },
    });
  }

  // Create a whereConditions object with AND conditions
  const whereConditions: Prisma.ProductWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Courier with filtering and pagination
  const result = await prisma.product.findMany({
    where: whereConditions,
    include: {
      category: true,
      productVariations: true,
    },
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { updatedAt: 'desc' },
  });

  // Count total matching orders for pagination
  const total = await prisma.product.count({
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

// !----------------------------------get Single Courier---------------------------------------->>>
const getSingleProduct = async (productId: string): Promise<Product | null> => {
  if (!productId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'product Id is required');
  }

  const result = await prisma.product.findUnique({
    where: {
      productId,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Product Not Found!!');
  }

  return result;
};

// !----------------------------------Update Courier---------------------------------------->>>
const updateProduct = async (productId: string, req: Request): Promise<Product> => {
  const file = req.file as IUploadFile;
  const filePath = file?.path?.substring(8);

  const { productName, oldFilePath, productPrice, productStock, productDescription, categoryId, sizeVarientId, colorVarientId, productStatus } =
    req.body as IProductUpdateRequest;

  // deleting old style Image
  const oldFilePaths = 'uploads/' + oldFilePath;
  if (oldFilePath !== undefined && filePath !== undefined) {
    // @ts-ignore
    fs.unlink(oldFilePaths, err => {
      if (err) {
        errorLogger.error('Error deleting old file');
      }
    });
  }

  const result = await prisma.$transaction(async transactionClient => {
    const existingProduct = await transactionClient.product.findUnique({
      where: {
        productId,
      },
    });

    if (!existingProduct) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Product Not Found!!');
    }

    if (categoryId) {
      const isCategoryExist = await transactionClient.category.findUnique({
        where: {
          categoryId,
        },
      });

      if (!isCategoryExist) throw new ApiError(httpStatus.NOT_FOUND, ' Category Not Found!!');
    }

    if (colorVarientId) {
      const isColorExist = await transactionClient.colorVarient.findUnique({
        where: {
          colorVarientId,
        },
      });

      if (!isColorExist) throw new ApiError(httpStatus.NOT_FOUND, ' Color Not Found!!');
    }

    if (sizeVarientId) {
      const isSizeExist = await transactionClient.sizeVarient.findUnique({
        where: {
          sizeVarientId: sizeVarientId,
        },
      });

      if (!isSizeExist) throw new ApiError(httpStatus.NOT_FOUND, ' Size Not Found!!');
    }

    const updatedDetails = {
      productName,
      productDescription,
      productPrice,
      productStock,
      categoryId,
      colorVarientId,
      sizeVarientId,
      productStatus,
      productImage: filePath,
    };

    const updatedProduct = await transactionClient.product.update({
      where: {
        productId,
      },
      data: updatedDetails,
    });

    return updatedProduct;
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update Product Information');
  }

  return result;
};

const deleteProduct = async (productId: string): Promise<Product> => {
  if (!productId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Product Id is required');
  }

  const result = await prisma.product.delete({
    where: {
      productId,
    },
  });

  return result;
};

export const ProductService = {
  addProducts,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
