"use client";

import { Rate } from "rsuite";
import ReviewSortBy from "./ReviewSortBy";

const AllReviewsPage = () => {
  return (
    <section className="">
      {/* section title */}
      <div className="my-20  max-w-lg mx-auto">
        <h1 className="text-4xl text-center font-semibold">
          Read trusted reviews from our customers
        </h1>
      </div>

      {/* total and filter */}
      <div className="flex justify-between items-start sm:items-center">
        <div className="flex max-sm:flex-col max-sm:justify-start sm:items-center gap-3">
          <Rate
            content="Shafin"
            color="green"
            size="xs"
            defaultValue={5}
            readOnly
          />
          <p>2,039 Reviews</p>
        </div>
        <div className="flex items-center gap-3">
          <div>
            <button className="border px-4 py-2 rounded-lg text-lg">
              Write a review
            </button>
          </div>
          <div>
            <ReviewSortBy />
          </div>
        </div>
      </div>

      {/*  */}
      <section className="grid sm:grid-cols-2  *:duration-300 *:transition-all *:ease-in-out gap-5 mt-10">
        <div className="border hover:bg-[#f7f7f7] rounded-md p-3">
          <div className="grid grid-cols-6 ">
            <div className="col-span-4">
              <div className="space-y-3">
                <div>
                  {/* author name and date */}
                  <div className="space-y-1">
                    <h4 className="text-lg font-semibold">Spencer H.</h4>
                    <p className="text-xs text-[#c0c0c0]">5/17/2024</p>
                  </div>{" "}
                  {/* rating and description */}
                </div>
                <div className="space-y-3">
                  <Rate color="green" size="xs" defaultValue={5} readOnly />
                  <p className="my-2 text-sm whitespace-pre-wrap">
                    Bubbles absolutely loves the beach silicone! It keeps the
                    noise down when he shakes, and is VERY durable. I prefer the
                    silicone over the apoxy. Will definitely recommend to ALL my
                    friends and family!
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-2">Image</div>
          </div>
          {/* product details */}
          <div className="flex  border-t mt-3 pt-3">
            <h2>Image</h2>
            <h2>Pink</h2>
          </div>
        </div>
        <div className="border rounded-md p-3">
          <div className="grid grid-cols-6 ">
            <div className="col-span-4">
              <div className="space-y-3">
                <div>
                  {/* author name and date */}
                  <div className="space-y-1">
                    <h4 className="text-lg font-semibold">Spencer H.</h4>
                    <p className="text-xs text-[#c0c0c0]">5/17/2024</p>
                  </div>{" "}
                  {/* rating and description */}
                </div>
                <div className="space-y-3">
                  <Rate color="green" size="xs" defaultValue={5} readOnly />
                  <p className="my-2 text-sm whitespace-pre-wrap">
                    Bubbles absolutely loves the beach silicone! It keeps the
                    noise down when he shakes, and is VERY durable. I prefer the
                    silicone over the apoxy. Will definitely recommend to ALL my
                    friends and family!
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-2">Image</div>
          </div>
          {/* product details */}
          <div className="flex  border-t mt-3 pt-3">
            <h2>Image</h2>
            <h2>Pink</h2>
          </div>
        </div>
        <div className="border rounded-md p-3">
          <div className="grid grid-cols-6 ">
            <div className="col-span-4">
              <div className="space-y-3">
                <div>
                  {/* author name and date */}
                  <div className="space-y-1">
                    <h4 className="text-lg font-semibold">Spencer H.</h4>
                    <p className="text-xs text-[#c0c0c0]">5/17/2024</p>
                  </div>{" "}
                  {/* rating and description */}
                </div>
                <div className="space-y-3">
                  <Rate color="green" size="xs" defaultValue={5} readOnly />
                  <p className="my-2 text-sm whitespace-pre-wrap">
                    Bubbles absolutely loves the beach silicone! It keeps the
                    noise down when he shakes, and is VERY durable. I prefer the
                    silicone over the apoxy. Will definitely recommend to ALL my
                    friends and family!
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-2">Image</div>
          </div>
          {/* product details */}
          <div className="flex  border-t mt-3 pt-3">
            <h2>Image</h2>
            <h2>Pink</h2>
          </div>
        </div>
        <div className="border rounded-md p-3">
          <div className="grid grid-cols-6 ">
            <div className="col-span-4">
              <div className="space-y-3">
                <div>
                  {/* author name and date */}
                  <div className="space-y-1">
                    <h4 className="text-lg font-semibold">Spencer H.</h4>
                    <p className="text-xs text-[#c0c0c0]">5/17/2024</p>
                  </div>{" "}
                  {/* rating and description */}
                </div>
                <div className="space-y-3">
                  <Rate color="green" size="xs" defaultValue={5} readOnly />
                  <p className="my-2 text-sm whitespace-pre-wrap">
                    Bubbles absolutely loves the beach silicone! It keeps the
                    noise down when he shakes, and is VERY durable. I prefer the
                    silicone over the apoxy. Will definitely recommend to ALL my
                    friends and family!
                  </p>
                </div>
              </div>
            </div>
            <div className="col-span-2">Image</div>
          </div>
          {/* product details */}
          <div className="flex  border-t mt-3 pt-3">
            <h2>Image</h2>
            <h2>Pink</h2>
          </div>
        </div>
      </section>
    </section>
  );
};

export default AllReviewsPage;
