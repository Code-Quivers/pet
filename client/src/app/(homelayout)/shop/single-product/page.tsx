import React from "react";
import { Tooltip, Whisper } from "rsuite";

const tooltipWhite = <Tooltip>White</Tooltip>;
const tooltipBlack = <Tooltip>Black</Tooltip>;
const tooltipPink = <Tooltip>Pink</Tooltip>;
const tooltipRed = <Tooltip>Red</Tooltip>;
const tooltipYellow = <Tooltip>Yellow</Tooltip>;
const tooltipFloral = <Tooltip>Floral</Tooltip>;
const tooltipMountain = <Tooltip>Mountain</Tooltip>;
const tooltipSilicone = <Tooltip>Silicone</Tooltip>;
const tooltipGreen = <Tooltip>Green</Tooltip>;
const tooltipBlue = <Tooltip>Blue</Tooltip>;

const SingleProductPage = () => {
  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4 gap-10">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-gray-300   mb-4">
              <img
                className="w-full h-full object-cover"
                src="https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg"
                alt="Product Image"
              />
            </div>
            <div className="mt-6 grid grid-cols-4 justify-center gap-6 mx-auto">
              <div className="rounded-xl p-4 shadow-md hover:scale-105 transition-all ease-in-out">
                <img
                  src="https://readymadeui.com/images/laptop2.webp"
                  alt="Product2"
                  className="w-24 cursor-pointer"
                />
              </div>
              <div className="rounded-xl p-4 shadow-md hover:scale-105 transition-all ease-in-out">
                <img
                  src="https://readymadeui.com/images/laptop3.webp"
                  alt="Product2"
                  className="w-24 cursor-pointer"
                />
              </div>
              <div className="rounded-xl p-4 shadow-md hover:scale-105 transition-all ease-in-out">
                <img
                  src="https://readymadeui.com/images/laptop4.webp"
                  alt="Product2"
                  className="w-24 cursor-pointer"
                />
              </div>
              <div className="rounded-xl p-4 shadow-md hover:scale-105 transition-all ease-in-out">
                <img
                  src="https://readymadeui.com/images/laptop5.webp"
                  alt="Product2"
                  className="w-24 cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <div>
              {/* Title and Price  */}
              <div className="pb-6">
                <h2 className="text-3xl md:text-5xl text-gray-900   mb-4 md:mb-6">
                  ByteTag Slide
                </h2>
                <p className="text-gray-600   text-xl">$29.99</p>
              </div>

              {/* product colors */}
              <div className="py-2 md:py-6">
                <p className=" text-gray-700  ">
                  <span className="">Color</span>:{" "}
                  <span className="text-bold">White</span>
                </p>
                <div className="flex items-center mt-2">
                  {/* white */}
                  <Whisper
                    placement="top"
                    controlId="control-id-hover"
                    trigger="hover"
                    speaker={tooltipWhite}
                  >
                    <button className="w-6 h-6 md:w-9 md:h-9 rounded-full bg-white border mr-2"></button>
                  </Whisper>
                  {/* black */}
                  <Whisper
                    placement="top"
                    controlId="control-id-hover"
                    trigger="hover"
                    speaker={tooltipBlack}
                  >
                    <button className="w-6 h-6 md:w-9 md:h-9 rounded-full bg-black   mr-2"></button>
                  </Whisper>
                  {/* pink */}
                  <Whisper
                    placement="top"
                    controlId="control-id-hover"
                    trigger="hover"
                    speaker={tooltipPink}
                  >
                    <button className="w-6 h-6 md:w-9 md:h-9 rounded-full bg-pink-500  mr-2"></button>
                  </Whisper>
                  {/* red */}
                  <Whisper
                    placement="top"
                    controlId="control-id-hover"
                    trigger="hover"
                    speaker={tooltipRed}
                  >
                    <button className="w-6 h-6 md:w-9 md:h-9 rounded-full bg-red-500  mr-2"></button>
                  </Whisper>
                  {/* Yellow */}
                  <Whisper
                    placement="top"
                    controlId="control-id-hover"
                    trigger="hover"
                    speaker={tooltipYellow}
                  >
                    <button className="w-6 h-6 md:w-9 md:h-9 rounded-full bg-yellow-500  mr-2"></button>
                  </Whisper>
                  {/* Floral */}
                  <Whisper
                    placement="top"
                    controlId="control-id-hover"
                    trigger="hover"
                    speaker={tooltipFloral}
                  >
                    <button className="w-6 h-6 md:w-9 md:h-9 rounded-full bg-green-950  mr-2"></button>
                  </Whisper>
                  {/* mountain */}
                  <Whisper
                    placement="top"
                    controlId="control-id-hover"
                    trigger="hover"
                    speaker={tooltipMountain}
                  >
                    <button className="w-6 h-6 md:w-9 md:h-9 rounded-full bg-neutral-600  mr-2"></button>
                  </Whisper>
                  {/* silicone */}
                  <Whisper
                    placement="top"
                    controlId="control-id-hover"
                    trigger="hover"
                    speaker={tooltipSilicone}
                  >
                    <button className="w-6 h-6 md:w-9 md:h-9 rounded-full bg-neutral-800  mr-2"></button>
                  </Whisper>
                  {/* green */}
                  <Whisper
                    placement="top"
                    controlId="control-id-hover"
                    trigger="hover"
                    speaker={tooltipGreen}
                  >
                    <button className="w-6 h-6 md:w-9 md:h-9 rounded-full bg-green-500  mr-2"></button>
                  </Whisper>
                  {/* Blue */}
                  <Whisper
                    placement="top"
                    controlId="control-id-hover"
                    trigger="hover"
                    speaker={tooltipBlue}
                  >
                    <button className="w-6 h-6 md:w-9 md:h-9 rounded-full bg-blue-500  mr-2"></button>
                  </Whisper>
                </div>
              </div>

              {/* select quantity */}
              <div className="py-2 md:py-6">
                <p className=" text-gray-700  ">
                  <span className="">Quantity:</span>{" "}
                </p>
                <div className="flex items-center mt-2">
                  <div className="inline-flex items-center mt-2">
                    <button className="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M20 12H4"
                        />
                      </svg>
                    </button>
                    <div className="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none">
                      2
                    </div>
                    <button className="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stock */}
            <div className="flex justify-start items-center gap-2 py-6">
              <p className="font-bold text-gray-700   text-lg">Availability:</p>
              <p className="text-gray-600   text-xl">In Stock</p>
            </div>

            {/* Add to cart */}
            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2">
                <button className="w-full bg-primary  text-white py-2 md:px-4 rounded-full font-bold hover:bg-gray-800 text-base md:text-lg">
                  Add to Cart
                </button>
              </div>
              <div className="w-1/2 px-2">
                <button className="w-full bg-gray-200 text-gray-800 hover:text-white py-2 md:px-4 rounded-full font-bold hover:bg-primary text-base md:text-lg">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Product description */}
      <div className="pt-10 md:pt-20">
        <span className="text-xl md:text-4xl  font-bold text-gray-700  ">
          Product Description:
        </span>
        <p className="text-gray-600   text-sm mt-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed ante
          justo. Integer euismod libero id mauris malesuada tincidunt. Vivamus
          commodo nulla ut lorem rhoncus aliquet. Duis dapibus augue vel ipsum
          pretium, et venenatis sem blandit. Quisque ut erat vitae nisi ultrices
          placerat non eget velit. Integer ornare mi sed ipsum lacinia, non
          sagittis mauris blandit. Morbi fermentum libero vel nisl suscipit, nec
          tincidunt mi consectetur.
        </p>
      </div>
      <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] p-6">
        <h3 className="text-lg font-bold text-[#333]">Reviews(10)</h3>
        <div className="grid md:grid-cols-2 gap-12 mt-6">
          <div>
            <div className="space-y-3">
              <div className="flex items-center">
                <p className="text-sm text-[#333] font-bold">5.0</p>
                <svg
                  className="w-5 fill-[#333] ml-1"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <div className="bg-gray-400 rounded w-full h-2 ml-3">
                  <div className="w-2/3 h-full rounded bg-[#333]"></div>
                </div>
                <p className="text-sm text-[#333] font-bold ml-3">66%</p>
              </div>
              <div className="flex items-center">
                <p className="text-sm text-[#333] font-bold">4.0</p>
                <svg
                  className="w-5 fill-[#333] ml-1"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <div className="bg-gray-400 rounded w-full h-2 ml-3">
                  <div className="w-1/3 h-full rounded bg-[#333]"></div>
                </div>
                <p className="text-sm text-[#333] font-bold ml-3">33%</p>
              </div>
              <div className="flex items-center">
                <p className="text-sm text-[#333] font-bold">3.0</p>
                <svg
                  className="w-5 fill-[#333] ml-1"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <div className="bg-gray-400 rounded w-full h-2 ml-3">
                  <div className="w-1/6 h-full rounded bg-[#333]"></div>
                </div>
                <p className="text-sm text-[#333] font-bold ml-3">16%</p>
              </div>
              <div className="flex items-center">
                <p className="text-sm text-[#333] font-bold">2.0</p>
                <svg
                  className="w-5 fill-[#333] ml-1"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <div className="bg-gray-400 rounded w-full h-2 ml-3">
                  <div className="w-1/12 h-full rounded bg-[#333]"></div>
                </div>
                <p className="text-sm text-[#333] font-bold ml-3">8%</p>
              </div>
              <div className="flex items-center">
                <p className="text-sm text-[#333] font-bold">1.0</p>
                <svg
                  className="w-5 fill-[#333] ml-1"
                  viewBox="0 0 14 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                </svg>
                <div className="bg-gray-400 rounded w-full h-2 ml-3">
                  <div className="w-[6%] h-full rounded bg-[#333]"></div>
                </div>
                <p className="text-sm text-[#333] font-bold ml-3">6%</p>
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex items-start">
              <img
                src="https://readymadeui.com/team-2.webp"
                className="w-12 h-12 rounded-full border-2 border-white"
              />
              <div className="ml-3">
                <h4 className="text-sm font-bold text-[#333]">John Doe</h4>
                <div className="flex space-x-1 mt-1">
                  <svg
                    className="w-4 fill-[#333]"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <svg
                    className="w-4 fill-[#333]"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <svg
                    className="w-4 fill-[#333]"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <svg
                    className="w-4 fill-[#CED5D8]"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <svg
                    className="w-4 fill-[#CED5D8]"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <p className="text-xs !ml-2 font-semibold text-[#333]">
                    2 mins ago
                  </p>
                </div>
                <p className="text-sm mt-4 text-[#333]">
                  Lorem ipsum dolor sit amet, consectetur adipisci elit, sed
                  eiusmod tempor incidunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
            <button
              type="button"
              className="w-full mt-10 px-4 py-2.5 bg-transparent hover:bg-gray-50 border border-[#333] text-[#333] font-bold rounded"
            >
              Read all reviews
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
