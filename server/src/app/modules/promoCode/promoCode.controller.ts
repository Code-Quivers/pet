/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { PromoCodeFilterableFields } from './promoCode.constants';
import { PromoCodeService } from './promoCode.service';

// !----------------------------------Create New Hall---------------------------------------->>>
const addPromo = catchAsync(async (req: Request, res: Response) => {
  const result = await PromoCodeService.addPromoCode(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Added Successfully',
    data: result,
  });
});

// !----------------------------------get all Hall---------------------------------------->>>
const getPromo = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, PromoCodeFilterableFields);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await PromoCodeService.getPromoCode(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getPromotionalOffer = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, PromoCodeFilterableFields);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await PromoCodeService.getPromotionalOffer(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

// !----------------------------------Update Slot---------------------------------------->>>
const updatePromo = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await PromoCodeService.updatePromoCode(id, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Updated successfully !',
    data: result,
  });
});

const deletePromotionRule = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await PromoCodeService.deletePromotionRuleCode(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted successfully !',
    data: result,
  });
});

export const PromoCodeController = {
  addPromo,
  getPromo,
  updatePromo,
  deletePromotionRule,
  getPromotionalOffer,
};
