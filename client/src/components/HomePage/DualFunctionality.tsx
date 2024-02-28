import React from "react";

const OurInspiration = () => {
  return (
    <div className="py-10 md:pt-16 dark:bg-gray-700">
      <div className="flex flex-col-reverse md:flex-row gap-4">
        <div className="w-full  md:w-1/2 bg-gray-100 flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center px-4">
            <span className="inline-block mb-4 text-sm font-semibold leading-none text-red-500 capitalize dark:text-red-200">
              Dual
            </span>
            <h2 className="mb-6 text-3xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-300 md:text-5xl text-center">
              Dual Functionality Convenience{" "}
            </h2>
            <p className="mb-6 font-medium tracking-wide text-gray-600 dark:text-gray-400 md:text-lg text-center">
              Activate your E.T. Phone Home Band with an easy tap or scan. Using
              Both NFC and QR code technology. Compatible with any smart phone.
            </p>
            <a
              href="#"
              className="inline-flex items-center rounded-full justify-center px-8 py-3  border-primary border-2 hover:border-blue-500 text-black shadow hover:text-gray-100 hover:bg-blue-500 "
            >
              Shop Now
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/2 md:mb-0 mb-8">
          <div className="relative  md:mr-0 w-full">
            <div className="relative overflow-hidden rounded-7xl">
              <img
                src="https://i.ibb.co/RgM98D5/Pet-Profile-Maple-Image.webp"
                alt=""
                className="relative z-10 object-cover w-full h-full rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurInspiration;
