import express, { NextFunction, Request, Response } from 'express';

import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import auth from '../../middlewares/auth';
import { UserRoles } from '@prisma/client';
import { PetController } from './kid.controller';
import { PetValidation } from './kid.validation';
import { IRequestUser } from './kid.interface';

const router = express.Router();

// ! Create New List ------------------------------->>>

router.post(
  '/',
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  FileUploadHelper.uploadProductImage.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = PetValidation.addPet.parse(JSON.parse(req.body.data));
    return PetController.addPetController(req, res, next);
  }
);

// ! Get all List----------------------------------->>>
router.get('/', PetController.getPetController);

// router.patch(
//   '/:productId',
//   auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
//   FileUploadHelper.uploadProductImage.single('file'),
//   (req: Request, res: Response, next: NextFunction) => {
//     req.body = PetValidation.editProduct.parse(JSON.parse(req.body.data));
//     console.log(req.body.data, 'body.....');
//     return PetController.updatePet(req, res, next);
//   }
// );

router.delete(
  '/:productId',
  // auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  PetController.deletePet
);

export const PetRoutes = router;
