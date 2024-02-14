import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { UserRoutes } from '../modules/users/user.routes';
import { HallRoutes } from '../modules/hall/hall.routes';
import { SlotRoutes } from '../modules/slot/slot.routes';
import { EventRoutes } from '../modules/event/event.routes';
import { CategoryRoutes } from '../modules/category/category.routes';
import { SubCategoryRoutes } from '../modules/subCategory/subCategory.routes';
import { ProductRoutes } from '../modules/product/product.routes';
import { SubEventRoutes } from '../modules/subEvent/subEvent.routes';
import { ProductBatchRoutes } from '../modules/batchProduct/batchProduct.routes';
import { OptionalItemsRoutes } from '../modules/optionalItems/optionalItems.routes';
import { OrderRoutes } from '../modules/order/order.routes';

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
    path: '/hall',
    route: HallRoutes,
  },
  {
    path: '/slot',
    route: SlotRoutes,
  },
  {
    path: '/event',
    route: EventRoutes,
  },
  {
    path: '/subEvent',
    route: SubEventRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/subCategory',
    route: SubCategoryRoutes,
  },
  {
    path: '/product',
    route: ProductRoutes,
  },
  {
    path: '/product-batch',
    route: ProductBatchRoutes,
  },
  {
    path: '/product-batch',
    route: ProductBatchRoutes,
  },
  {
    path: '/optional-items',
    route: OptionalItemsRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
