import express from 'express';

import auth from '../../middlewares/auth';
import { UserRoles } from '@prisma/client';
import { DAshboardController } from './dashboard.controller';

const router = express.Router();

// ! Get all List----------------------------------->>>
router.get('/get-total-counts', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), DAshboardController.getTotalCount);

export const DashboardRoutes = router;
