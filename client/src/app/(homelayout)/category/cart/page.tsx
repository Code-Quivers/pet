import CartPage from "@/components/ProductPage/CartPage";
import React from "react";

const ProductCartPage = () => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-3xl md:text-5xl font-semibold text-[#333] pt-8 text-center">
        Cart
      </h1>
      <CartPage />
    </div>
  );
};

export default ProductCartPage;
