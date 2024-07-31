/* eslint-disable @typescript-eslint/no-explicit-any */
import Stripe from 'stripe';
import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';

/**
 * Creates a PayPal order for processing payment.
 */

// This is your test secret API key.
const stripe = new Stripe(config.stripe_secret_key);

class StripePaymentProcessor {
  private static intentObject = {
    amount: 0.0,
    currency: 'usd',
    payment_method_types: ['card'],
  };

  private static fixAmountToTwoDecimal = (amount: number) => {
    // Multiply by 100 in last cause, Stripe receive payment in cents
    return parseFloat((Math.ceil(amount * 100) / 100).toFixed(2)) * 100;
  };

  static createPaymentIntent = async (amountToPaid: number) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        ...this.intentObject,
        amount: this.fixAmountToTwoDecimal(amountToPaid),
      });

      if (!paymentIntent?.client_secret) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to get client secret from Stripe!!!');
      }

      return {
        jsonResponse: { clientSecret: paymentIntent.client_secret },
        httpStatusCode: 201,
      };
    } catch (err) {
      console.log(err);
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to get client secret from Stripe!!!');
    }
  };

  static retriveStripePaymentInfo = async (paymentIntentId: string) => {
    const paymentIntentInfo = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (!paymentIntentInfo) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Payment information retrivation failed!!!');
    }
    return {
      jsonResponse: paymentIntentInfo,
      httpStatusCode: 200,
    };
  };
}

export default StripePaymentProcessor;