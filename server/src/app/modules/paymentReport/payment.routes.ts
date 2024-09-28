import express from 'express';

import auth from '../../middlewares/auth';
import { UserRoles } from '@prisma/client';
import { PaymentReportController } from './payment.controllers';

const router = express.Router();

// Stripe payment request route
router.get('/', auth(UserRoles.SUPERADMIN), PaymentReportController.getAllPayment);

router.get('/:paymentPlatformId',  PaymentReportController.getSinglePaymentReport);

export const PaymentReportRoutes = router;
