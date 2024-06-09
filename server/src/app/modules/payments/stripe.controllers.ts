import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import StripePaymentProcessor from "./stripe.services";
import sendResponse from "../../../shared/sendResponse";


/**
 * Controller handling PayPal related operations such as creating and capturing orders.
 */
class StripeController {
  private static orderCreationSuccessMessage = "Order creation successful!!!";
  private static orderCreationFailedMessage = "Order creation failed!!!";

  /**
   * Handles payment for an order.
   */
  static createPaymentIntent = catchAsync(async (req: Request, res: Response) => {
    console.log(req.body);
    console.log("------------------------------------");
    //
    //   amountToPaid={parseInt(getUnitPackagePrices()[activePackagePrice]) * orderDetails?.data?._count?.properties}
    // orderData={orderDetails?.data}
    // propertyIds={orderDetails?.data?.properties.map((property) => property?.propertyId)}
    // packagePrice={parseInt(getUnitPackagePrices()[activePackagePrice])}
    // totalAmountToPay={parseInt(getUnitPackagePrices()[activePackagePrice]) * orderDetails?.data?._count?.properties}
    // orderId={orderDetails?.data?.orderId}
    // packageType={activePackagePrice}

    const { amountToPaid, orderId, packageType } = req.body;
    console.log(typeof amountToPaid,'-------------------------------->>>>>>>')
    const { jsonResponse, httpStatusCode } = await StripePaymentProcessor.createPaymentIntent(amountToPaid);
    // const resp = await OrderServices.updateOrderInfo(orderId, { packageType });
    sendResponse(res, {
      statusCode: httpStatusCode,
      success: httpStatusCode === 201 ? true : false,
      message:
        httpStatusCode === 201
          ? StripeController.orderCreationSuccessMessage
          : StripeController.orderCreationFailedMessage,
      data: jsonResponse,
    });
  });

  static retriveStripePaymentInformation = catchAsync(async (req: Request, res: Response) => {
    const { orderId, paymentIntentId } = req.body;
    // const userId = (req.user as IRequestUser).userId;

    const { jsonResponse, httpStatusCode } = await StripePaymentProcessor.retriveStripePaymentInfo(paymentIntentId);
    // const paymentReport = StripeController.generatePaymentReport(jsonResponse, orderId, userId);

    // Create payment report in the database
    // const result = await PaymentServices.createPaymnentReport(paymentReport);

    // const dataToUpdate = { orderId, orderStatus: "CONFIRMED", planType: "PREMIUM" };

    // const updatedOrderData = OrderServices.updateOrderStatusAndPropertyPlanType(dataToUpdate);

    sendResponse(res, { 
      statusCode: httpStatusCode,
      success: httpStatusCode === 200 ? true : false,
      message: "Payment information successfully retrived!!!",
      data: jsonResponse,
    });
  });

  
}

export default StripeController;