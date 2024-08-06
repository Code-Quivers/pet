// import { Request, Response } from 'express';
// import httpStatus from 'http-status';


import { PaypalServices } from './paypal.services';
import { IRequestUser } from '../users/user.interface';

// import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend';
// import prisma from '../../../shared/prisma';
import { errorLogger } from '../../../shared/logger';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';

const payForOrder = catchAsync(async (req, res) => {
  // console.log('ordr api hit..............');
  // use the cart information passed from the front-end to calculate the order amount detals
  const paymentInfo = req.body;
  console.log(paymentInfo)
  const { jsonResponse, httpStatusCode } = await PaypalServices.createOrder(paymentInfo);
  sendResponse(res, {
    statusCode: httpStatusCode,
    success: true,
    message: 'Order creation successful!!!',
    data: jsonResponse,
  });
});

const paymentCapture = catchAsync(async (req, res) => {
  // console.log('orer capture with id.............');
  const platformOrderId = req.body?.platformOrderId;
  const orderId = req.body?.orderId;
  const userId = (req.user as IRequestUser).userId;

  const { jsonResponse, httpStatusCode } = await PaypalServices.captureOrder(platformOrderId);
  // res.status(httpStatusCode).json(jsonResponse);
  const capturedPaymentInfo = jsonResponse.purchase_units[0].payments.captures[0];
  const paymentReport = {
    platform: 'PAYPAL',
    paymentStatus: capturedPaymentInfo.status,
    amountToPay: parseFloat(capturedPaymentInfo.amount.value),
    amountPaid: parseFloat(capturedPaymentInfo.seller_receivable_breakdown.gross_amount.value),
    currency: capturedPaymentInfo.amount.currency_code,
    platformFee: parseFloat(capturedPaymentInfo.seller_receivable_breakdown.paypal_fee.value),
    netAmount: parseFloat(capturedPaymentInfo.seller_receivable_breakdown.net_amount.value),
    platformTransactionId: capturedPaymentInfo.id,
    platformOrderId: jsonResponse.id,
    refundLink: capturedPaymentInfo.links[1].href,
    transactionCreatedTime: capturedPaymentInfo.create_time,
    transactionUpdatedTime: capturedPaymentInfo.update_time,
    payerName: `${jsonResponse.payer.name.given_name} ${jsonResponse.payer.name.surname}`,
    payerEmailAddress: jsonResponse.payer.email_address,
    orderId,
    userId,
  };
  // console.log(paymentReport);

  const result = await PaymentServices.createPaymnentReport(paymentReport);

  if (!result) {
    errorLogger.error('Failed to add payment information');
  }

  sendResponse(res, {
    statusCode: httpStatusCode,
    success: true,
    message: 'Payment capture successful!!!',
    data: { paymentStatus: capturedPaymentInfo.status },
  });
});

export const PaypalController = {
  payForOrder,
  paymentCapture,
};