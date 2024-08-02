/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './orders.service';

// !----------------------------------Create Order---------------------------------------->>>
const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { deliveryInfo, cart } = req.body;
  const orderData = {
    ...deliveryInfo,
    cartItems: cart,
  };
  const newOrder = await OrderService.createOrder(orderData);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order Created !',
    data: newOrder,
  });
});
// !----------------------------------Update Order---------------------------------------->>>
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

export const OrderController = { createOrder, updateOrder, deleteOrder, monthWiseOrder };
