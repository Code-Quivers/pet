import Link from "next/link";
import React from "react";
import { Accordion, Drawer, Placeholder } from "rsuite";
import { Tooltip, Whisper, Button, ButtonToolbar } from "rsuite";

const tooltip = <Tooltip>Remove All</Tooltip>;
const tooltip2 = <Tooltip>Remove</Tooltip>;

const Cart = ({ cartOpen, setCartOpen }: any) => {
  return (
    <div>
      <Drawer open={cartOpen} onClose={() => setCartOpen(false)} size={"xs"}>
        <Drawer.Body style={{ paddingLeft: 0, paddingRight: 0 }}>
          <div className="p-6 bg-white  ">
            <div className="flex justify-between items-center py-10">
              <div className="flex items-center">
                <h2 className="text-xl font-bold  ">Shopping Cart</h2>
                <span className="inline-flex items-center justify-center w-8 h-8 ml-4 text-base font-bold bg-secondary rounded-full   text-gray-50">
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
            <div className="block pb-6 mb-6 -mx-4 border-b border-gray-200  md:flex">
              <div className="flex justify-between it w-full px-4 md:2/3">
                <div className="flex justify-start items-start gap-4">
                  <div>
                    <img
                      src="https://i.postimg.cc/hj6h6Vwv/pexels-artem-beliaikin-2292919.jpg"
                      alt=""
                      className="object-cover w-16 h-16 object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <h2 className="text-base font-semibold">
                      Clara French Press
                    </h2>
                    <div className="flex justify-start items-center gap-2">
                      <p className="text-sm font-medium text-gray-600  ">4 X</p>
                      <p className="text-lg font-bold text-primary ">$299.00</p>
                    </div>
                  </div>
                </div>
                <div>
                  <Whisper
                    placement="top"
                    controlId="control-id-hover"
                    trigger="hover"
                    speaker={tooltip2}
                  >
                    <button className="text-gray-700 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-x-lg"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z"
                        />
                      </svg>
                    </button>
                  </Whisper>
                </div>
              </div>
            </div>

            <div className="flex justify-between text-base dark:text-gray-400">
              <p>Subtotal</p>
              <p>$400.00</p>
            </div>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
              Shipping calculated at checkout period.
            </p>
            <div className="flex items-center justify-center mt-6">
              <button className="w-full py-3 text-lg font-medium bg-primary rounded-md text-gray-50 hover:bg-secondary">
                Checkout
              </button>
            </div>
            <div className="flex items-center justify-center mt-6">
              <p>
                <span className="dark:text-gray-400">or,</span>
                <button
                  onClick={() => setCartOpen(false)}
                  className="pl-1 text-primary-600 hover:underline dark:text-gray-300"
                >
                  Continue Shopping
                </button>
              </p>
            </div>
          </div>
        </Drawer.Body>
      </Drawer>
    </div>
  );
};

export default Cart;
