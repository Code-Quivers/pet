import express, { NextFunction, Request, Response } from 'express';

import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import auth from '../../middlewares/auth';
import { UserRoles } from '@prisma/client';
import { ProductController } from './pet.controller';
import { PetValidation } from './pet.validation';

const router = express.Router();

// ! Create New List ------------------------------->>>

router.post('/', FileUploadHelper.uploadProductImage.single('file'), (req: Request, res: Response, next: NextFunction) => {
  req.body = PetValidation.addPet.parse(JSON.parse(req.body.data));
  return ProductController.addProductController(req, res, next);
});

// ! Get all List----------------------------------->>>
router.get('/', ProductController.getProductController);

router.get('/tag/:productId', ProductController.getSingleProduct);

router.patch(
  '/:productId',
  auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  FileUploadHelper.uploadProductImage.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = ProductZodValidation.editProduct.parse(JSON.parse(req.body.data));
    console.log(req.body.data, 'body.....');
    return ProductController.updateProduct(req, res, next);
  }
);

router.delete(
  '/:productId',
  // auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  ProductController.deleteProduct
);

export const ProductRoutes = router;
