import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { UserRoutes } from '../modules/users/user.routes';
import { CategoryRoutes } from '../modules/category/category.routes';
import { ColorVarientRoutes } from '../modules/colorVarient/colorVarient.routes';
import { SizeVarientRoutes } from '../modules/sizeVarient/sizeVarient.routes';
import { ProductRoutes } from '../modules/product/product.routes';
import { DashboardRoutes } from '../modules/dashboard/dashboard.routes';

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
    path: '/color-varient',
    route: ColorVarientRoutes,
  },
  {
    path: '/size-varient',
    route: SizeVarientRoutes,
  },
  {
    path: '/product',
    route: ProductRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
