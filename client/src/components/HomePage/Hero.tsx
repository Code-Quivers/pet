import React from "react";

const Hero = () => {
  return (
    <section className="overflow-hidden bg-[url(https://i.ibb.co/QcHxCT2/h1-rev-img-11a.jpg)] bg-cover bg-top bg-no-repeat">
      <div className="bg-black/25 py-24">
        <div className=" p-8 md:p-20 lg:px-[10%] ">
          <div>
            <p className="mb-4 text-sm font-bold leading-none  text-primary ">
              Connection you can tap into
            </p>
            <h2 className="text-4xl font-extrabold text-white md:text-5xl text-left pb-4 md:pb-2">
              Anytime, Anywhere
            </h2>

            <p className="max-w-lg text-white/90 md:mt-6 md:block md:text-lg md:leading-relaxed">
              The smallest and easiest safety wearable on the market
            </p>

            <div className="mt-4 sm:mt-8">
              <button
                type="button"
                className="items-center rounded-full justify-center px-8 py-3  border-primary border-2 hover:border-primary duration-300 transition-all text-white  hover:text-gray-100 hover:bg-primary "
              >
                Get Yours Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
