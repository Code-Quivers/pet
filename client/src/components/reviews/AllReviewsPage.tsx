"use client";

import { Rate } from "rsuite";
import ReviewSortBy from "./ReviewSortBy";

const AllReviewsPage = () => {
  return (
    <section className="md:max-w-7xl mx-5 xl:mx-auto ">
      {/* section title */}
      <div className="my-20  max-w-lg lg:mx-auto mx-4">
        <h1 className="text-4xl text-center font-semibold">
          Read trusted reviews from our customers
        </h1>
      </div>

      {/* total and filter */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
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
      <section className="grid sm:grid-cols-2 gap-5 mt-10">
        <div className="border rounded-md p-5 shadow">
          {" "}
          <Rate color="green" size="xs" defaultValue={5} readOnly />
          <h1 className="text-2xl font-bold mt-2">Shafin Chowdhury</h1>
          <p className="my-2">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates
            assumenda repellendus pariatur. Ratione beatae tempora pariatur
            inventore, quod unde accusantium
          </p>
          <h6 className="font-medium">Managing Director</h6>
        </div>
      </section>
    </section>
  );
};

export default AllReviewsPage;
