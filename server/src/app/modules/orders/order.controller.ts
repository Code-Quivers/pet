/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './orders.service';
import { OrderFilterableFields } from './orders.constants';

// !----------------------------------get all Hall---------------------------------------->>>

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
  updateOrder,
  deleteOrder,
  monthWiseOrder,
};