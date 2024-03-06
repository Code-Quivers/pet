import SingleProduct from "@/components/ProductPage/SingleProduct";
import React from "react";

const SingleProductPage = ({ params }: any) => {
  return (
    <div>
      <SingleProduct params={params} />
    </div>
  );
};

export default SingleProductPage;
