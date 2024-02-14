/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { EventService } from './event.service';
import { EventFilterableFields } from './event.constants';

// !----------------------------------Create New Hall---------------------------------------->>>
const addEventController = catchAsync(async (req: Request, res: Response) => {
  const result = await EventService.addEvent(req.body);
  console.log('result', result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event Added Successfully',
    data: result,
  });
});

// !----------------------------------get all Hall---------------------------------------->>>
const getEventController = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, EventFilterableFields);

  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder']);

  const result = await EventService.getEvent(filters, options);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Events fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

// !----------------------------------get Single Slot---------------------------------------->>>
const getSingleEvent = catchAsync(async (req: Request, res: Response) => {
  const { eventId } = req.params;
  const result = await EventService.getSingleEvent(eventId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event retrieved successfully',
    data: result,
  });
});

// !----------------------------------Update Slot---------------------------------------->>>
const updateEvent = catchAsync(async (req: Request, res: Response) => {
  const { eventId } = req.params;
  const payload = req.body;
  const result = await EventService.updateEvent(eventId, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event Updated successfully !',
    data: result,
  });
});

const deleteEvent = catchAsync(async (req: Request, res: Response) => {
  const { eventId } = req.params;
  const result = await EventService.deleteEvent(eventId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Event Deleted successfully !',
    data: result,
  });
});

export const EventController = {
  addEventController,
  getEventController,
  getSingleEvent,
  updateEvent,
  deleteEvent,
};
