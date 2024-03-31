/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { KidService } from './kid.service';
import { KidFilterableFields } from './kid.constants';

// !----------------------------------Create New Category---------------------------------------->>>
const addKid = catchAsync(async (req: Request, res: Response) => {
  // @ts-ignore
  const result = await KidService.addKid(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Kid Added Successfully',
    data: result,
  });
});

// !----------------------------------get all Category---------------------------------------->>>
const getKid = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, KidFilterableFields);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await KidService.getKid(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Kid fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

// !----------------------------------Update Category---------------------------------------->>>
const updateKid = catchAsync(async (req: Request, res: Response) => {
  const { kidId } = req.params;
  const result = await KidService.updateKid(kidId, req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Updated successfully !',
    data: result,
  });
});

const deleteKid = catchAsync(async (req: Request, res: Response) => {
  const { kidId } = req.params;
  const result = await KidService.deleteKid(kidId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted successfully !',
    data: result,
  });
});

export const KidController = {
  addKid,
  getKid,
  updateKid,
  deleteKid,
};