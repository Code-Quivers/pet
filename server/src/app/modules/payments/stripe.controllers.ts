/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import StripePaymentProcessor from './stripe.services';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from '../orders/orders.service';
import PaymentReportService from '../paymentReport/payment.services';
import Stripe from 'stripe';
import config from '../../../config';
import { errorLogger } from '../../../shared/logger';

/**
 * Controller handling PayPal related operations such as creating and capturing orders.
 */

const stripe = new Stripe(config.stripe_secret_key);

class StripeController {
  private static orderCreationSuccessMessage = 'Order creation successful!!!';
  private static orderCreationFailedMessage = 'Order creation failed!!!';

  /**
   * Handles payment for an order.
   */
  static createPaymentIntent = catchAsync(async (req: Request, res: Response) => {
    const {
      amountToPaid,

      // deliveryInfo, cart
    } = req.body;

    // console.log(typeof amountToPaid, '-------------------------------->>>>>>>');
    const { jsonResponse, httpStatusCode } = await StripePaymentProcessor.createPaymentIntent(amountToPaid);
    // const orderData = {
    //   ...deliveryInfo,
    //   cartItems: cart,
    // };
    // const order = await OrderService.createOrder(orderData);

    sendResponse(res, {
      statusCode: httpStatusCode,
      success: httpStatusCode === 201 ? true : false,
      message: httpStatusCode === 201 ? StripeController.orderCreationSuccessMessage : StripeController.orderCreationFailedMessage,
      data: {
        ...jsonResponse,
        //  orderId: order.orderId
      },
    });
  });
  static updatePaymentIntent = catchAsync(async (req: Request, res: Response) => {
    const { intentId, amountToPaid } = req.body;

    const { jsonResponse, httpStatusCode } = await StripePaymentProcessor.updatePaymentIntent(intentId, amountToPaid);
    // const orderData = {
    //   ...deliveryInfo,
    //   cartItems: cart,
    // };
    // const order = await OrderService.createOrder(orderData);

    sendResponse(res, {
      statusCode: httpStatusCode,
      success: httpStatusCode === 201 ? true : false,
      message: httpStatusCode === 201 ? StripeController.orderCreationSuccessMessage : StripeController.orderCreationFailedMessage,
      data: {
        ...jsonResponse,
        //  orderId: order.orderId
      },
    });
  });

  static retrieveStripePaymentInformation = catchAsync(async (req: Request, res: Response) => {
    const { orderId, paymentIntentId } = req.body;
    const { jsonResponse, httpStatusCode } = await StripePaymentProcessor.retrieveStripePaymentInfo(paymentIntentId);
    // Retrieve the Payment Intent

    // Get the latest charge ID from the Payment Intent
    const chargeId = jsonResponse?.latest_charge;
    // eslint-disable-next-line prefer-const
    let otherData = {
      netAmount: 0,
      fee: 0,
      totalAmount: 0,
      amountPaid: 0,
    };
    if (chargeId) {
      const charge = await StripePaymentProcessor.retrieveStripePaymentChargeInfo(chargeId);

      //
      const balanceTransaction = await stripe.balanceTransactions.retrieve(charge.jsonResponse?.balance_transaction as any);

      // Extract financial details
      otherData.netAmount = StripePaymentProcessor.getAmountInDollarsFromCents(balanceTransaction?.net);
      otherData.fee = StripePaymentProcessor.getAmountInDollarsFromCents(balanceTransaction?.fee);
      const totalAmount = StripePaymentProcessor.getAmountInDollarsFromCents(charge.jsonResponse?.amount);
      const amountPaid = StripePaymentProcessor.getAmountInDollarsFromCents(charge.jsonResponse?.amount_captured);

      otherData.amountPaid = amountPaid;
      otherData.totalAmount = totalAmount;

      if (amountPaid !== totalAmount) {
        errorLogger.error(`Stripe payment bug, amount paid is ${amountPaid} & totalAmount ${totalAmount}`);
      }
    }

    const paymentReport = StripeController.generatePaymentReport(otherData, jsonResponse, orderId);

    const updatedOrderData = OrderService.updateOrder(orderId);
    // Create payment report in the database
    await PaymentReportService.createPaymentReport(paymentReport);

    sendResponse(res, {
      statusCode: httpStatusCode,
      success: httpStatusCode === 200 ? true : false,
      message: 'Payment information successfully retrieved!!!',
      data: updatedOrderData,
    });
  });

  /**
   * Generates a payment report based on PayPal API response data.
   */
  private static generatePaymentReport(otherData: any, retrievedPaymentInfo: any, orderId: string): any {
    // Amount divided by 100 cause stripe calculate amount in the cent.

    return {
      gateWay: 'STRIPE',
      status: retrievedPaymentInfo.status,
      totalAmountToPaid: otherData?.totalAmount,
      totalAmountPaid: otherData?.amountPaid,
      currency: retrievedPaymentInfo.currency,
      gateWayFee: otherData?.fee,
      netAmount: otherData?.netAmount,
      gateWayTransactionId: retrievedPaymentInfo.id,
      gateWayTransactionTime: new Date(retrievedPaymentInfo.created).toISOString(),
      orderId,
    };
  }
}

export default StripeController;
