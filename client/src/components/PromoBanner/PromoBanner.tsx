import Link from "next/link";
import React from "react";

const PromoBanner = () => {
  return (
    <div className="">
      <div className="bg-gray-950">
        <div className="mx-auto max-w-7xl py-1 px-3 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between lg:flex-row lg:justify-center">
            <div className="flex  items-center lg:mr-3 lg:flex-none">
              <p className="ml-3 text-center font-medium text-white">
                Buy a<span className="font-semibold"> Backup Buddy</span> and
                use code
                <span className="font-black"> 2FOR1</span> to get a free{" "}
                <span className="font-black">Active band</span>
              </p>
            </div>
            <div className="mt-2 w-full flex-shrink-0 lg:mt-0 lg:w-auto">
              <Link href={"/"} className="underline text-white text-sm">
                Buy Now
              </Link>
              {/* <a
                className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-teal-600 shadow-sm hover:bg-teal-50"
                href="#pricing"
              >
                Buy now
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;
