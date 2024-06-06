"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { SelectPicker, Form } from "rsuite";
import logo from "../../../public/images/logo/E.T.-Logo.png";
import { useGetTaxQuery } from "@/redux/api/features/stateTaxApi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { fileUrlKey } from "@/helpers/config/envConfig";
import { RxValue } from "react-icons/rx";
import PromoCode from "./CheckoutComponents/PromoCode";
import PaymentMethod from "./CheckoutComponents/PaymentMethod";

const Checkouts = ({ params }: any) => {
  const { data: stateTax } = useGetTaxQuery({});
  // console.log(promo, "promo");

  const cart = useSelector((state: any) => state.cart.cart);
  const payAmount = useSelector((state: any) => state.cart.payAmount);
  console.log(cart, "cart");
  const data = stateTax?.data?.map((item: any) => ({
    label: item.state,
    value: item.tax,
  }));

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
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

  const handleCheckout = async (data: any) => {};

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
        <form
          onSubmit={handleSubmit(handleCheckout)}
          className="max-w-6xl mx-auto"
        >
          <section className="md:grid md:grid-cols-12 min-h-[200vh]">
            <div className="col-span-7 pt-10 md:mr-10">
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
                    rules={{ required: "Enter an email" }}
                    render={({ field }) => (
                      <div>
                        <input
                          {...field}
                          type="text"
                          name="email"
                          id="email"
                          className={`block w-full py-2.5 px-4 duration-200 border rounded-lg appearance-none bg-chalk border-zinc-300 placeholder-zinc-300 focus:border-zinc-300 focus:outline-none focus:ring-zinc-300 sm:text-sm ${
                            errors?.email &&
                            errors?.email?.message &&
                            "border-red-600"
                          }`}
                        />
                        {errors?.email && errors?.email?.message && (
                          <span className="text-red-600 text-sm font-semibold">
                            {errors?.email?.message as string}
                          </span>
                        )}
                      </div>
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
                      rules={{ required: "Enter a first name" }}
                      render={({ field }) => (
                        <div>
                          <input
                            {...field}
                            type="text"
                            name="firstName"
                            id="firstName"
                            className={`block w-full py-2.5 px-4 duration-200 border rounded-lg appearance-none border-zinc-300 placeholder-zinc-300 focus:border-zinc-300 focus:outline-none focus:ring-zinc-300 sm:text-sm ${
                              errors?.firstName &&
                              errors?.firstName?.message &&
                              "border-red-600"
                            }`}
                          />
                          {errors?.firstName && errors?.firstName?.message && (
                            <span className="text-red-600 text-sm font-semibold">
                              {errors?.firstName?.message as string}
                            </span>
                          )}
                        </div>
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
                      rules={{ required: "Enter a last name" }}
                      render={({ field }) => (
                        <div>
                          <input
                            {...field}
                            type="text"
                            name="lastName"
                            id="lastName"
                            className={`block w-full py-2.5 px-4 duration-200 border rounded-lg appearance-none border-zinc-300 placeholder-zinc-300 focus:border-zinc-300 focus:outline-none focus:ring-zinc-300 sm:text-sm ${
                              errors?.lastName &&
                              errors?.lastName?.message &&
                              "border-red-600"
                            }`}
                          />
                          {errors?.firstName && errors?.firstName?.message && (
                            <span className="text-red-600 text-sm font-semibold">
                              {errors?.lastName?.message as string}
                            </span>
                          )}
                        </div>
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
                    rules={{ required: "Enter an address" }}
                    render={({ field }) => (
                      <div>
                        <input
                          {...field}
                          type="text"
                          name="address"
                          id="address"
                          className={`block w-full py-2.5 px-4 duration-200 border rounded-lg appearance-none border-zinc-300 placeholder-zinc-300 focus:border-zinc-300 focus:outline-none focus:ring-zinc-300 sm:text-sm ${
                            errors?.address &&
                            errors?.address?.message &&
                            "border-red-600"
                          }`}
                        />
                        {errors?.address && errors?.address?.message && (
                          <span className="text-red-600 text-sm font-semibold">
                            {errors?.address?.message as string}
                          </span>
                        )}
                      </div>
                    )}
                  />
                </div>
                {/* city & postcode */}
                <div className="grid grid-cols-3 gap-3 mt-2">
                  <div className="">
                    <label htmlFor="city" className="block mb-1">
                      City
                    </label>
                    <Controller
                      name="city"
                      control={control}
                      rules={{ required: "Enter a city" }}
                      render={({ field }) => (
                        <div>
                          <input
                            {...field}
                            type="text"
                            name="city"
                            id="city"
                            className={`block w-full py-2.5 px-4 duration-200 border rounded-lg appearance-none border-zinc-300 placeholder-zinc-300 focus:border-zinc-300 focus:outline-none focus:ring-zinc-300 sm:text-sm ${
                              errors?.city &&
                              errors?.city?.message &&
                              "border-red-600"
                            }`}
                          />
                          {errors?.city && errors?.city?.message && (
                            <span className="text-red-600 text-sm font-semibold">
                              {errors?.city?.message as string}
                            </span>
                          )}
                        </div>
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
                      rules={{ required: "Enter a state" }}
                      render={({ field }) => (
                        <div>
                          <SelectPicker
                            onChange={(value: any) => {
                              field.onChange(value);
                              setStateTaxValue(value);
                            }}
                            data={data}
                            searchable={false}
                            size="lg"
                            className={`w-full ${
                              errors?.state &&
                              errors?.state?.message &&
                              "!border-red-600"
                            }`}
                            placeholder="State"
                          />
                          {errors?.state && errors?.state?.message && (
                            <span className="text-red-600 text-sm font-semibold">
                              {errors?.state?.message as string}
                            </span>
                          )}
                        </div>
                      )}
                    />
                  </div>
                  {/*  postal code */}
                  <div className="">
                    <label htmlFor="postalCode" className="block mb-1">
                      Postal Code
                    </label>
                    <Controller
                      name="postalCode"
                      control={control}
                      rules={{ required: "Enter a postal code" }}
                      render={({ field }) => (
                        <div>
                          <input
                            {...field}
                            type="text"
                            name="postalCode"
                            id="postalCode"
                            className={`block w-full py-2.5 px-4 duration-200 border rounded-lg appearance-none border-zinc-300 placeholder-zinc-300 focus:border-zinc-300 focus:outline-none focus:ring-zinc-300 sm:text-sm ${
                              errors?.postalCode &&
                              errors?.postalCode?.message &&
                              "border-red-600"
                            }`}
                          />
                          {errors?.postalCode &&
                            errors?.postalCode?.message && (
                              <span className="text-red-600 text-sm font-semibold">
                                {errors?.postalCode?.message as string}
                              </span>
                            )}
                        </div>
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
                    rules={{ required: "Enter a phone number" }}
                    render={({ field }) => (
                      <div>
                        <input
                          {...field}
                          type="text"
                          name="phone"
                          id="phone"
                          className={`block w-full py-2.5 px-4 duration-200 border rounded-lg appearance-none border-zinc-300 placeholder-zinc-300 focus:border-zinc-300 focus:outline-none focus:ring-zinc-300 sm:text-sm ${
                            errors?.phone &&
                            errors?.phone?.message &&
                            "border-red-600"
                          }`}
                        />
                        {errors?.phone && errors?.phone?.message && (
                          <span className="text-red-600 text-sm font-semibold">
                            {errors?.phone?.message as string}
                          </span>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>
              {/* PAYMENT METHOD */}
              <PaymentMethod cartData={{cart, totalAmount}} />
            </div>

            <div className="col-span-5 border-l pt-10 md:pl-10 ">
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
              <PromoCode cart={cart} />
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
        </form>
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
