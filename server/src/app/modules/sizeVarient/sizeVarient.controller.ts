/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { SizeVarientService } from './sizeVarient.service';
import { SizeVarientFilterableFields } from './sizeVarient.constants';

// !----------------------------------Create New Hall---------------------------------------->>>
const addSizeVarientController = catchAsync(async (req: Request, res: Response) => {
  const result = await SizeVarientService.addSizeVarient(req.body);


  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Size Added Successfully',
    data: result,
  });
});

// !----------------------------------get all Hall---------------------------------------->>>
const getSizeVarientController = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, SizeVarientFilterableFields);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await SizeVarientService.getSizeVarient(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Size fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

// !----------------------------------Update Slot---------------------------------------->>>
const updateSizeVarient = catchAsync(async (req: Request, res: Response) => {
  const { sizeVarientId } = req.params;
  const payload = req.body;
  const result = await SizeVarientService.updateSizeVarient(sizeVarientId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Size Updated successfully !',
    data: result,
  });
});

const deleteSizeVarient = catchAsync(async (req: Request, res: Response) => {
  const { sizeVarientId } = req.params;
  const result = await SizeVarientService.deleteSizeVarient(sizeVarientId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Size Deleted successfully !',
    data: result,
  });
});

export const SizeVarientController = {
  addSizeVarientController,
  getSizeVarientController,
  updateSizeVarient,
  deleteSizeVarient,
};
