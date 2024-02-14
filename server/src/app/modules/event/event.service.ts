/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Event, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IEventListFilterRequest, IEventRequest, IEventUpdateRequest, IGenericEventResponse } from './event.interface';
import { EventListRelationalFields, EventListRelationalFieldsMapper, EventListSearchableFields } from './event.constants';
import e from 'cors';
import { date } from 'zod';

// modules

// !----------------------------------Create New Event------------------------------------->>>
const addEvent = async (data: IEventRequest): Promise<Event> => {
  if (!data.name) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name is required');
  }
  if (!data.description) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Description is required');
  }

  const dataObj = {
    name: data.name,
    description: data.description,
  };

  const result = await prisma.event.create({
    data: dataObj,
  });

  if (!result) throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to add Event');

  return result;
};

// !----------------------------------get all Event---------------------------------------->>>
const getEvent = async (filters: IEventListFilterRequest, options: IPaginationOptions): Promise<any> => {
  // Calculate pagination options
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);

  // Destructure filter properties
  const { searchTerm, ...filterData } = filters;

  // Define an array to hold filter conditions
  const andConditions: Prisma.EventWhereInput[] = [];

  // Add search term condition if provided

  if (searchTerm) {
    andConditions.push({
      OR: EventListSearchableFields.map((field: any) => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  // Add filterData conditions if filterData is provided
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (EventListRelationalFields.includes(key)) {
          return {
            [EventListRelationalFieldsMapper[key]]: {
              name: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  // Create a whereConditions object with AND conditions
  const whereConditions: Prisma.EventWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

  // Retrieve Courier with filtering and pagination
  const result = await prisma.event.findMany({
    include: {
      EventDate: {
        select: {
          eventDate: true,
          title: true,
          id: true,
          halls: {
            select: {
              hallId: true,
            },
          },
        },
      },
    },

    where: whereConditions,
    skip,
    take: limit,
    orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { updatedAt: 'desc' },
  });

  const eventDateId: string[] = [];

  result.map(event => {
    event.EventDate.map(eventDate => {
      eventDateId.push(eventDate.id);
    });
  });

  console.log('eventDateId', eventDateId);

  const findHall = await prisma.hall.findMany({
    where: {
      eventDate: {
        some: {
          id: {
            in: eventDateId,
          },
        },
      },
    },
    select: {
      hallName: true,
      hallId: true,
    },
  });

  console.log('findHall', findHall);

  const finalResult = result.map(event => {
    return {
      ...event,
      hallList: findHall.filter(hall => event.EventDate.some(date => date.halls.some(h => h.hallId === hall.hallId))),
    };
  });

  // Count total matching orders for pagination
  const total = await prisma.event.count({
    where: whereConditions,
  });

  // Calculate total pages
  const totalPage = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: finalResult,
  };
};

// !----------------------------------get Single Courier---------------------------------------->>>
const getSingleEvent = async (eventId: string): Promise<Event | null> => {
  if (!eventId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Event Id is required');
  }

  const result = await prisma.event.findUnique({
    where: {
      eventId,
    },
    include: {
      EventDate: {
        select: {
          hall: {
            select: {
              hallId: true,
              hallName: true,
            },
          },
          eventDate: true,
        },
      },
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event Not Found!!');
  }

  return result;
};

// !----------------------------------Update Courier---------------------------------------->>>
const updateEvent = async (eventId: string, payload: IEventUpdateRequest): Promise<Event> => {
  const result = await prisma.$transaction(async transactionClient => {
    const existingEvent = await transactionClient.event.findUnique({
      where: {
        eventId,
      },
    });

    if (!existingEvent) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Event Not Found!!');
    }

    const updatedDetails = {
      name: payload?.name,
      description: payload?.description,
    };

    const updatedEvent = await transactionClient.event.update({
      where: {
        eventId,
      },
      data: updatedDetails,
    });

    return updatedEvent;
  });

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update Event Information');
  }

  return result;
};

const deleteEvent = async (eventId: string): Promise<Event> => {
  if (!eventId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Event Id is required');
  }

  const result = await prisma.event.delete({
    where: {
      eventId,
    },
  });

  return result;
};

export const EventService = {
  addEvent,
  getEvent,
  getSingleEvent,
  updateEvent,
  deleteEvent,
};
