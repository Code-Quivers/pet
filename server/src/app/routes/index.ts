import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { UserRoutes } from '../modules/users/user.routes';
import { CategoryRoutes } from '../modules/category/category.routes';
import { ColorVarientRoutes } from '../modules/colorVarient/colorVarient.routes';
import { DashboardRoutes } from '../modules/dashboard/dashboard.routes';
import { QARoutes } from '../modules/productQA/productQA.routes';
import { PetRoutes } from '../modules/Pet/pet.routes';
import { BarcodeRoutes } from '../modules/barcode/barcode.routes';
import { ProductRoutes } from '../modules/products/products.routes';
import { TestimonialRoutes } from '../modules/testimonial/testimonial.routes';
import { PromoCodeRoutes } from '../modules/promoCode/promoCode.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/dashboard',
    route: DashboardRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/product',
    route: ProductRoutes,
  },
  {
    path: '/qa',
    route: QARoutes,
  },
  {
    path: '/pet',
    route: PetRoutes,
  },
  {
    path: '/tag',
    route: BarcodeRoutes,
  },
  {
    path: '/testimonial',
    route: TestimonialRoutes,
  },
  {
    path: '/promo-code',
    route: PromoCodeRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
