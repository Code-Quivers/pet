import CartPage from "@/components/ProductPage/CartPage";
import React from "react";

const ProductCartPage = () => {
  return (
    <>
      <h1 className="text-3xl md:text-5xl font-semibold text-[#333] pt-8 text-center">
        Cart
      </h1>
      <CartPage />
    </>
  );
};

export default ProductCartPage;
