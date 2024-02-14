import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { EventValidation } from './event.validations';
import { UserRoles } from '@prisma/client';
import auth from '../../middlewares/auth';
import { EventController } from './event.controller';

const router = express.Router();

// ! Create New List ------------------------------->>>
router.post('/', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), validateRequest(EventValidation.addEvent), EventController.addEventController);

// ! Get all List----------------------------------->>>
router.get('/', EventController.getEventController);

router.get(
  '/:eventId',
  // auth(UserRoles.USER, UserRoles.ADMIN, UserRoles.SUPERADMIN),
  EventController.getSingleEvent
);

router.put('/:eventId', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), EventController.updateEvent);

router.delete('/:eventId', auth(UserRoles.ADMIN, UserRoles.SUPERADMIN), EventController.deleteEvent);

export const EventRoutes = router;
