import express, { NextFunction, Request, Response } from 'express';
import { ProductReviewController } from './productReviews.controller';
import { FileUploadHelper } from '../../../helpers/FileUploadHelper';
import auth from '../../middlewares/auth';
import { UserRoles } from '@prisma/client';
import { ProductReviewValidation } from './productReviews.validation';

const router = express.Router();

// ! Create New product review ------------------------------->>>

router.post('/add-review', FileUploadHelper.uploadProductReviewImage.array('files'), (req: Request, res: Response, next: NextFunction) => {
  req.body = ProductReviewValidation.addProductReview.parse(JSON.parse(req.body.data));
  return ProductReviewController.addProductReview(req, res, next);
});

// ! Get all product reviews----------------------------------->>>
router.get('/', ProductReviewController.getAllProductReviews);
// ! update a product review
router.patch(
  '/update/:productReviewId',
  // auth(UserRoles.ADMIN, UserRoles.SUPERADMIN),
  FileUploadHelper.uploadProductReviewImage.array('files'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = ProductReviewValidation.editProductReview.parse(JSON.parse(req.body.data));
    return ProductReviewController.editProductReview(req, res, next);
  }
);

//! delete a product review
router.delete('/delete/:productReviewId', auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN), ProductReviewController.deleteProductReview);

export const ProductReviewRoutes = router;
