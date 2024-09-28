/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { AdService } from './ad.service';
import { AdFilterableFields } from './ad.constant';


// !----------------------------------Create New Hall---------------------------------------->>>
const createAdvertisement = catchAsync(async (req: Request, res: Response) => {
  const result = await AdService.createAdvertisement(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Publish Successfully',
    data: result,
  });
});

// !----------------------------------get all Hall---------------------------------------->>>
const getAdvertisement = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, AdFilterableFields);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await AdService.getAdvertisement(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

// !----------------------------------Update Slot---------------------------------------->>>
const editAdvertisement = catchAsync(async (req: Request, res: Response) => {
  const { adId } = req.params;
  const payload = req.body;
  const result = await AdService.editAdvertisement(adId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Updated successfully !',
    data: result,
  });
});

const deleteAdvertisement = catchAsync(async (req: Request, res: Response) => {
  const { adId } = req.params;
  const result = await AdService.deleteAdvertisement(adId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted successfully !',
    data: result,
  });
});

export const AdController = {
    createAdvertisement,
    getAdvertisement,
    editAdvertisement,
    deleteAdvertisement
};
