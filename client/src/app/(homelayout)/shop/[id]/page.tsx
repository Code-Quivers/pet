import SingleProduct from "@/components/ProductPage/SingleProduct";
import React from "react";

const SingleProductPage = ({ params }: any) => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <SingleProduct params={params} />
    </div>
  );
};

export default SingleProductPage;
