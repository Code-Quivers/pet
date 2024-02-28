import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { EventValidation, SizeVarientValidation } from './sizeVarient.validations';
import { UserRoles } from '@prisma/client';
import auth from '../../middlewares/auth';
import { EventController, SizeVarientController } from './sizeVarient.controller';

const router = express.Router();

// ! Create New List ------------------------------->>>
router.post(
  '/',
  auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  validateRequest(SizeVarientValidation.addSize),
  SizeVarientController.addSizeVarientController
);

// ! Get all List----------------------------------->>>
router.get('/', SizeVarientController.getSizeVarientController);

router.patch('/:eventId', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), SizeVarientController.updateSizeVarient);

router.delete('/:eventId', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), SizeVarientController.deleteSizeVarient);

export const SizeVarientRoutes = router;
