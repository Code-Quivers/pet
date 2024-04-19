"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import paypalLogo from "../../../public/images/checkout/checkout-paypal.svg";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { SelectPicker } from "rsuite";
import logo from "../../../public/images/logo/E.T.-Logo.png";
import { useGetTaxQuery } from "@/redux/api/features/stateTaxApi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { fileUrlKey } from "@/helpers/config/envConfig";

const Checkouts = ({ params }: any) => {
  console.log(params, "params");
  const { data: stateTax } = useGetTaxQuery({});
  const cart = useSelector((state: any) => state.cart.cart);
  console.log(cart, "cart");
  const payAmount = useSelector((state: any) => state.cart.payAmount);
  const [promoCode, setPromoCode] = useState("");
  const { control, handleSubmit } = useForm();
  const [paymentMethod, setPaymentMethod] = useState("");
  const data = [
    "Eugenia Eugenia Eugenia Eugenia Eugenia Eugenia",
    "Bryan",
    "Linda",
    "Nancy",
    "Lloyd",
    "Alice",
    "Julia",
    "Albert",
  ].map((item) => ({ label: item, value: item }));

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

  return (
    <section>
      <nav className="bg-[#0BD6FA] py-2">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
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
      {isClient && payAmount?.checkoutId === params.id ? (
        <main className="max-w-6xl mx-auto">
          <section className="grid grid-cols-12 min-h-[200vh]">
            <div className="col-span-7 pt-10 mr-10">
              {/* Email */}
              <div>
                <h3 className="font-bold text-xl mb-2">CONTACT</h3>
                <div>
                  <label htmlFor="email" className="block mb-1">
                    Email
                  </label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        name="email"
                        id="email"
                        className="block w-full py-2.5 px-4 duration-200 border rounded-lg appearance-none bg-chalk border-zinc-300 placeholder-zinc-300 focus:border-zinc-300 focus:outline-none focus:ring-zinc-300 sm:text-sm"
                      />
                    )}
                  />
                </div>
              </div>
              {/* DELIVERY */}
              <div>
                <h3 className="font-bold text-xl mt-5 mb-2">DELIVERY</h3>
                {/* first & last name */}
                <div className="flex gap-3 ">
                  <div className="w-full">
                    <label htmlFor="firstName" className="block mb-1">
                      First Name
                    </label>
                    <Controller
                      name="firstName"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          name="firstName"
                          id="firstName"
                          className="block w-full py-2.5 px-4 duration-200 border rounded-lg appearance-none border-zinc-300 placeholder-zinc-300 focus:border-zinc-300 focus:outline-none focus:ring-zinc-300 sm:text-sm"
                        />
                      )}
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="lastName" className="block mb-1">
                      Last Name
                    </label>
                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          name="lastName"
                          id="lastName"
                          className="block w-full py-2.5 px-4 duration-200 border rounded-lg appearance-none border-zinc-300 placeholder-zinc-300 focus:border-zinc-300 focus:outline-none focus:ring-zinc-300 sm:text-sm"
                        />
                      )}
                    />
                  </div>
                </div>
                {/* address */}
                <div className="mt-2">
                  <label htmlFor="address" className="block mb-1">
                    Address
                  </label>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        name="address"
                        id="address"
                        className="block w-full py-2.5 px-4 duration-200 border rounded-lg appearance-none border-zinc-300 placeholder-zinc-300 focus:border-zinc-300 focus:outline-none focus:ring-zinc-300 sm:text-sm"
                      />
                    )}
                  />
                </div>
                {/* city & postcode */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="">
                    <label htmlFor="city" className="block mb-1">
                      City
                    </label>
                    <Controller
                      name="city"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          name="city"
                          id="city"
                          className="block w-full py-2.5 px-4 duration-200 border rounded-lg appearance-none border-zinc-300 placeholder-zinc-300 focus:border-zinc-300 focus:outline-none focus:ring-zinc-300 sm:text-sm"
                        />
                      )}
                    />
                  </div>
                  <div className="">
                    <label htmlFor="state" className="block mb-1">
                      State
                    </label>
                    <Controller
                      name="state"
                      control={control}
                      render={({ field }) => (
                        <SelectPicker
                          data={data}
                          searchable={false}
                          size="lg"
                          className="w-full"
                          placeholder="state"
                        />
                      )}
                    />
                  </div>
                  <div className="">
                    <label htmlFor="postalCode" className="block mb-1">
                      Postal Code
                    </label>
                    <Controller
                      name="postalCode"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="text"
                          name="postalCode"
                          id="postalCode"
                          className="block w-full py-2.5 px-4 duration-200 border rounded-lg appearance-none border-zinc-300 placeholder-zinc-300 focus:border-zinc-300 focus:outline-none focus:ring-zinc-300 sm:text-sm"
                        />
                      )}
                    />
                  </div>
                </div>
                {/* phone */}
                <div className="mt-2">
                  <label htmlFor="phone" className="block mb-1">
                    Phone
                  </label>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        name="phone"
                        id="phone"
                        className="block w-full py-2.5 px-4 duration-200 border rounded-lg appearance-none border-zinc-300 placeholder-zinc-300 focus:border-zinc-300 focus:outline-none focus:ring-zinc-300 sm:text-sm"
                      />
                    )}
                  />
                </div>
              </div>
              {/* PAYMENT METHOD */}
              <div className="mt-5">
                <h3 className="font-bold text-xl">PAYMENT METHOD</h3>
                <p className="text-sm text-gray-500">
                  All transactions are secure and encrypted.
                </p>

                <section>
                  <div>
                    <div className="relative">
                      <label
                        onClick={() => setPaymentMethod("card")}
                        htmlFor="card"
                        className="border border-b-0 py-6 block rounded-t-md"
                      ></label>
                      <div className="absolute top-1/2 transform -translate-y-1/2 flex gap-3 items-center pl-5">
                        <input
                          type="radio"
                          name="paymentMethod"
                          id="card"
                          className="w-5 h-5 text-red-500 "
                          // checked
                        />
                        <div>
                          <label
                            htmlFor="card"
                            onClick={() => setPaymentMethod("card")}
                          >
                            Card
                          </label>
                        </div>
                      </div>
                    </div>
                    <div
                      className={` ${
                        paymentMethod == "card"
                          ? "max-h-[100px] opacity-100 bg-[#F4F4F4] p-6 border border-b-0 transition-all"
                          : "max-h-0 opacity-0 overflow-hidden"
                      }`}
                    >
                      <p>
                        After clicking "Pay with PayPal", you will be redirected
                        to PayPal to complete your purchase securely.
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <label
                        onClick={() => setPaymentMethod("paypal")}
                        htmlFor="paypal"
                        className="border py-6 block"
                      ></label>
                      <div className="absolute top-1/2 transform -translate-y-1/2 flex gap-3 items-center pl-5">
                        <input
                          type="radio"
                          name="paymentMethod"
                          id="paypal"
                          className="w-5 h-5 text-red-500 "
                          // checked
                        />
                        <div className="flex items-center">
                          <label
                            htmlFor="paypal"
                            onClick={() => setPaymentMethod("paypal")}
                          >
                            Paypal
                          </label>
                          <Image
                            className="w-10 h-10"
                            src={paypalLogo}
                            alt="Paypal Logo"
                            width={1000}
                            height={1000}
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`${
                        paymentMethod == "paypal"
                          ? "h-auto opacity-100 bg-[#F4F4F4] p-6 border rounded-b-md border-t-0 transition-all"
                          : "max-h-0 opacity-0 overflow-hidden"
                      }`}
                    >
                      <p>
                        After clicking "Pay with PayPal", you will be redirected
                        to PayPal to complete your purchase securely.
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <div className="col-span-5 border-l pt-10 pl-10 space-y-3.5">
              {cart?.length > 0 &&
                cart?.map((item: any, index: number) => (
                  <div className="flex items-center gap-5" key={index}>
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
                    <div className="text-sm w-2/3">
                      <p className="font-semibold">
                        {`${item?.productName} - ${item?.color?.name}`}
                      </p>
                      <p className="flex items-center gap-1">
                        Color:{" "}
                        <span
                          style={{ backgroundColor: item?.color?.code }}
                          className="w-3 h-3 rounded-full block"
                        ></span>
                      </p>
                    </div>
                    <div>
                      <p>{`$${item?.price.toFixed(2)}`}</p>
                    </div>
                  </div>
                ))}
              {/* promo code apply  */}
              <div className="flex gap-3">
                <Controller
                  name="promoCode"
                  control={control}
                  render={({ field }) => (
                    <input
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        setPromoCode(e.target.value);
                      }}
                      type="text"
                      name="promoCode"
                      id="promoCode"
                      placeholder="Discount code or gift card"
                      className="block w-full py-2.5 px-4 duration-200 border rounded-lg appearance-none border-zinc-300 placeholder-zinc-300 focus:border-zinc-300 focus:outline-none focus:ring-zinc-300 sm:text-sm placeholder:text-gray-600"
                    />
                  )}
                />
                <button
                  disabled={promoCode.length === 0}
                  className="py-2.5 px-6 rounded-lg bg-[#0495af] text-white font-semibold disabled:bg-gray-200 disabled:text-white disabled:cursor-not-allowed"
                >
                  Apply
                </button>
              </div>

              <div>
                <div className="flex justify-between mt-5">
                  <p>Subtotal</p>
                  <p>$56</p>
                </div>
                <div className="flex justify-between">
                  <p>Taxes</p>
                  <p>$6</p>
                </div>
                <div className="flex justify-between mt-5">
                  <p className="text-xl font-semiBold">Total</p>
                  <p className="text-2xl">$6</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      ) : (
        <main className="max-w-6xl mx-auto">
          <section className="grid grid-cols-12 min-h-screen">
            <div className="col-span-7 pt-10 mr-10"></div>
            <div className="col-span-5 border-l pt-10 pl-10"></div>
          </section>
        </main>
      )}
    </section>
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
