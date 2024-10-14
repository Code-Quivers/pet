/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order, Prisma } from '@prisma/client';
import { Response } from 'express';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { OrderRelationalFields, OrderRelationalFieldsMapper, OrderSearchableFields } from './orders.constants';
import { format, subMonths } from 'date-fns';
import { ICreateNewOrder } from './orders.interface';
import pdf from 'html-pdf';
import puppeteer from 'puppeteer';

// !----------------------------------get all order ---------------------------------------->>>
const getOrders = async (filters: any, options: IPaginationOptions): Promise<any> => {
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
    include: {
      paymentInfo: true,
    },
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

const getOrder = async (orderId: string) => {
  if (!orderId) throw new ApiError(httpStatus.BAD_REQUEST, 'Order Id is required!!');

  const order = await prisma.order.findUnique({ where: { orderId } });

  if (!order) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Order retrieve failed!!!');
  }
  return order;
};

// !----------------------------------Update order---------------------------------------->>>
const updateOrder = async (orderId: string): Promise<any> => {
  const result = await prisma.$transaction(async transactionClient => {
    const updatedOrder = await transactionClient.order.update({
      where: {
        orderId,
      },
      data: { orderStatus: 'CONFIRMED' },
    });

    if (!updatedOrder) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Order not found or order data update failed!!!');
    }

    return updatedOrder;
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update !!');
  }

  return result;
};

const deleteOrder = async (orderId: string): Promise<Order> => {
  if (!orderId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'orderId is required');
  }

  const result = await prisma.order.delete({
    where: {
      orderId,
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

// monthWiseOrder()
//   .then(() => console.log(''))
//   .catch(error => console.error('Error:', error))
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

// ! creating new order data
const createOrder = async (orderData: ICreateNewOrder) => {
  const result = await prisma.$transaction(async transactionClient => {
    const newOrder = await transactionClient.order.create({
      data: {
        deliveryInfo: orderData?.deliveryInfo,
        cartItems: orderData?.cart,
        subTotal: orderData?.orderPayAmount?.subtotal,
        tax: orderData?.orderPayAmount?.tax,
      },
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

// ! creating invoice

// Function to generate the PDF from HTML
const generatePdf = async (html: string): Promise<Buffer> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '20px', bottom: '20px', left: '20px', right: '20px' },
  });

  await browser.close();
  return Buffer.from(pdfBuffer); // Convert Uint8Array to Buffer and return
};

// Function to generate HTML for the invoice (you need to implement this based on your order structure)
const generateHtmlForInvoice = (order: any): string => {
  // Construct and return the HTML string for the invoice
  return `
        <html>
            <body>
                <h1>Invoice for Order ID: ${order.orderId}</h1>
                <!-- Include other order details -->
            </body>
        </html>
    `;
};

// Service function to get a single invoice and generate a PDF
const getSingleInvoice = async (orderId: string): Promise<Buffer> => {
  // Fetch the order from the database
  const order = await prisma.order.findUnique({
    where: { orderId },
    include: { paymentInfo: true },
  });

  if (!order) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Order retrieve failed!!!');
  }

  // Construct the raw HTML for the invoice
  const html = generateHtmlForInvoice(order); // Function to generate HTML based on order data

  console.log('html', html);
  // Generate and return the PDF buffer
  return await generatePdf(html);
};

export const OrderService = {
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  monthWiseOrder,
  createOrder,
  getSingleInvoice,
};
