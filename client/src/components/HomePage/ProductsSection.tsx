"use client";
import React, { useState } from "react";
// import { CartIcon } from "./svgIcons";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slice/cartSlice";
import { CartIcon } from "./SvgIcons";
import { useGetCategoryQuery } from "@/redux/api/features/categoryApi";
import { useGetProductQuery } from "@/redux/api/features/productApi";
import { fileUrlKey } from "@/helpers/config/envConfig";
import Link from "next/link";
import { set } from "rsuite/esm/utils/dateUtils";
import { Loader, Message, useToaster } from "rsuite";

const ProductsSection = () => {
  const { data } = useGetProductQuery({});
  const products = data?.data;
  const dispatch = useDispatch();
  const toaster = useToaster();
  const [start, setStart] = useState(false);
  const [productId, setProductId] = useState(null);
  console.log(products, "productList");
  const message = (
    <Message
      showIcon
      type="success"
      closable
      as="div"
      className="bg-white"
      style={{ backgroundColor: "white" }}
    >
      <strong>Success!</strong> Product added to cart.
    </Message>
  );
  const addToCartHandler = (product: any) => {
    setProductId(product.productId);
    setStart(true);
    dispatch(addToCart(product) as any);
    setTimeout(() => {
      setStart(false);
      toaster.push(message, {
        placement: "bottomEnd",
        duration: 3000,
      });
    }, 1000);
  };
  return (
    <section className="flex items-center bg-gray-100 mt-10 py-10">
      <div className="p-4 mx-auto max-w-7xl">
        <div className="max-w-xl mx-auto">
          <div className="text-center ">
            <div className="relative flex flex-col items-center">
              <div className="absolute hidden md:block -top-14 left-0 text-[120px] text-gray-400 font-bold opacity-10">
                PRODUCTS
              </div>
              <h1 className="text-5xl font-bold ">
                {" "}
                Our <span className="  text-primary"> Products</span>{" "}
              </h1>
              <div className="flex w-24 mt-1 mb-10 overflow-hidden rounded">
                <div className="flex-1 h-2 bg-blue-200"></div>
                <div className="flex-1 h-2 bg-blue-400"></div>
                <div className="flex-1 h-2 bg-primary"></div>
              </div>
            </div>
            <p className="mb-16 text-base text-center text-gray-500">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus
              magni eius eaque? Pariatur numquam, odio quod nobis ipsum ex
              cupiditate?
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:gap-4 sm:gap-4 md:grid-cols-3">
          {products?.map((product: any) => (
            <div
              key={product.id}
              className="mt-56 bg-white rounded shadow md:w-72"
            >
              <div className="relative z-20 p-6 group">
                <div className="relative block h-64 mb-4 -mt-56 overflow-hidden rounded -top-full ">
                  <div className="relative w-full h-full">
                    <Image
                      width={200}
                      height={200}
                      src={`${fileUrlKey()}/${product?.featuredImage}`}
                      alt={product.productName}
                      className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0 transition-all group-hover:scale-110"
                    />
                    <Image
                      width={200}
                      height={200}
                      src={`${fileUrlKey()}/${product?.featuredImage}`}
                      alt={product.productName}
                      className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 transition-all group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute flex flex-col top-4 right-4">
                    <a href="#" className="flex items-center">
                      <div className="relative flex items-center justify-center p-3 mb-3 transition-all translate-x-20 bg-white rounded group-hover:translate-x-0 wishlist hover:bg-blue-200    group">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-heart"
                          viewBox="0 0 16 16"
                        >
                          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"></path>
                        </svg>
                      </div>
                    </a>
                    {start && productId === product.productId ? (
                      <button
                        className="flex items-center"

                        // onClick={() => dispatch(addToCart(product) as any)}
                      >
                        <div
                          className="relative flex items-center justify-center p-3 mb-3 transition-all translate-x-20 bg-white rounded 
                           group-hover:translate-x-0 wishlist hover:bg-blue-200 group"
                        >
                          <Loader size="sm" />
                        </div>
                      </button>
                    ) : (
                      <button
                        className="flex items-center"
                        onClick={() => addToCartHandler(product)}
                        // onClick={() => dispatch(addToCart(product) as any)}
                      >
                        <div
                          className="relative flex items-center justify-center p-3 mb-3 transition-all translate-x-20 bg-white rounded 
                       group-hover:translate-x-0 wishlist hover:bg-blue-200 group"
                        >
                          <CartIcon />
                          {/* {start && productId === product.productId ? (
                          <Loader size="sm" />
                        ) : (
                          <CartIcon />
                        )} */}
                        </div>
                      </button>
                    )}
                  </div>
                </div>
                <Link href={`/shop/single-product/${product?.productId}`}>
                  <h2 className="mb-2 text-xl font-bold text-black  ">
                    {product?.productName}
                  </h2>
                  <p className="mb-3 text-lg font-bold text-primary">
                    <span>${product?.productPrice?.toFixed(2)}</span>
                    {/* <span className="text-xs font-semibold text-gray-400 line-through ">
                    $200.00
                  </span> */}
                  </p>
                  {/* <div className="flex gap-1 text-orange-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-star-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-star-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-star-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-star-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-star"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                    </svg>
                  </div> */}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
