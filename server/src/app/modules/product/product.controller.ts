/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ProductService } from './product.service';
import { ProductFilterableFields } from './prroduct.constants';

// !----------------------------------Create New Category---------------------------------------->>>
const addProductController = catchAsync(async (req: Request, res: Response) => {
  // @ts-ignore
  const result = await ProductService.addProduct(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product Added Successfully',
    data: result,
  });
});

// !----------------------------------get all Category---------------------------------------->>>
const getProductController = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ProductFilterableFields);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await ProductService.getProduct(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Product fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

// !----------------------------------get Single Category---------------------------------------->>>
const getSingleProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await ProductService.getSingleProduct(productId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved successfully',
    data: result,
  });
});

// !----------------------------------Update Category---------------------------------------->>>
const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  // console.log('productId', productId);
  // @ts-ignore
  const result = await ProductService.updateProduct(productId, req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Product Updated successfully !',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await ProductService.deleteProduct(productId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product Deleted successfully !',
    data: result,
  });
});

export const ProductController = {
  addProductController,
  getProductController,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
