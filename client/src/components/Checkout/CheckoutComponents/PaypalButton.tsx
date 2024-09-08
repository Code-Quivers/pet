// components/PayPalButton.js
"use client";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useFormContext } from "react-hook-form";

const PayPalButton = ({
  createPayment,
  confirmPayment,
  paymentMethod,
}: any) => {
  const { getValues, trigger } = useFormContext();
  const initialOptions = {
    clientId:
      "AQKRyS5-yXyQJSnljgnG4IVPRfgKUOeYzSGVOsSCLMTuO7Rm8NLgYFc2s8r8IYIFvcK6WDpsc2VQQk3G",
    currency: "USD",
    intent: "capture",
    components: "buttons",
  };

  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "AQKRyS5-yXyQJSnljgnG4IVPRfgKUOeYzSGVOsSCLMTuO7Rm8NLgYFc2s8r8IYIFvcK6WDpsc2VQQk3G",
        currency: "USD",
        intent: "capture",
        components: "buttons",
      }}
    >
      <PayPalButtons
        // className={`${paymentMethod === "paypal" ? "block" : "hidden"}`}
        style={{
          layout: "vertical", // Use vertical for single button
          color: "blue", // Customize button color (optional)
          shape: "pill", // Use rect shape (optional)
          label: "pay", // Use "checkout" (optional)
        }}
        fundingSource="paypal" // This ensures only PayPal button is shown
        createOrder={async (data, actions) => {
          const isValid = await trigger();
          console.log("Is valid", isValid);
          // Access form data
          const orderData = getValues();
          console.log("Order data", orderData);
          // Call your server to set up the transaction

          if (isValid) {
            try {
              const paymentObj = {
                price: 100,
                currency: "USD",
                quantity: 1,
              };

              const response = await createPayment(paymentObj);

              if (response && response.data) {
                // Return PayPal order ID
                return response.data?.data?.id;
              } else {
                console.error("Unexpected response structure:", response);
                throw new Error("Failed to create order");
              }
            } catch (error) {
              console.error("Error creating PayPal order:", error);
              throw error;
            }
          }

          // try {
          //   const paymentObj = {
          //     price: 100,
          //     currency: "USD",
          //     quantity: 1,
          //   };

          //   const response = await createPayment(paymentObj);

          //   if (response && response.data) {
          //     // Return PayPal order ID
          //     return response.data?.data?.id;
          //   } else {
          //     console.error("Unexpected response structure:", response);
          //     throw new Error("Failed to create order");
          //   }
          // } catch (error) {
          //   console.error("Error creating PayPal order:", error);
          //   throw error;
          // }
        }}
        onApprove={async (data, actions) => {
          // Call your server to finalize the transaction
          try {
            const confirmResponse = await confirmPayment(data.orderID);

            if (confirmResponse && confirmResponse.data) {
              const orderData = confirmResponse.data;

              const errorDetail =
                Array.isArray(orderData.details) && orderData.details[0];

              if (errorDetail && errorDetail.issue === "INSTRUMENT_DECLINED") {
                return actions.restart();
              }

              if (errorDetail) {
                let msg = "Sorry, your transaction could not be processed.";
                if (errorDetail.description)
                  msg += "\n\n" + errorDetail.description;
                if (orderData.debug_id) msg += " (" + orderData.debug_id + ")";
                return alert(msg);
              }

              console.log(
                "Capture result",
                orderData,
                JSON.stringify(orderData, null, 2)
              );
              const transaction =
                orderData.purchase_units[0].payments.captures[0];
              alert(
                "Transaction " +
                  transaction.status +
                  ": " +
                  transaction.id +
                  "\n\nSee console for all available details"
              );

              if (transaction.status === "COMPLETED") {
                // Use your Next.js router to navigate if required
                // router.push("/");
              }
            } else {
              console.error("Unexpected response structure:", confirmResponse);
            }
          } catch (error) {
            console.error("Error confirming PayPal payment:", error);
          }
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
