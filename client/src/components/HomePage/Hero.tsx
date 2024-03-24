import React from "react";

const Hero = () => {
  return (
    <section className="overflow-hidden bg-[url(https://i.ibb.co/QcHxCT2/h1-rev-img-11a.jpg)] bg-cover bg-top bg-no-repeat">
      <div className="bg-black/25 py-24">
        <div className=" p-8 md:p-20 lg:px-[10%] ">
          <div>
            <p className="inline-block mb-4 text-sm font-semibold leading-none text-primary capitalize">
              Connection you can tap into
            </p>
            <h2 className="text-4xl font-extrabold text-white md:text-5xl text-left pb-4 md:pb-2">
              Anytime, Anywhere
            </h2>

            <p className="max-w-lg text-white/90 md:mt-6 md:block md:text-lg md:leading-relaxed">
              The smallest and easiest safety wearable on the market. So simple
              a toddler can use it
            </p>

            <div className="mt-4 sm:mt-8">
              <a
                href="#"
                className="inline-flex items-center rounded-full justify-center px-8 py-3  border-primary border-2 hover:border-blue-500 text-white shadow hover:text-gray-100 hover:bg-blue-500 "
              >
                Get Yours Today
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
