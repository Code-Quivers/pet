"use client";
import SingleProductSlider from "@/components/ProductPage/ProductSlider/SingleProductSlider";
import Image from "next/image";
import { EmblaOptionsType } from "embla-carousel";
import React, { useState } from "react";
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

const productImages = [
  {
    id: 1,
    url: "https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg",
    alt: "Feature Image 1",
    caption: "A stunning view of the product.",
  },
  {
    id: 2,
    url: "https://readymadeui.com/images/laptop2.webp",
    alt: "Product Image 2",
    caption: "Another perspective of the product.",
  },
  {
    id: 3,
    url: "https://readymadeui.com/images/laptop3.webp",
    alt: "Product Image 3",
    caption: "Close-up shot highlighting key features.",
  },
  {
    id: 4,
    url: "https://readymadeui.com/images/laptop4.webp",
    alt: "Product Image 4",
    caption: "Different color variant of the product.",
  },
  {
    id: 5,
    url: "https://readymadeui.com/images/laptop5.webp",
    alt: "Product Image 5",
    caption: "Product in action - showcasing its usage.",
  },
];

console.log(productImages);

const SingleProductPage = () => {
  const [mainImage, setMainImage] = useState(productImages[0]);
  const OPTIONS: EmblaOptionsType = {};
  const SLIDE_COUNT = 10;
  // const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  return (
    <div className="pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex gap-5">
          {/* product slider */}
          <div className="md:max-w-[50%]">
            <SingleProductSlider slides={productImages} options={OPTIONS} />
          </div>
          {/* product variant and title */}
          <div className="md:flex-1 px-4 md:max-w-[50%] mt-5 md:mt-0">
            <div>
              {/* Title and Price  */}
              <div className="">
                <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 mb-2">
                  ByteTag Slide
                </h2>
                <p className="text-gray-600 text-xl">$29.99</p>
              </div>

              {/* product colors */}
              <div className="my-3">
                <p className=" text-gray-700">
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

              {/* product size */}
              <div className="my-3">
                <h1>Size: </h1>
                <div className="flex gap-2">
                  <button className="w-20 h-10 hover:border-black border rounded-md flex justify-center items-center">
                    Small
                  </button>
                  <button className="w-20 h-10 border rounded-md flex justify-center items-center">
                    Medium
                  </button>
                  <button className="w-20 h-10 border rounded-md flex justify-center items-center">
                    Large
                  </button>
                </div>
              </div>

              {/* select quantity */}
              <div className="md:flex items-end mt-2 gap-7">
                <div className="flex items-end mb-3 md:mb-0">
                  <div>
                    <p className="text-gray-700">
                      <span className="">Quantity:</span>
                    </p>
                    <div className="flex items-center">
                      <div className="inline-flex items-center mt-2 border text-gray-600 rounded-full">
                        <button className="disabled:opacity-50 inline-flex items-center px-3 py-2 ">
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
                        <div className="bg-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-2 select-none">
                          2
                        </div>
                        <button className=" disabled:opacity-50 inline-flex items-center px-3 py-2">
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
                <div className="w-full md:px-2">
                  <button className="w-full bg-primary  text-white py-2 md:px-4 rounded-full font-bold hover:bg-gray-800 text-base md:text-lg">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Stock */}
            {/* <div className="flex justify-start items-center gap-2 py-6">
              <p className="font-bold text-gray-700   text-lg">Availability:</p>
              <p className="text-gray-600   text-xl">In Stock</p>
            </div> */}

            {/* Add to cart */}
            {/* <div className="flex -mx-2 mb-4">
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
            </div> */}
          </div>
        </div>
      </div>
      {/* Product description */}
      <div className="pt-10 md:pt-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
      {/* <div className="max-w-xl mx-auto">
        <SingleProductSlider />
      </div> */}
    </div>
  );
};

export default SingleProductPage;
