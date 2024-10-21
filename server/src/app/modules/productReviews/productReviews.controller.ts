/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ProductReviewFilterableFields } from './productReviews.constants';
import { ProductReviewService } from './productReviews.service';

// !----------------------------------Create New Category---------------------------------------->>>
const addProductReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductReviewService.addProductReview(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review Added Successfully',
    data: result,
  });
});

// !----------------------------------get all Category---------------------------------------->>>
const getAllProductReviews = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ProductReviewFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await ProductReviewService.getAllProductReviews(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Review fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

// !----------------------------------Update Category---------------------------------------->>>
const editProductReview = catchAsync(async (req: Request, res: Response) => {
  const { productReviewId } = req.params;
  // @ts-ignore
  const result = await ProductReviewService.editProductReview(productReviewId, req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review Updated successfully !',
    data: result,
  });
});

const deleteProductReview = catchAsync(async (req: Request, res: Response) => {
  const { productReviewId } = req.params;
  const result = await ProductReviewService.deleteProductReview(productReviewId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review Deleted successfully !',
    data: result,
  });
});

export const ProductReviewController = {
  addProductReview,
  getAllProductReviews,
  editProductReview,
  deleteProductReview,
};
