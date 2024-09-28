import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { TaxValidation } from './tax.validations';
import { UserRoles } from '@prisma/client';
import auth from '../../middlewares/auth';
import { TaxController } from './taxcontroller';
import { AdController } from './ad.controller';
import { AdValidation } from './ad.validation';

const router = express.Router();

// ! Create New List ------------------------------->>>
router.post('/', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), validateRequest(AdValidation.addAdvertisement), AdController.createAdvertisement);

// ! Get all List----------------------------------->>>
router.get('/', AdController.getAdvertisement);

router.patch('/:adId', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), validateRequest(AdValidation.editAdvertisement), AdController.editAdvertisement);

router.delete('/:adId', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), AdController.deleteAdvertisement);

//export Route
export const AdRoutes = router;
