import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { ColorVarientValidation, EventValidation } from './colorVarient.validations';
import { UserRoles } from '@prisma/client';
import auth from '../../middlewares/auth';
import { ColorVarientController } from './colorVarient.controller';

const router = express.Router();

// ! Create New List ------------------------------->>>
router.post(
  '/',
  auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  validateRequest(ColorVarientValidation.addColor),
  ColorVarientController.addColorVarientController
);

// ! Get all List----------------------------------->>>
router.get('/', ColorVarientController.getColorVarientController);

router.patch('/:colorVarientId', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), ColorVarientController.updateColorVarient);

router.delete('/:colorVarientId', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), ColorVarientController.deleteColorVarient);

export const ColorVarientRoutes = router;
