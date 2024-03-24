import React from "react";

const OurRange = () => {
  return (
    <div className="pt-10">
      <div className="max-w-xl mx-auto">
        <div className="text-center ">
          <div className="relative flex flex-col items-center">
            <div className="absolute hidden md:block -top-14 left-0 text-[120px] text-gray-400 font-bold opacity-10">
              RANGE
            </div>
            <h1 className="text-5xl font-bold  ">
              {" "}
              Our <span className="text-blue-500"> Range</span>{" "}
            </h1>
            <div className="flex w-24 mt-1 mb-10 overflow-hidden rounded">
              <div className="flex-1 h-2 bg-blue-200"></div>
              <div className="flex-1 h-2 bg-blue-600"></div>
              <div className="flex-1 h-2 bg-primary"></div>
            </div>
          </div>
          <p className="mb-16 text-base text-center text-gray-500">
            Merging playful design with frictionless technology. Our bands offer
            peace of mind by empowering adventure whilst prioritizing safety and
            independence for all ages and needs.
          </p>
        </div>
      </div>
      {/* Categories started */}
      <div className="grid grid-cols-1 md:grid-cols-3 justify-center  gap-5">
        <div className="relative flex flex-row overflow-hidden  ">
          <div className="absolute  bg-center  "></div>
          <div className="group relative m-0 flex h-72 w-96 rounded-xl shadow-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg">
            <div className="z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100    ">
              <img
                src="https://images.unsplash.com/photo-1506187334569-7596f62cf93f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3149&q=80"
                className="animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110"
                alt=""
              />
            </div>
            <div className="absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
              <h1 className="font-serif text-2xl font-bold text-white shadow-xl">
                Backup Buddy
              </h1>
              <h1 className="text-sm font-light text-gray-200 shadow-xl">
                Ages 3-11
              </h1>
            </div>
          </div>
        </div>
        <div className="relative flex flex-row overflow-hidden  ">
          <div className="absolute  bg-center  "></div>
          <div className="group relative m-0 flex h-72 w-96 rounded-xl shadow-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg">
            <div className="z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100    ">
              <img
                src="https://images.unsplash.com/photo-1506187334569-7596f62cf93f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3149&q=80"
                className="animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110"
                alt=""
              />
            </div>
            <div className="absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
              <h1 className="font-serif text-2xl font-bold text-white shadow-xl">
                Active
              </h1>
              <h1 className="text-sm font-light text-gray-200 shadow-xl">
                Ages 3+
              </h1>
            </div>
          </div>
        </div>
        <div className="relative flex flex-row overflow-hidden  ">
          <div className="absolute  bg-center  "></div>
          <div className="group relative m-0 flex h-72 w-96 rounded-xl shadow-xl ring-gray-900/5 sm:mx-auto sm:max-w-lg">
            <div className="z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100    ">
              <img
                src="https://images.unsplash.com/photo-1506187334569-7596f62cf93f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3149&q=80"
                className="animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110"
                alt=""
              />
            </div>
            <div className="absolute bottom-0 z-20 m-0 pb-4 ps-4 transition duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-3 group-hover:scale-110">
              <h1 className="font-serif text-2xl font-bold text-white shadow-xl">
                I.C.E
              </h1>
              <h1 className="text-sm font-light text-gray-200 shadow-xl">
                Age 12+
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurRange;
