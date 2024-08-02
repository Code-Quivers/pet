import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import StripePaymentProcessor from './stripe.services';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from '../orders/orders.service';
import PaymentService from '../paymentReport/payment.services';
import PaymentReportService from '../paymentReport/payment.services';

/**
 * Controller handling PayPal related operations such as creating and capturing orders.
 */
class StripeController {
  private static orderCreationSuccessMessage = 'Order creation successful!!!';
  private static orderCreationFailedMessage = 'Order creation failed!!!';

  /**
   * Handles payment for an order.
   */
  static createPaymentIntent = catchAsync(async (req: Request, res: Response) => {
    console.log(req.body);
    console.log('------------------------------------');

    const {
      amountToPaid,

      // deliveryInfo, cart
    } = req.body;
    console.log(typeof amountToPaid, '-------------------------------->>>>>>>');
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

  static retriveStripePaymentInformation = catchAsync(async (req: Request, res: Response) => {
    console.log('--------->>>>>>>>>>>>>>>>>>>>');
    const { orderId, paymentIntentId } = req.body;
    // const userId = (req.user as IRequestUser).userId;

    const { jsonResponse, httpStatusCode } = await StripePaymentProcessor.retriveStripePaymentInfo(paymentIntentId);
    const paymentReport = StripeController.generatePaymentReport(jsonResponse, orderId);

    // Create payment report in the database
    const result = await PaymentReportService.createPaymentReport(paymentReport);

    const dataToUpdate = { orderStatus: 'CONFIRMED' };

    const updatedOrderData = OrderService.updateOrder(orderId, dataToUpdate);

    sendResponse(res, {
      statusCode: httpStatusCode,
      success: httpStatusCode === 200 ? true : false,
      message: 'Payment information successfully retrived!!!',
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
