import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { PromoCodeValidation } from './promoCode.validations';
import { UserRoles } from '@prisma/client';
import auth from '../../middlewares/auth';
import { PromoCodeController } from './promoCode.controller';

const router = express.Router();

// ! Create New List ------------------------------->>>
router.post('/', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), validateRequest(PromoCodeValidation.addPromoCode), PromoCodeController.addPromo);

// ! Get all List----------------------------------->>>
router.get('/', PromoCodeController.getPromo);
router.get('/promotionalOffer', PromoCodeController.getPromotionalOffer);

router.patch('/:id', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), PromoCodeController.updatePromo);

router.delete('/promotionalOffer/:id', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), PromoCodeController.deletePromotionRule);

export const PromoCodeRoutes = router;
