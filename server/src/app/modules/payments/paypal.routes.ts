import express from 'express';
import { PaypalController } from './paypal.controllers';

// import auth from '../../middlewares/auth';
// import { UserRoles } from '@prisma/client';

const router = express.Router();

// paypal payment request route
router.post(
  '/pay',
  // auth(UserRoles.USER, UserRoles.ADMIN),
  PaypalController.payForOrder
);
router.post(
  '/capture',
  // auth(UserRoles.USER, UserRoles.ADMIN),
  PaypalController.paymentCapture
);

export const PaypalRoutes = router;
