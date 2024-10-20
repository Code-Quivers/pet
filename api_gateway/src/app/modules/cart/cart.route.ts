import { sessionMiddleware } from '../../middlewares/seassionId';
import { CartController } from './cart.controller';

// routes/cartRoutes.js
const express = require('express');
const router = express.Router();

router.use(sessionMiddleware);

// Route to add product to cart
router.post('/add', CartController.addProductToCart);

// Route to get the cart
router.get('/', CartController.getCart);

// Route to remove product from cart
router.post('/remove', CartController.removeProductFromCart);

export const CarRoutes = router;
