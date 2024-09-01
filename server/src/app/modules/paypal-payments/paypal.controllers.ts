import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { PaypalService } from './paypal.services';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';

const createPaypalController = catchAsync(async (req: Request, res: Response) => {
  const paymentData = req.body;
  const payment = await PaypalService.createPaypalPayment(paymentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment successfully !',
    data: payment,
  });
});

export const PaypalController = {
  createPaypalController,
};
