/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order, Prisma, Tax } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IGenericResponse } from '../../../interfaces/common';
import { IOrderFilterRequest, IOrderRequest } from './orders.interface';
import { OrderRelationalFields, OrderRelationalFieldsMapper, OrderSearchableFields } from './orders.constants';

// modules

// !----------------------------------Create New Event------------------------------------->>>
const addOrder = async (data: IOrderRequest): Promise<Order> => {
  const shippingInfo = {
    firstName: data.shippingInformation.firstName,
    lastName: data.shippingInformation.lastName,
    address: data.shippingInformation.address,
    city: data.shippingInformation.city,
    state: data.shippingInformation.state,
    postcode: data.shippingInformation.postcode,
    email: data.shippingInformation.email,
    phone: data.shippingInformation.phone,
  };

  const cartItems = data.cartItems.map(item => {
    return {
      productName: item.productName,
      productId: item.productId,
      variantId: item.variantId,
      price: item.price,
      quantity: item.quantity,
      color: {
        name: item.color.name,
        code: item.color.code,
      },
    };
  });

  const paymentInfo = {
    subtotal: data.paymentInformation.subtotal,
    taxes: data.paymentInformation.taxes,
    total: data.paymentInformation.total,
  };

  const result = await prisma.order.create({
    data: {
      shippingInformation: shippingInfo,
      paymentInformation: paymentInfo,
      cartItems,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create !!');
  }

  return result;
};

// !----------------------------------get all Event---------------------------------------->>>
const getOrder = async (filters: IOrderFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<Order[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.OrderWhereInput[] = [];

  // Add search term condition if provided

  if (searchTerm) {
    andConditions.push({
      OR: [
        ...OrderSearchableFields.map((field: any) => ({
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
        if (OrderRelationalFields.includes(key)) {
          return {
            [OrderRelationalFieldsMapper[key]]: {
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
  const whereConditions: Prisma.OrderWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Courier with filtering and pagination
  const result = await prisma.order.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { createdAt: 'desc' },
  });

  // Count total matching orders for pagination
  const total = await prisma.order.count({
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
const updateOrder = async (taxId: string, payload: ITaxUpdateRequest): Promise<Tax> => {
  const result = await prisma.$transaction(async transactionClient => {
    const existingTax = await transactionClient.tax.findUnique({
      where: {
        taxId,
      },
    });

    if (!existingTax) {
      throw new ApiError(httpStatus.NOT_FOUND, 'tax Not Found!!');
    }

    const updatedDetails = {
      state: payload.state,
      tax: payload.tax ? parseFloat(payload.tax) : undefined,
    };

    const updatedTax = await transactionClient.tax.update({
      where: {
        taxId,
      },
      data: updatedDetails,
    });

    return updatedTax;
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update !!');
  }

  return result;
};

const deleteOrder = async (taxId: string): Promise<Tax> => {
  if (!taxId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'taxId is required');
  }

  const result = await prisma.tax.delete({
    where: {
      taxId,
    },
  });

  return result;
};

export const OrderService = {
  addOrder,
  getOrder,
  updateOrder,
  deleteOrder,
};
