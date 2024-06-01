import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { OrderValidation } from './orders.validations';
import { UserRoles } from '@prisma/client';
import auth from '../../middlewares/auth';
import { OrderController } from './order.controller';

const router = express.Router();

// ! Create New List ------------------------------->>>
router.post('/', validateRequest(OrderValidation.addOrder), OrderController.addOrder);

// ! Get all List----------------------------------->>>

router.get('/', OrderController.getOrder);

router.get('/monthWise', OrderController.monthWiseOrder);

router.patch('/:orderId', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), OrderController.updateOrder);

router.delete('/:orderId', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), OrderController.deleteOrder);

//export Route
export const OrderRoutes = router;
