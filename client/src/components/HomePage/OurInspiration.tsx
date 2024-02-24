import React from "react";

const OurInspiration = () => {
  return (
    <div className="py-10 md:py-20 dark:bg-gray-700">
      <div className="flex flex-col-reverse md:flex-row gap-4">
        <div className="w-full  md:w-1/2 bg-gray-100 flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center px-4">
            <span className="inline-block mb-4 text-sm font-semibold leading-none text-red-500 capitalize dark:text-red-200">
              Inspiration
            </span>
            <h2 className="mb-6 text-3xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-gray-300 md:text-5xl">
              Our Inspiration
            </h2>
            <p className="mb-6 font-medium tracking-wide text-gray-600 dark:text-gray-400 md:text-lg text-center">
              We all know that feeling: the panic when your furry friend
              disappears. Our Australian Shepherd, Maple, taught us that lesson
              well. We were inspired to do something thanks to that lesson.
              ByteTag is our promise to keep every adventure worry-free, for pet
              parents and pups alike.
            </p>
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-3 text-gray-100 bg-blue-600 rounded-md shadow hover:text-gray-100 hover:bg-blue-500 "
            >
              Get started
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
