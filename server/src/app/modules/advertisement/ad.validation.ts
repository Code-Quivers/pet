import { z } from 'zod';

const addAdvertisement = z.object({
  body: z.object({
    adTitle: z.string().min(3).max(255),
    adDetails: z.string().min(3).max(500),
    startDate: z.string(),
    endDate: z.string(),
    isActive: z.boolean(),

  }),
});



const editAdvertisement = z.object({
    params: z.object({
        adId: z.string(),
    }),
    body: z.object({
        adTitle: z.string().min(3).max(255).optional(),
        adDetails: z.string().min(3).max(500).optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        isActive: z.boolean().optional(),
    }),
})


export const AdValidation = {
    addAdvertisement,
    editAdvertisement
};
