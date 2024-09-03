/* eslint-disable @typescript-eslint/no-explicit-any */
import paypal from 'paypal-rest-sdk';
import config from '../../../config';
import { generateAccessTokenForPaypal } from './paypal.AccessToken';
import axios from 'axios';

// Configure PayPal
paypal.configure({
  mode: config.paypal.mode,
  client_id: config.paypal.client_id,
  client_secret: config.paypal.client_secret,
});

// export const addPaypalPayment = async (paymentData: any) => {
//   const create_payment_json = {
//     intent: 'sale',
//     payer: {
//       payment_method: 'paypal',
//     },
//     redirect_urls: {
//       return_url: config.paypal.return_url,
//       cancel_url: config.paypal.cancel_url,
//     },
//     transactions: [
//       {
//         item_list: {
//           items: [
//             {
//               name: paymentData.item_name,
//               sku: paymentData.sku,
//               price: paymentData.price,
//               currency: paymentData.currency,
//               quantity: paymentData.quantity,
//             },
//           ],
//         },
//         amount: {
//           currency: paymentData.currency,
//           total: (paymentData.price * paymentData.quantity).toFixed(2),
//         },
//         description: paymentData.description,
//       },
//     ],
//   };

//   return new Promise((resolve, reject) => {
//     paypal.payment.create(create_payment_json, function (error: any, payment: any) {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(payment);
//       }
//     });
//   });
// };

export const createPaypalPayment = async (paymentData: any) => {
  const accessToken = await generateAccessTokenForPaypal(config.paypal.paypal_baseUrl, config.paypal.client_id, config.paypal.client_secret);

  const createPaymentJson = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: paymentData.currency,
          value: (paymentData.price * paymentData.quantity).toFixed(2),
        },
      },
    ],
    application_context: {
      shipping_preference: 'NO_SHIPPING',
    },
  };

  try {
    const response = await axios.post(`${config.paypal.paypal_baseUrl}/v2/checkout/orders`, JSON.stringify(createPaymentJson), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('PayPal Payment Response:', response.data);

    return response.data;
  } catch (error) {
    throw new Error(`Failed to create PayPal payment`);
  }
};

export const capturePaypalOrder = async (orderData: { orderID: string }) => {
  const { orderID } = orderData;

  const accessToken = await generateAccessTokenForPaypal(config.paypal.paypal_baseUrl, config.paypal.client_id, config.paypal.client_secret);

  try {
    const response = await axios.post(
      `${config.paypal.paypal_baseUrl}/v2/checkout/orders/${orderID}/capture`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const captureResponse = response.data;
    console.log('Capture Response:', captureResponse);

    const capturedPaymentInfo = captureResponse.purchase_units[0].payments.captures[0];

    console.log('Captured Payment Info:', capturedPaymentInfo);

    const paymentReport = {
      paymentStatus: capturedPaymentInfo.status,
      amountToPay: parseFloat(capturedPaymentInfo.amount.value),
      amountPaid: parseFloat(capturedPaymentInfo.seller_receivable_breakdown.gross_amount.value),
      currency: capturedPaymentInfo.amount.currency_code,
      platformFee: parseFloat(capturedPaymentInfo.seller_receivable_breakdown.paypal_fee.value),
      netAmount: parseFloat(capturedPaymentInfo.seller_receivable_breakdown.net_amount.value),
      platformTransactionId: capturedPaymentInfo.id,
      platformOrderId: captureResponse.id,
      refundLink: capturedPaymentInfo.links.find((link: any) => link.rel === 'refund')?.href || null,
      transactionCreatedTime: capturedPaymentInfo.create_time,
      transactionUpdatedTime: capturedPaymentInfo.update_time,
      payerName: `${captureResponse.payer.name.given_name} ${captureResponse.payer.name.surname}`,
      payerEmailAddress: captureResponse.payer.email_address,
      orderId: orderID,
    };

    console.log('Payment Report:', paymentReport);

    return paymentReport;
  } catch (error: any) {
    console.error('Error Capturing Order:', error.response?.data || error.message);
    throw new Error(`Failed to capture order`);
  }
};

export const PaypalService = {
  createPaypalPayment,
  capturePaypalOrder,
  // addPaypalPayment,
};
