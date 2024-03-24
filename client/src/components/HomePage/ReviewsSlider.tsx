"use client";

import { useState } from "react";
import { Carousel, Divider } from "rsuite";

const RadioLabel = ({ children }: any) => (
  <label style={{ padding: 7 }}>{children}</label>
);

const reviews = [
  {
    review: "LOVE These",
    name: "Mary Ann",
    testimonials:
      "I love that these bands never require charging and I dont have to pay any ongoing monthly payments and the designs are so cute and lightweight compared to a smart watch.",
  },
  {
    review: "So Easy!    ",
    name: "Rosey",
    testimonials:
      "I’m not comfortable with my kids having a smartphone given all the dangers that come with them. This is the perfect solution for our family to stay in contact in an emergency. My kids also loved the MAGIC bonus gift in the box!!.",
  },
  {
    review: "Peace of Mind",
    name: "Joel",
    testimonials:
      "Perfect for a day at the beach and our upcoming trip to Disney. So simple to tap and connect if they get lost or separated from us. Peace of mind at a great price.",
  },
  {
    review: "No More worrying about dead phones",
    name: "Ryan",
    testimonials:
      "My kids are always playing games on their phones and running the battery dead, these bands mean I know they can still reach me or their mother or grandparents easily. They also love using it with our phones to call nanny and pop!",
  },
  {
    review: "Simple & Safe",
    name: "Lucy",
    testimonials:
      "I wanted an option that didnt include a monthly payment and didnt involve exposing my kids to EMFs or hacking risks. These are fashionable and light and so simple.",
  },
];

const ReviewsSlider = () => {
  const [shape] = useState("bar");
  return (
    <div className="pt-10 mb-14 ">
      <div className="max-w-xl mx-auto -mb-4">
        <div className="text-center ">
          <div className="relative flex flex-col items-center">
            <div className="absolute hidden md:block -top-14 left-0 text-[120px] text-gray-400 font-bold opacity-10">
              Testimonial
            </div>
            <h1 className="text-5xl font-bold  ">
              {" "}
              What <span className="text-blue-500">
                {" "}
                People Are Saying
              </span>{" "}
            </h1>
            <div className="flex w-24 mt-1 mb-10 overflow-hidden rounded">
              <div className="flex-1 h-2 bg-blue-200"></div>
              <div className="flex-1 h-2 bg-blue-600"></div>
              <div className="flex-1 h-2 bg-primary"></div>
            </div>
          </div>
        </div>
        <Divider vertical />
        <Carousel key={`${shape}`} shape={shape} className="custom-slider">
          {reviews?.map((rev, index) => (
            <>
              <div className="flex justify-center items-center ">
                <div className="py-10">
                  <div className="flex gap-0.5 text-green-500 justify-center">
                    <svg
                      className="h-5 w-5 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>

                    <svg
                      className="h-5 w-5 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>

                    <svg
                      className="h-5 w-5 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>

                    <svg
                      className="h-5 w-5 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>

                    <svg
                      className="h-5 w-5 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl text-center font-bold text-secondary sm:text-3xl">
                    {rev?.name}
                  </h2>
                  <p className="text-center font-bold">
                    <small>Review: {rev?.review}</small>
                  </p>
                  <p className="mt-4 leading-relaxed text-gray-700 text-center md:w-[70%] mx-auto pb-4">
                    {rev?.testimonials}
                  </p>
                </div>
              </div>
            </>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default ReviewsSlider;
