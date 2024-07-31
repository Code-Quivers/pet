import express, { NextFunction, Request, Response } from "express";

import auth from "../../middlewares/auth";
import { UserRoles } from "@prisma/client";
import StripeController from "./stripe.controllers";


const router = express.Router();

// Stripe payment request route
router.post(
  "/create-payment-intent",
  StripeController.createPaymentIntent,
);

router.post(
  "/retrive-payment-info",
  StripeController.retriveStripePaymentInformation,
);


export const StripeRoutes = router;