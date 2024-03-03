/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BarcodeService } from './barcode.service';

// !----------------------------------get Single Category---------------------------------------->>>
const getSingleBarCode = catchAsync(async (req: Request, res: Response) => {
  const { productCode } = req.params;
  const result = await BarcodeService.getSingleBarCode(productCode);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Barcode Link retrieved successfully',
    data: result,
  });
});

export const BarcodeController = {
  getSingleBarCode,
};
