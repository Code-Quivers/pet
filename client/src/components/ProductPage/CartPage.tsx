"use client";
import { fileUrlKey } from "@/helpers/config/envConfig";
import {
  addPayAmount,
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "@/redux/slice/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { v4 as uuIdv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { Drawer } from "rsuite";
import useMediaQuery from "@/hooks/useMediaQuiry";
import { RiDeleteBinLine } from "react-icons/ri";
import EmptyCart from "../ProductsPage/Cart/EmptyCart";
import EmptyCartPage from "../ProductsPage/Cart/EmptyCartPage";

const CartPage = ({ cartOpen, setCartOpen }: any) => {
  const isLarge = useMediaQuery("(min-width: 640px)");
  const cart = useSelector((state: any) => state.cart.cart);
  const dispatch = useDispatch();

  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    cart?.forEach((item: any) => {
      totalQuantity += item?.quantity;
      totalPrice += item?.price * item?.quantity;
    });
    return { totalQuantity, totalPrice };
  };
  const checkoutId = uuIdv4();

  return (
    <div className="min-h-[50vh] flex flex-col justify-center items-center max-w-7xl mx-auto ">
      {cart?.length > 0 ? (
        <div className="w-full">
          <div className="mb-10">
            <h1 className="text-3xl md:text-5xl font-semibold text-[#333] text-center">
              Cart
            </h1>
          </div>
          {/*  */}
          <div className="grid grid-cols-7 gap-4">
            <div className="col-span-5">
              <div className="">
                <div className="grid grid-cols-8 py-5 border">
                  <div className="col-span-4">
                    <h2>Product</h2>
                  </div>
                  <div className="col-span-2">
                    <h2>Quantity</h2>
                  </div>
                  <div className="col-span-2 text-right">
                    <h2>Total</h2>
                  </div>
                </div>
                <div>
                  {cart?.length > 0 &&
                    cart?.map((item: any) => (
                      <div
                        key={item?.productId}
                        className="grid grid-cols-8 gap-5 space-y-10"
                      >
                        <div className=" col-span-4 flex items-center gap-5">
                          <div>
                            <Image
                              width={80}
                              height={80}
                              src={`${fileUrlKey()}/${item?.image}`}
                              alt={item?.productName}
                              className="w-20 h-20 object-cover rounded-md"
                            />
                          </div>
                          <div className="space-y-2">
                            <p className="font-bold text-base">
                              {`${item?.productName} - ${item?.color?.name}`}
                            </p>
                            <p className=" text-sm">
                              {`${item?.productName} - ${item?.color?.name}`}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <div className="flex justify-between items-center w-full">
                            <div className="flex items-center justify-center">
                              {item?.quantity === 1 ? (
                                <button
                                  className="hover:text-red-500"
                                  onClick={() =>
                                    dispatch(removeItem(item?.variantId) as any)
                                  }
                                >
                                  <RiDeleteBinLine size={18} />
                                </button>
                              ) : (
                                <button
                                  onClick={() =>
                                    dispatch(
                                      decrementQuantity(item?.variantId) as any
                                    )
                                  }
                                  className="w-7 h-7 flex items-center justify-center border border-gray-300 shadow rounded-full text-xl font-semibold hover:bg-gray-100 active:bg-gray-200"
                                >
                                  -
                                </button>
                              )}
                              <p className="text-center w-8 font-semibold">
                                {item?.quantity}
                              </p>
                              <button
                                onClick={() =>
                                  dispatch(
                                    incrementQuantity(item?.variantId) as any
                                  )
                                }
                                className="w-7 h-7 hover:bg-gray-100 active:bg-gray-200 flex items-center justify-center border border-gray-300 shadow rounded-full text-xl font-semibold"
                              >
                                +
                              </button>
                            </div>
                            {/* <span
                                className="hover:text-red-600 text-sm active:text-red-800 cursor-pointer"
                                onClick={() =>
                                  dispatch(removeItem(item?.productId) as any)
                                }
                              >
                                Remove
                              </span> */}
                          </div>

                          <div>
                            <div className="flex justify-between">
                              <p className="font-semibold text-gray-700">
                                ${item?.price * item?.quantity}
                              </p>
                            </div>
                          </div>
                          <p
                            style={{ backgroundColor: item?.color?.code }}
                            className="w-5 h-5 rounded-full mr-2 mt-1"
                          ></p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="col-span-2"></div>
          </div>
        </div>
      ) : (
        <EmptyCartPage />
      )}
    </div>
  );
};

export default CartPage;
