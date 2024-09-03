"use client";

import Checkouts from "@/components/Checkout/Checkouts";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

// export const metadata: Metadata = {
//   title: "Checkout",
// };

const CheckOutPage = ({ params }: any) => {
  return (
    <div>
      <Checkouts params={params} />

      {/* <PayPalScriptProvider
        options={{
          clientId:
            "AQKRyS5-yXyQJSnljgnG4IVPRfgKUOeYzSGVOsSCLMTuO7Rm8NLgYFc2s8r8IYIFvcK6WDpsc2VQQk3G",
          currency: "USD",

          // intent: "capture",
          components: "buttons",
        }}
      >
        <PayPalButtons />
      </PayPalScriptProvider> */}
    </div>
  );
};

export default CheckOutPage;
// components/PayPalButton.js
// "use client";

// import React, { useState } from "react";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import PaypalInside from "./paypal/PaypalInside";

// const PayPalButton = ({ createPayment, confirmPayment }: any) => {
//   const [scriptLoaded, setScriptLoaded] = useState();
//   const initialOptions: any = {
//     "client-id":
//       "AQKRyS5-yXyQJSnljgnG4IVPRfgKUOeYzSGVOsSCLMTuO7Rm8NLgYFc2s8r8IYIFvcK6WDpsc2VQQk3G",
//     currency: "USD",

//     // intent: "capture",
//     components: "buttons",
//   };

//   return (

//   );
// };

// export default PayPalButton;
