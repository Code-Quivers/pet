import express from 'express';

import { PaypalController } from './paypal.controllers';

const router = express.Router();

router.post('/payment', PaypalController.createPaypalController);

export const PaypalRoutes = router;
