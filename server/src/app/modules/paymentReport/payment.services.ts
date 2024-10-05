/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '../../../shared/prisma';
import { PaymentReport, Prisma } from '@prisma/client';
import { IPaymentFilterRequest, IStripePaymentReqData } from './payment.interfaces';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { PaymentRelationalFields, PaymentRelationalFieldsMapper, PaymentSearchableFields } from './payment.constant';
import { IPaginationOptions } from '../../../interfaces/pagination';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { OrderService } from '../orders/orders.service';

// const getPaymentReports = async (): Promise<PaymentReport[]> => {
//   const paymentReports = await prisma.paymentReport.findMany();

//   if (!paymentReports) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'Payment Reports not found');
//   }

//   return paymentReports;
// };

const createPaymentReport = async (paymentReport: IStripePaymentReqData, orderId: string) => {
  const { gateWay, status, totalAmountPaid, totalAmountToPaid, gateWayFee, paymentPlatformId, ...others } = paymentReport || {};

  // const get the order data
  const orderInfo: any = await prisma.order.findUnique({
    where: {
      orderId,
    },
    select: {
      deliveryInfo: true,
    },
  });

  const paymentData = {
    payerName: `${orderInfo?.deliveryInfo?.firstName} ${orderInfo?.deliveryInfo?.lastName}`,
    payerEmailAddress: orderInfo?.deliveryInfo?.email,
    paymentPlatformId,
    paymentPlatform: gateWay,
    paymentStatus: status,
    amountPaid: totalAmountPaid,
    amountToPay: totalAmountToPaid,
    platformFee: gateWayFee,
    ...others,
  };

  const isExistPaymentReport = await prisma.paymentReport.findUnique({
    where: {
      paymentPlatformId,
    },
  });

  if (isExistPaymentReport) {
    return {
      message: 'Already Exist Payment Report',
    };
  }

  try {
    const newPayment = await prisma.paymentReport.create({
      data: paymentData,
    });

    if (!newPayment) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create payment!!!');
    }

    //
    if (paymentData.paymentStatus === 'succeeded') {
      // updating order details
      await OrderService.updateOrder(orderId);
    }

    return {
      jsonResponse: newPayment,
      httpStatusCode: 201,
    };
  } catch (err) {
    console.log(err);
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create payment!!!');
  }
};

const getPaymentReports = async (filters: IPaymentFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<PaymentReport[]>> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.PaymentReportWhereInput[] = [];

  // Add search term condition if provided

  if (searchTerm) {
    andConditions.push({
      OR: PaymentSearchableFields.map((field: any) => ({
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
        if (PaymentRelationalFields.includes(key)) {
          return {
            [PaymentRelationalFieldsMapper[key]]: {
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

  // Create a whereConditions object with AND conditions
  const whereConditions: Prisma.PaymentReportWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Courier with filtering and pagination
  const result = await prisma.paymentReport.findMany({
    include: {
      order: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { createdAt: 'desc' },
  });

  // Count total matching orders for pagination
  const total = await prisma.paymentReport.count({
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

const getSinglePaymentReport = async (paymentPlatformId: string): Promise<PaymentReport> => {
  const paymentReport = await prisma.paymentReport.findUnique({
    where: {
      paymentPlatformId,
    },
    include: {
      order: true,
    },
  });

  if (!paymentReport) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Payment Report not found');
  }

  return paymentReport;
};

export const PaymentReportService = { getPaymentReports, createPaymentReport, getSinglePaymentReport };
