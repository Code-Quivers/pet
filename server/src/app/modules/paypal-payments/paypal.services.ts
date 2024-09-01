/* eslint-disable @typescript-eslint/no-explicit-any */
import paypal from 'paypal-rest-sdk';
import config from '../../../config';

// Configure PayPal
paypal.configure({
  mode: config.paypal.mode,
  client_id: config.paypal.client_id,
  client_secret: config.paypal.client_secret,
});

export const createPaypalPayment = async (paymentData: any) => {
  const create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    redirect_urls: {
      return_url: config.paypal.return_url,
      cancel_url: config.paypal.cancel_url,
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: paymentData.item_name,
              sku: paymentData.sku,
              price: paymentData.price,
              currency: paymentData.currency,
              quantity: paymentData.quantity,
            },
          ],
        },
        amount: {
          currency: paymentData.currency,
          total: (paymentData.price * paymentData.quantity).toFixed(2),
        },
        description: paymentData.description,
      },
    ],
  };

  return new Promise((resolve, reject) => {
    paypal.payment.create(create_payment_json, function (error: any, payment: any) {
      if (error) {
        reject(error);
      } else {
        resolve(payment);
      }
    });
  });
};

export const PaypalService = {
  createPaypalPayment,
};
