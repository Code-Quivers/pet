import React from "react";

const ConnectYourWay = () => {
  return (
    <div className="py-10 md:py-20 dark:bg-gray-700">
      <div className="flex flex-col-reverse md:flex-row gap-4">
        <div className="w-full  md:w-1/2 bg-gray-100 flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center px-4">
            <span className="inline-block mb-4 text-sm font-semibold leading-none text-red-500 capitalize dark:text-red-200">
              Connect
            </span>
            <h2 className="mb-6 text-3xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-300 md:text-5xl text-center">
              Connect Your Way
            </h2>
            <p className="mb-6 font-medium tracking-wide text-gray-600 dark:text-gray-400 md:text-lg text-center">
              Activate the E.T. Phone Home Band with a tap or scan—compatible
              with any smartphone. Stay connected through calls, messages, video
              chats, and GPS sharing effortlessly. Elevate your connectivity
              with simplicity and versatility.
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

export default ConnectYourWay;
