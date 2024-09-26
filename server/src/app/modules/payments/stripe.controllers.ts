import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import StripePaymentProcessor from './stripe.services';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from '../orders/orders.service';
import PaymentReportService from '../paymentReport/payment.services';
import Stripe from 'stripe';
import config from '../../../config';

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
    console.log('--------->>>>>>>>>>>>>>>>>>>>');
    const { orderId, paymentIntentId } = req.body;

    const { jsonResponse, httpStatusCode } = await StripePaymentProcessor.retrieveStripePaymentInfo(paymentIntentId);
    // Retrieve the Payment Intent
    // const paymentIntent = await StripePaymentProcessor.paymentIntents.retrieve(paymentIntentId);

    // Get the latest charge ID from the Payment Intent
    const chargeId = jsonResponse?.latest_charge;

    if (chargeId) {
      // Retrieve the charge details using the charge ID
      const charge = await StripePaymentProcessor.retrieveStripePaymentChargeInfo(chargeId);
      console.log('charge', charge);
      // Retrieve the balance transaction using the balance transaction ID from the charge
      const balanceTransaction = await stripe.balanceTransactions.retrieve(charge.jsonResponse?.balance_transaction as any);

      console.log('balance transcation', balanceTransaction);
      // Extract financial details
      const netAmount = balanceTransaction.net; // Net amount after Stripe fees
      const fee = balanceTransaction.fee; // Stripe fee
      const totalAmount = charge.jsonResponse?.amount; // Total amount for the charge
      const amountPaid = charge.jsonResponse?.amount_captured; // Amount that was paid
      console.log('_------------', netAmount, fee, totalAmount, amountPaid, charge);
    }

    const paymentReport = StripeController.generatePaymentReport(jsonResponse, orderId);

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
  private static generatePaymentReport(retrievedPaymentInfo: any, orderId: string): any {
    // Amount devided by 100 cause stripe calculate amount in the cent.
    return {
      gateWay: 'STRIPE',
      status: retrievedPaymentInfo.status,
      totalAmountToPaid: parseFloat(retrievedPaymentInfo.amount) / 100.0,
      totalAmountPaid: parseFloat(retrievedPaymentInfo.amount_received) / 100.0,
      currency: retrievedPaymentInfo.currency,
      gateWayFee: parseFloat('0.0'),
      netAmount: parseFloat('0.0'),
      gateWayTransactionId: retrievedPaymentInfo.id,
      gateWayTransactionTime: new Date(retrievedPaymentInfo.created).toISOString(),
      orderId,
    };
  }
}

export default StripeController;
