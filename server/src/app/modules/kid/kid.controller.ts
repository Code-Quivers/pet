/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { PetService } from './kid.service';
import { IRequestUser } from './kid.interface';

// !----------------------------------Create New Category---------------------------------------->>>
const addPetController = catchAsync(async (req: Request, res: Response) => {
  // @ts-ignore
  const result = await PetService.addPet(req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Pet Added Successfully',
    data: result,
  });
});

// !----------------------------------get all Category---------------------------------------->>>
const getPetController = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, ProductFilterableFields);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await PetService.getPet(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Product fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

// !----------------------------------Update Category---------------------------------------->>>
const updatePet = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  // console.log('productId', productId);
  // @ts-ignore
  const result = await PetService.updatePet(productId, req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Product Updated successfully !',
    data: result,
  });
});

const deletePet = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await PetService.deletePet(productId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product Deleted successfully !',
    data: result,
  });
});

export const PetController = {
  addPetController,
  getPetController,
  updatePet,
  deletePet,
};
