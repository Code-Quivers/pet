import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "@/redux/slice/cartSlice";
import Link from "next/link";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Accordion, Drawer, Placeholder } from "rsuite";
import { Tooltip, Whisper, Button, ButtonToolbar } from "rsuite";

const tooltip = <Tooltip>Remove All</Tooltip>;
const tooltip2 = <Tooltip>Remove</Tooltip>;

const Cart = ({ cartOpen, setCartOpen }: any) => {
  const cart = useSelector((state: any) => state.cart.cart);
  const dispatch = useDispatch();
  console.log(cart, "cart");
  return (
    <div>
      <Drawer open={cartOpen} onClose={() => setCartOpen(false)} size={"xs"}>
        <Drawer.Body
          style={{ paddingLeft: 0, paddingRight: 0 }}
          // className="relative"
        >
          <div className="p-6 bg-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center mt-3 mb-7">
                <h2 className="text-xl font-bold">Cart</h2>
                <span className="inline-flex items-center justify-center w-6 h-6 ml-3 text-sm font-bold bg-secondary rounded-full text-gray-50">
                  6
                </span>
              </div>
              <div className="text-right">
                <Whisper
                  placement="top"
                  controlId="control-id-hover"
                  trigger="hover"
                  speaker={tooltip}
                >
                  <button className="text-gray-700 ">Clear all</button>
                </Whisper>
              </div>
            </div>
            <div>
              {cart?.length > 0 &&
                cart?.map((item: any) => (
                  <div key={item?.productId} className="flex gap-2">
                    <div className="w-1/5">
                      <img
                        src="https://i.postimg.cc/hj6h6Vwv/pexels-artem-beliaikin-2292919.jpg"
                        alt=""
                        className="object-cover w-20 h-20 object-cover rounded-md"
                      />
                    </div>
                    <div className="w-4/5 flex flex-col gap-6">
                      <div className="flex justify-between w-full">
                        <p className="font-bold">Clara French Press</p>
                        <span
                          className="hover:text-red-600 active:text-red-800 cursor-pointer"
                          onClick={() => dispatch(removeItem(item?.productId) as any)}
                        >
                          <AiOutlineDelete size={20} />
                        </span>
                      </div>
                      <div>
                        <div className="flex justify-between">
                          <p className="font-semibold text-gray-700">$299.00</p>
                          <div className="flex items-center justify-center">
                            <button
                              onClick={() =>
                                dispatch(decrementQuantity(item?.productId) as any)
                              }
                              className="w-7 h-7 flex items-center justify-center border border-gray-300 shadow rounded-full text-xl font-semibold hover:bg-gray-100 active:bg-gray-200"
                            >
                              -
                            </button>
                            <p className="text-center w-10 font-semibold">
                              {item?.quantity}
                            </p>
                            <button
                              onClick={() =>
                                dispatch(incrementQuantity(item?.productId) as any)
                              }
                              className="w-7 h-7 hover:bg-gray-100 active:bg-gray-200 flex items-center justify-center border border-gray-300 shadow rounded-full text-xl font-semibold"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* price with quantity update */}
                  </div>
                ))}
            </div>
          </div>
          <hr />
          <div className="p-6 fixed bottom-0 left-0 right-0">
            <div>
              <div className="flex justify-between text-base ">
                <p>Subtotal</p>
                <p>$400.00</p>
              </div>
              <p className="mt-4 text-sm text-gray-500 ">
                Shipping calculated at checkout period.
              </p>
              <div className="flex items-center justify-center mt-6 gap-4">
                <Link
                  onClick={() => setCartOpen(false)}
                  href="/shop/cart"
                  className="w-full py-3 text-lg font-medium bg-primary rounded-md text-gray-50 hover:bg-secondary text-center"
                >
                  View Cart
                </Link>
                <Link
                  onClick={() => setCartOpen(false)}
                  href="/shop/checkout"
                  className="w-full py-3 text-lg font-medium bg-black hover:bg-primary rounded-md text-gray-50 hover:bg-secondary text-center"
                >
                  Checkout
                </Link>
              </div>
              <div className="flex items-center justify-center mt-6">
                <p>
                  <span>or,</span>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="pl-1 text-primary-600 hover:underline"
                  >
                    Continue Shopping
                  </button>
                </p>
              </div>
            </div>
          </div>
        </Drawer.Body>
      </Drawer>
    </div>
  );
};

export default Cart;
