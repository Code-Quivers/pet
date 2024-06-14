/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order, OrderStatus, Prisma, Tax } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IGenericResponse } from '../../../interfaces/common';
import { IOrderFilterRequest, IOrderRequest } from './orders.interface';
import { OrderRelationalFields, OrderRelationalFieldsMapper, OrderSearchableFields } from './orders.constants';
import { format, subMonths } from 'date-fns';
import { ITaxUpdateRequest } from '../tax/tax.interface';

// modules

// !----------------------------------Create New Event------------------------------------->>>
const addOrder = async (data: IOrderRequest): Promise<any> => {
  const cartItems = data.cartItems.map(item => {
    return {
      productName: item.productName,
      productId: item.productId,
      variantId: item.variantId,
      price: item.price,
      quantity: item.quantity,
      // color: {
      //   name: item.color.name,
      //   code: item.color.code,
      // },
    };
  });

  const paymentInfo = {
    subtotal: data.paymentInformation.subtotal,
    taxes: data.paymentInformation.taxes,
    total: data.paymentInformation.total,
  };

  const orderObj = {
    firstName: data.firstName,
    lastName: data.lastName,
    address: data.address,
    city: data.city,
    state: data.state,
    zip: data.zip,
    email: data.email,
    phone: data.phone,
    orderStatus: data.orderStatus as OrderStatus,
    paymentInformation: paymentInfo,
    cartItems: cartItems,
  };

  const result = await prisma.$transaction(async transactionClient => {
    const newOrder = await transactionClient.order.create({
      data: orderObj,
      select: {
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        cartItems: true,
      },
    });

    // Update stock for each variant product
    // for (const item of cartItems) {
    //   await transactionClient.productVariation.update({
    //     where: {
    //       variantId: item.variantId,
    //     },
    //     data: {
    //       stock: {
    //         decrement: item.quantity,
    //       },
    //     },
    //   });
    // }

    return newOrder;
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
  const { searchTerm, orderStatus, ...filterData } = filters;

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

  if (orderStatus) {
    andConditions.push({
      orderStatus: {
        equals: orderStatus,
      },
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

const monthWiseOrder = async (): Promise<any> => {
  const currentDate = new Date();

  // Create an array of the last 12 months
  const last12Months = Array.from({ length: 12 }, (_, i) => {
    const date = subMonths(currentDate, i);
    return format(date, 'MMMM yyyy');
  }).reverse();

  const monthMap: { [key: string]: number } = last12Months.reduce((acc, month) => {
    acc[month] = 0;
    return acc;
  }, {} as { [key: string]: number });

  const result = await prisma.order.findMany({
    select: {
      createdAt: true,
    },
  });

  result.forEach(order => {
    const date = new Date(order.createdAt);
    const monthYear = format(date, 'MMMM yyyy');
    if (monthMap[monthYear] !== undefined) {
      monthMap[monthYear] += 1;
    }
  });

  const formattedResult = Object.keys(monthMap).map(month => ({
    month,
    order: monthMap[month],
  }));

  return formattedResult;
};

monthWiseOrder()
  .then(() => console.log('data'))
  .catch(error => console.error('Error:', error))
  .finally(async () => {
    await prisma.$disconnect();
  });

const createOrder = async (orderData: any) => {
  const result = await prisma.$transaction(async transactionClient => {
    const newOrder = await transactionClient.order.create({
      data: orderData,
      select: {
        orderId: true,
      },
    });
    if (!newOrder) {
      throw new ApiError(400, 'Failed to create order');
    }
    return newOrder;
  });
  return result;
};
export const OrderService = {
  addOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  monthWiseOrder,
  createOrder,
};
