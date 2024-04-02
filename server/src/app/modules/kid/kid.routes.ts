import { KidValidation } from './kid.validation';
import express, { NextFunction, Request, Response } from 'express';

import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import auth from '../../middlewares/auth';
import { UserRoles } from '@prisma/client';
import { KidController } from './kid.controller';

const router = express.Router();

// ! Create New kid ------------------------------->>>

router.post(
  '/',
  auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  FileUploadHelper.uploadProductImage.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = KidValidation.addKid.parse(JSON.parse(req.body.data));
    return KidController.addKid(req, res, next);
  }
);

// ! Get all kids----------------------------------->>>
router.get('/', KidController.getKid);

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
  '/:kidId',
  // auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  KidController.deleteKid
);

export const KidRoutes = router;
