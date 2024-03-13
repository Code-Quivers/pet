import express, { NextFunction, Request, Response } from 'express';

import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import auth from '../../middlewares/auth';
import { UserRoles } from '@prisma/client';
import { ProductController } from './products.controller';
import { ProductZodValidation } from './products.validation';

const router = express.Router();

// ! Create New List ------------------------------->>>

router.post('/', FileUploadHelper.uploadProductImage.single('file'), (req: Request, res: Response, next: NextFunction) => {
  req.body = ProductZodValidation.addProducts.parse(JSON.parse(req.body.data));
  return ProductController.addProductsController(req, res, next);
});

// ! Get all List----------------------------------->>>
router.get('/', ProductController.getProductsController);

router.get('/:productId', ProductController.getSingleProduct);

router.patch(
  '/:productId',
  auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  FileUploadHelper.uploadProductImage.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = ProductZodValidation.editProduct.parse(JSON.parse(req.body.data));
    return ProductController.updateProduct(req, res, next);
  }
);

router.delete(
  '/:productId',
  // auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  ProductController.deleteProduct
);

export const ProductRoutes = router;
