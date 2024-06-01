/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './orders.service';
import { OrderFilterableFields } from './orders.constants';

// !----------------------------------Create New Hall---------------------------------------->>>
const addOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.addOrder(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Added Successfully',
    data: result,
  });
});

// !----------------------------------get all Hall---------------------------------------->>>
const getOrder = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, OrderFilterableFields);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await OrderService.getOrder(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

// !----------------------------------Update Slot---------------------------------------->>>
const updateOrder = catchAsync(async (req: Request, res: Response) => {
  const { taxId } = req.params;
  const payload = req.body;
  const result = await OrderService.updateOrder(taxId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Updated successfully !',
    data: result,
  });
});

const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const { taxId } = req.params;
  const result = await OrderService.deleteOrder(taxId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Deleted successfully !',
    data: result,
  });
});

const monthWiseOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.monthWiseOrder();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'fetched successfully',
    data: result,
  });
});

export const OrderController = {
  addOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  monthWiseOrder,
};
