/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BarcodeService } from './barcode.service';
import { BarcodeFilterableFields } from './barcode.constant';
import pick from '../../../shared/pick';

const getBarcodeController = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, BarcodeFilterableFields);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await BarcodeService.getProductBarcode(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Barcode fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

// !----------------------------------get Single Category---------------------------------------->>>
const getSingleBarCode = catchAsync(async (req: Request, res: Response) => {
  const { barcodeCode } = req.params;
  console.log('barcodeCode', barcodeCode);

  const result = await BarcodeService.getSingleBarCode(barcodeCode);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Barcode Link retrieved successfully',
    data: result,
  });
});

export const BarcodeController = {
  getSingleBarCode,
  getBarcodeController,
};
