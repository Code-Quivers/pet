import React from "react";

const AgeAppropriate = () => {
  return (
    <div className="md:pb-20  ">
      <div className="flex flex-col-reverse md:flex-row gap-4">
        <div className="w-full md:w-1/2 md:mb-0 mb-8">
          <div className="relative  md:mr-0 w-full">
            <div className="relative overflow-hidden rounded-7xl">
              <img
                src="https://i.ibb.co/m47x7rx/phone2-540x.jpg"
                alt=""
                className="relative z-10 object-cover w-full h-full rounded-md"
              />
            </div>
          </div>
        </div>
        <div className="w-full  md:w-1/2 bg-gray-100 flex flex-col justify-center items-center py-6">
          <div className="flex flex-col justify-center items-center px-4">
            <h2 className="mb-6 text-3xl font-semibold leading-tight tracking-tight text-gray-900   md:text-5xl text-center">
              Age Appropriate Safety is Just a Tap Away
            </h2>
            <p className="mb-6 font-medium tracking-wide text-gray-600   md:text-lg text-center">
              For those dead phone, lost phone or too young for a phone times.
              No need to remember phone numbers <br />
              <br />. Imagine the relief of knowing that with just an easy tap,
              your child can reach you instantly, no matter where they are
              without needing their own phone. No more panic or worry; instead a
              sense of confidence and control that reduces separation time and
              anxiety.
            </p>
            <a
              href="#"
              className="inline-flex items-center rounded-full justify-center px-8 py-3  border-primary border-2 hover:border-blue-500 text-black shadow hover:text-gray-100 hover:bg-blue-500 "
            >
              Shop Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgeAppropriate;
