"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import logo from "../../../public/images/logo/E.T.-Logo.png";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { fileUrlKey } from "@/helpers/config/envConfig";
import PromoCode from "./CheckoutComponents/PromoCode";
import CheckoutLoader from "./CheckoutLoader";
import CheckoutDeliveryInfoForm from "./CheckoutForm";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const Checkouts = ({ params }: any) => {
  const cart = useSelector((state: any) => state.cart.cart);
  const promoCode = useSelector((state: any) => state.cart.promoCode);
  const payAmount = useSelector((state: any) => state.cart.payAmount);

  const [stateTaxValue, setStateTaxValue] = useState(0);

  const taxAmount = payAmount?.subtotal * (stateTaxValue / 100);
  const roundedTaxAmount = Math.round(taxAmount * 100) / 100;
  const totalAmount = payAmount?.subtotal + roundedTaxAmount;

  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (payAmount?.checkoutId !== params.id) {
      router.push("/");
    }
  });
  //

  return (
    <PayPalScriptProvider
      // deferLoading={true}
      options={{
        clientId:
          "Aav4tZVyZIaRwcAbvf6ZOvIpYt1CTOwch0TbNUPMZ711U9iluD6r-zB7toyg5S-f4jeYtjVY8qHgf8IP",
        currency: "USD",
        components: "buttons",
        enableFunding: "",
        disableFunding:["card", "credit"]
      }}
    >
      <section>
        <nav className="bg-primary py-2">
          <div className="max-w-7xl xl:mx-auto md:mx-10 mx-4 flex items-center justify-between">
            <Image
              src={logo}
              alt="logo"
              width={500}
              height={500}
              className="h-11 w-56"
            />
            {isClient && (
              <div className="text-white cursor-pointer">
                <HiOutlineShoppingBag size={25} />
              </div>
            )}
          </div>
        </nav>
        {/*  */}
        {isClient && payAmount?.checkoutId === params?.id ? (
          <div className="max-w-7xl xl:mx-auto md:mx-10 mx-4">
            <section className="md:grid md:grid-cols-12 min-h-[200vh]">
              <div className="md:col-span-7 pt-10 md:mr-10">
                <CheckoutDeliveryInfoForm totalAmount={totalAmount} />
              </div>
              {/* cart data */}
              <div className="md:col-span-5 md:border-l pt-10 md:pl-10 ">
                {cart?.length > 0 &&
                  cart?.map((item: any, index: number) => (
                    <div className="flex items-center gap-5 mb-3" key={index}>
                      <div className="relative">
                        <Image
                          className="w-16 h-16 rounded border"
                          alt=""
                          src={`${fileUrlKey()}/${item?.image}`}
                          width={1000}
                          height={1000}
                        />
                        <div className="text-white font-semibold flex justify-center items-center text-xs absolute w-5 h-5 bg-black rounded-full top-0 right-0 transform translate-x-1/2 -translate-y-1/2 opacity-50">
                          {item?.quantity}
                        </div>
                      </div>
                      <div className="text-sm w-2/3 space-y-0.5">
                        <p className="font-semibold">
                          {`${item?.productName} - ${item?.color?.name}`}
                        </p>
                        <p>{`$${item?.price?.toFixed(2)}`}</p>
                        <p className="flex items-center gap-1">
                          Color:{" "}
                          <span
                            style={{ backgroundColor: item?.color?.code }}
                            className="w-3 h-3 rounded-full block"
                          ></span>
                        </p>
                      </div>
                      <div>
                        <p>{`$${item?.totalPrice?.toFixed(2)}`}</p>
                      </div>
                    </div>
                  ))}
                {/* promo code apply  */}
                <PromoCode cart={cart} appliedPromoCode={promoCode} />
                <div>
                  <div className="flex justify-between mt-10">
                    <p>Subtotal</p>
                    <p>{`$${payAmount?.subtotal?.toFixed(2)}`}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Taxes</p>
                    <p>{`$${roundedTaxAmount?.toFixed(2)}`}</p>
                  </div>
                  <div className="flex justify-between mt-5">
                    <p className="text-xl font-semiBold">Total</p>
                    <p className="text-2xl">{`$${totalAmount?.toFixed(2)}`}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : (
          <CheckoutLoader />
        )}
      </section>
    </PayPalScriptProvider>
  );
};

export default Checkouts;

// const orderInformation = {
//   shippingInformation: {
//     firstName: "John",
//     lastName: "Doe",
//     address: "1234 Main St",
//     city: "San Francisco",
//     state: "CA",
//     postcode: "94111",
//     email: "rafi11@gh.com",
//     phone: "1234567890",
//   },
//   cartItems: [
//     {
//       productName: "Product 1",
//       productId: "4913483d-ed5a-406c-82a6-2fa4d654af05",
//       variantId: "4913483d-ed5a-406c-82a6-2fa4d654af05",
//       price: 100,
//       quantity: 2,
//       color: {
//         name: "Red",
//         code: "#ff0000",
//       },
//     },
//   ],
//   paymentInformation: {
//     subtotal: 200,
//     taxes: 10,
//     total: 210,
//   },
// };
