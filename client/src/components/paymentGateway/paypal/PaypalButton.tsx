import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useCreateOrderMutation } from "@/redux/api/features/orders/orderApi";
import {
  useCapturePaypalPaymentMutation,
  useGetPaypalOrderDataMutation,
} from "@/redux/api/features/payment/paypalPaymentApi";
import { setOrderId } from "@/redux/slice/paymentSlice";

// Renders errors or successfull transactions on the screen.
function Message({ content }) {
  return <p>{content}</p>;
}

function PaypalButton({ amount, paymentMethod }) {
  const [message, setMessage] = useState("");
  const { getValues } = useFormContext();
  const cart = useSelector((state: any) => state.cart.cart);
  const { orderId } = useSelector((state: any) => state.paymentInfo);
  const dispatch = useDispatch();

  const [
    createOrder,
    { data: createdOrderData, isLoading: isLoadingCreatingOrder },
  ] = useCreateOrderMutation();
  const [getPaypalOrderData, { data: paypalOrderData }] =
    useGetPaypalOrderDataMutation();
  const [capturePaypalPayment, { data: capturedData }] =
    useCapturePaypalPaymentMutation();

  const handleOrderCreation = async () => {
    let newOrderId = orderId;
    const orderData = { ...getValues(), state: "nai" };
    if (!newOrderId) {
      const createdOrder = await createOrder({
        cart,
        deliveryInfo: orderData,
      }).unwrap();
      newOrderId = createdOrder?.data?.orderId || "";
      dispatch(setOrderId(newOrderId));
    }

    const newData = {
      cart: cart,
      deliveryInfo: orderData,
      orderId: newOrderId,
      amount: amount,
    };

    try {
      const reponseData = await getPaypalOrderData(newData).unwrap();

      console.log("9999999999999999999999999999", reponseData);

      if (reponseData.id) {
        return reponseData.id;
      } else {
        const errorDetail = reponseData?.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${reponseData.debug_id})`
          : JSON.stringify(reponseData);

        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error(error);
      setMessage(`Could not initiate PayPal Checkout...${error}`);
    }
  };

  const onApprove = async (data, actions) => {
    const newData = {
      paypalOrderId: data.orderID,
      orderId: orderId,
    };
    const orderData = await capturePaypalPayment(newData).unwrap();
    try {
      const errorDetail = orderData?.details?.[0];

      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
        // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
        // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
        return actions.restart();
      } else if (errorDetail) {
        // (2) Other non-recoverable errors -> Show a failure message
        throw new Error(`${errorDetail.description} (${orderData.debug_id})`);
      } else {
        // (3) Successful transaction -> Show confirmation or thank you message
        // Or go to another URL:  actions.redirect('thank_you.html');
        const transaction = orderData.purchase_units[0].payments.captures[0];
        setMessage(
          `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
        );
        console.log(
          "Capture result",
          orderData,
          JSON.stringify(orderData, null, 2)
        );
      }
    } catch (error) {
      console.error(error);
      setMessage(`Sorry, your transaction could not be processed...${error}`);
    }
  };

  return (
    <div className="PaypalButton">
      {paymentMethod == "paypal" && (
        <PayPalButtons
          style={{
            shape: "rect",
            layout: "vertical",
            color: "gold",
            label: "paypal",
          }}
          createOrder={handleOrderCreation}
          onApprove={onApprove}
        />
      )}
      <Message content={message} />
    </div>
  );
}

export default PaypalButton;
