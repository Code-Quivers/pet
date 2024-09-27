import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { PaymentReportService } from './payment.services';
import { PaymentFilterableFields } from './payment.constant';
import pick from '../../../shared/pick';
import StripePaymentProcessor from '../payments/stripe.services';

const createPaymentController = catchAsync(async (req, res) => {
  const { orderId, paymentIntentId } = req.body;

  // Retrieve the Payment Intent
  const { jsonResponse } = await StripePaymentProcessor.retrieveStripePaymentInfo(paymentIntentId);

  // Get the latest charge ID from the Payment Intent
  const chargeId = jsonResponse?.latest_charge;

  // Generate payment report based on charge ID, payment intent info, and order ID
  const paymentReport = await StripePaymentProcessor.generatePaymentReport(chargeId, jsonResponse, orderId);

  // Create payment report in the database
  const paymentRes = await PaymentReportService.createPaymentReport(paymentReport, orderId);

  // Send response back to the client
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment information successfully retrieved!!!',
    data: paymentRes,
  });
});

const getAllPayment = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, PaymentFilterableFields);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await PaymentReportService.getPaymentReports(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment get Successfully',
    data: result,
  });
});

export const PaymentReportController = {
  getAllPayment,
  createPaymentController,
};
