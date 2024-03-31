/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { BarcodeService } from './barcode.service';
import { BarcodeFilterableFields } from './barcode.constant';
import pick from '../../../shared/pick';

const getProductBarcodes = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, BarcodeFilterableFields);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await BarcodeService.getProductBarcodes(filters, options);

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
  const { code } = req.params;

  const result = await BarcodeService.getSingleBarCode(code);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Kid Details retrieved successfully',
    data: result,
  });
});

const getSingleVariant = catchAsync(async (req: Request, res: Response) => {
  const { variantId } = req.params;
  // console.log('variantId', variantId);

  const result = await BarcodeService.getSingleVariant(variantId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Barcode Link retrieved successfully',
    data: result,
  });
});

export const BarcodeController = {
  getSingleBarCode,
  getProductBarcodes,
  getSingleVariant,
};
