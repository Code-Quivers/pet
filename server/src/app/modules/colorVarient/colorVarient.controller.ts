import { ColorVarient } from '@prisma/client';
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ColorVarientService } from './colorVarient.service';
import { ColorVarientFilterableFields } from './colorVarient.constants';

// !----------------------------------Create New Hall---------------------------------------->>>
const addColorVarientController = catchAsync(async (req: Request, res: Response) => {
  const result = await ColorVarientService.addColorVarient(req.body);
  console.log('result', result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Color Varient Added Successfully',
    data: result,
  });
});

// !----------------------------------get all Hall---------------------------------------->>>
const getColorVarientController = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ColorVarientFilterableFields);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await ColorVarientService.getColorVarient(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Color Varient fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

// !----------------------------------Update Slot---------------------------------------->>>
const updateColorVarient = catchAsync(async (req: Request, res: Response) => {
  const { colorVarientId } = req.params;
  const payload = req.body;
  const result = await ColorVarientService.updateColorVarient(colorVarientId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Color Varient Updated successfully !',
    data: result,
  });
});

const deleteColorVarient = catchAsync(async (req: Request, res: Response) => {
  const { colorVarientId } = req.params;
  const result = await ColorVarientService.deleteColorVarient(colorVarientId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Color Varient Deleted successfully !',
    data: result,
  });
});

export const ColorVarientController = {
  addColorVarientController,
  getColorVarientController,
  updateColorVarient,
  deleteColorVarient,
};
