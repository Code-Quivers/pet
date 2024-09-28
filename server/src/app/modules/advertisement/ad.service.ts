import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IAdvertisement, IAdvertisementFilterRequest, IEditAdvertisement } from "./ad.interface"
import prisma from "../../../shared/prisma";
import { Prisma, Advertisement } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { AdRelationalFields, AdRelationalFieldsMapper, AdSearchableFields } from "./ad.constant";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";

const createAdvertisement = async (data: IAdvertisement): Promise<Advertisement> => {
    return prisma.$transaction(async transactionClient => {
      // Only check for existing active ads if the new ad is trying to be active
      if (data.isActive) {
        const findActiveAd = await transactionClient.advertisement.findMany({
          where: { isActive: true },
        });
  
       
        if (findActiveAd) {
          throw new ApiError(httpStatus.BAD_REQUEST, 'There is already an active Advertisement!!!');
        }
      }
  
      const newAd = await transactionClient.advertisement.create({
        data: {
          adTitle: data.adTitle,
          adDetails: data.adDetails,
          startDate: data.startDate,
          endDate: data.endDate,
          isActive: data.isActive, 
        },
      });
  
      if(!newAd){
        throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Advertisement!!!');
      }

      return newAd;
    });
  };
  

const getAdvertisement = async (filters: IAdvertisementFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<Advertisement[]>> => {
    // Calculate pagination options
    const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  
    // Destructure filter properties
    const { searchTerm, ...filterData } = filters;
  
    // Define an array to hold filter conditions
    const andConditions: Prisma.AdvertisementWhereInput[] = [];
  
    // Add search term condition if provided
  
    if (searchTerm) {
      andConditions.push({
        OR: [
          ...AdSearchableFields.map((field: any) => ({
            [field]: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          })),
        ],
      });
    }
  
    // Add filterData conditions if filterData is provided
    if (Object.keys(filterData).length > 0) {
      andConditions.push({
        AND: Object.keys(filterData).map(key => {
          if (AdRelationalFields.includes(key)) {
            return {
              [AdRelationalFieldsMapper[key]]: {
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
    const whereConditions: Prisma.AdvertisementWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};
  
    // Retrieve Courier with filtering and pagination
    const result = await prisma.advertisement.findMany({
      where: whereConditions,
      skip,
      take: limit,
      orderBy: options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { createdAt: 'desc' },
    });
  
    // Count total matching orders for pagination
    const total = await prisma.advertisement.count({
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
      data: result,
    };
  };

  const editAdvertisement = async (adId: string, data: IEditAdvertisement): Promise<Advertisement> => {
    return prisma.$transaction(async transactionClient => {
      const ad = await transactionClient.advertisement.findUnique({
        where: {
          adId: adId,
        },
      });
  
      if (!ad) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Advertisement not found!');
      }
  
      const updatedAd = await transactionClient.advertisement.update({
        where: {
          adId: adId,
        },
        data: {
          adTitle: data.adTitle,
          adDetails: data.adDetails,
          startDate: data.startDate,
          endDate: data.endDate,
          isActive: data.isActive
        },
      });
  
      if (updatedAd.isActive) {
        
        await transactionClient.advertisement.updateMany({
          where: {
            adId: {
              not: adId,
            },
            isActive: true 
          },
          data: {
            isActive: false,
          },
        });
      }
  
      return updatedAd;
    });
  };
  


const deleteAdvertisement = async (adId: string): Promise<Advertisement> => {
    if (!adId) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Advertisement Id is required!!!');
    }
  
    const result = await prisma.advertisement.delete({
      where: {
        adId,
      },
    });
  
    return result;
}


export const AdService ={
    createAdvertisement,
    getAdvertisement,
    editAdvertisement,
    deleteAdvertisement
}