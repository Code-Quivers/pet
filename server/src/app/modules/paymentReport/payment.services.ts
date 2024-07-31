/* eslint-disable @typescript-eslint/no-explicit-any */
import Stripe from 'stripe';
import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

class PaymentReportService {
  private static fixAmountToTwoDecimal = (amount: number) => {
    // Multiply by 100 in last cause, Stripe receive payment in cents
    return parseFloat((Math.ceil(amount * 100) / 100).toFixed(2)) * 100;
  };

  static createPaymentReport = async (paymentReport: any): Promise<any> => {
    console.log(',,,,,,,,,,,,,,,,,,,,,,,,,,')
    console.log(paymentReport)
    try {
      const newPayment = await prisma.paymentReport.create({data:paymentReport});

      if (!newPayment) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create payment!!!');
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

  static getPaymentReport = async (paymentId: string) => {
    const paymentReport = await prisma.paymentReport.findUnique({
      where: { paymentId },
    });
    if (!paymentReport) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Payment information retrivation failed!!!');
    }
    return {
      jsonResponse: paymentReport,
      httpStatusCode: 200,
    };
  };

  static getPaymentReports = async (paymentId: string, orderId: string) => {
    const paymentsInfo = await prisma.paymentReport.findMany({
      where: {
        paymentId: paymentId,
        orderId: orderId,
      },
    });
    if (!paymentsInfo) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Payment information retrivation failed!!!');
    }
    return {
      jsonResponse: paymentsInfo,
      httpStatusCode: 200,
    };
  };
}

export default PaymentReportService;
