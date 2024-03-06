"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AutoComplete, Input, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";

const BlogPage = () => {
  const styles = {
    width: 300,
    marginBottom: 10,
  };
  const data = [
    "Eugenia",
    "Bryan",
    "Linda",
    "Nancy",
    "Lloyd",
    "Alice",
    "Julia",
    "Albert",
    "Louisa",
    "Lester",
    "Lola",
    "Lydia",
    "Hal",
    "Hannah",
    "Harriet",
    "Hattie",
    "Hazel",
    "Hilda",
  ];
  return (
    <div className="flex flex-col">
      <div className="py-8">
        <div className="mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Blog Title Here
          </h1>
          <p className="text-gray-600">Published on April 4, 2023</p>
        </div>
      </div>
      <div className="bg-white py-8">
        <div className="container mx-auto  flex flex-col md:flex-row">
          <div className="w-full md:w-2/3">
            <img
              src="https://images.unsplash.com/photo-1506157786151-b8491531f063"
              alt="Blog Featured Image"
              className="mb-8"
            />
            <div className="prose max-w-none">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                facilisi. Sed sit amet feugiat eros, eget eleifend dolor. Proin
                maximus bibendum felis, id fermentum odio vestibulum id. Sed ac
                ligula eget dolor consequat tincidunt. Nullam fringilla ipsum et
                ex lacinia, at bibendum elit posuere. Aliquam eget leo nec nibh
                mollis consectetur.
              </p>
              <p>
                Suspendisse potenti. Mauris euismod, magna sit amet aliquam
                dapibus, ex sapien porta nisl, vel auctor orci velit in risus.
                Fusce gravida bibendum dui, id volutpat felis dignissim a. Duis
                sagittis, arcu ac convallis bibendum, neque dolor suscipit
                dolor, non malesuada magna orci a mauris. Proin sollicitudin
                diam eu enim tincidunt dapibus. Aliquam pharetra purus mauris,
                id lacinia mi malesuada ut. Integer dignissim, urna nec
                scelerisque feugiat, lacus sapien tincidunt sem, sed luctus enim
                libero vel nunc. Vivamus ornare, felis quis feugiat luctus, orci
                justo auctor urna, et elementum orci dolor ac ante. Ut varius
                sapien nec fringilla sodales. Suspendisse lacinia, metus eu
                suscipit lobortis, enim sapien commodo sapien, non facilisis
                urna elit eget elit.
              </p>
              <p>
                Nulla facilisi. Sed venenatis pretium ante, sed tempor turpis
                sagittis ac. Pellentesque habitant morbi tristique senectus et
                netus et malesuada fames ac turpis egestas. Integer vel diam
                arcu. Maecenas bibendum efficitur ex sit amet tristique. Nulla
                vel sapien euismod, bibendum velit id, facilisis magna. Sed
                vestibulum nisi vitae justo congue, eu bibendum augue interdum.
                Nam quis orci nec nulla posuere facilisis. Etiam feugiat ligula
                quis est auctor, et sagittis orci elementum. Vestibulum ante
                ipsum primis in faucibus orci luctus et ultrices posuere cubilia
                Curae; Sed gravida neque vel tellus volutpat, vel laoreet lacus
                commodo. Vivamus quis enim leo.
              </p>
            </div>
          </div>
          <div className="w-full md:w-1/3 md:pl-4 md:mt-0 mt-8">
            <div className="md:px-4">
              <InputGroup inside style={styles} className="!w-full" size="lg">
                <AutoComplete
                  data={data}
                  size="lg"
                  placeholder="Type and hit enter..."
                />
                <InputGroup.Button tabIndex={-1}>
                  <SearchIcon />
                </InputGroup.Button>
              </InputGroup>
            </div>
            <div className="md:pl-4 pt-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2">
                Recent Posts
              </h2>
              <ul className="list-none">
                <li className="flex justify-between items-center mb-6 hover:bg-gray-100 p-2 hover:p-2 hover:rounded-md transition-all ease-in-out hover:scale-105">
                  <a
                    href="/blog"
                    className="text-gray-800 font-bold hover:text-gray-900 hover:underline transition-shadow ease-in-out"
                  >
                    How a visual artist redefines success in graphic design
                    <br />
                    <small className="text-gray-400">April 09, 2022</small>
                  </a>

                  <Link href="/blog">
                    <Image
                      className="shadow-md rounded-lg bg-slate-50 w-40"
                      src="https://tailwindcss.com/_next/static/media/headlessui@75.c1d50bc1.jpg"
                      alt=""
                      width={80}
                      height={80}
                    />
                  </Link>
                </li>
                <li className="flex justify-between items-center mb-6 hover:bg-gray-100 p-2 hover:p-2 hover:rounded-md transition-all ease-in-out hover:scale-105">
                  <a
                    href="/blog"
                    className="text-gray-800 font-bold hover:text-gray-900 hover:underline transition-shadow ease-in-out"
                  >
                    How a visual artist redefines success in graphic design
                    <br />
                    <small className="text-gray-400">April 09, 2022</small>
                  </a>

                  <Link href="/blog">
                    <Image
                      className="shadow-md rounded-lg bg-slate-50 w-40"
                      src="https://tailwindcss.com/_next/static/media/headlessui@75.c1d50bc1.jpg"
                      alt=""
                      width={80}
                      height={80}
                    />
                  </Link>
                </li>
                <li className="flex justify-between items-center mb-6 hover:bg-gray-100 p-2 hover:p-2 hover:rounded-md transition-all ease-in-out hover:scale-105">
                  <a
                    href="/blog"
                    className="text-gray-800 font-bold hover:text-gray-900 hover:underline transition-shadow ease-in-out"
                  >
                    How a visual artist redefines success in graphic design
                    <br />
                    <small className="text-gray-400">April 09, 2022</small>
                  </a>

                  <Link href="/blog">
                    <Image
                      className="shadow-md rounded-lg bg-slate-50 w-40"
                      src="https://tailwindcss.com/_next/static/media/headlessui@75.c1d50bc1.jpg"
                      alt=""
                      width={80}
                      height={80}
                    />
                  </Link>
                </li>
                <li className="flex justify-between items-center mb-6 hover:bg-gray-100 p-2 hover:p-2 hover:rounded-md transition-all ease-in-out hover:scale-105">
                  <a
                    href="/blog"
                    className="text-gray-800 font-bold hover:text-gray-900 hover:underline transition-shadow ease-in-out"
                  >
                    How a visual artist redefines success in graphic design
                    <br />
                    <small className="text-gray-400">April 09, 2022</small>
                  </a>

                  <Link href="/blog">
                    <Image
                      className="shadow-md rounded-lg bg-slate-50 w-40"
                      src="https://tailwindcss.com/_next/static/media/headlessui@75.c1d50bc1.jpg"
                      alt=""
                      width={80}
                      height={80}
                    />
                  </Link>
                </li>
                <li className="flex justify-between items-center mb-6 hover:bg-gray-100 p-2 hover:p-2 hover:rounded-md transition-all ease-in-out hover:scale-105">
                  <a
                    href="/blog"
                    className="text-gray-800 font-bold hover:text-gray-900 hover:underline transition-shadow ease-in-out"
                  >
                    How a visual artist redefines success in graphic design
                    <br />
                    <small className="text-gray-400">April 09, 2022</small>
                  </a>

                  <Link href="/blog">
                    <Image
                      className="shadow-md rounded-lg bg-slate-50 w-40"
                      src="https://tailwindcss.com/_next/static/media/headlessui@75.c1d50bc1.jpg"
                      alt=""
                      width={80}
                      height={80}
                    />
                  </Link>
                </li>
                <li className="flex justify-between items-center mb-6 hover:bg-gray-100 p-2 hover:p-2 hover:rounded-md transition-all ease-in-out hover:scale-105">
                  <a
                    href="/blog"
                    className="text-gray-800 font-bold hover:text-gray-900 hover:underline transition-shadow ease-in-out"
                  >
                    How a visual artist redefines success in graphic design
                    <br />
                    <small className="text-gray-400">April 09, 2022</small>
                  </a>

                  <Link href="/blog">
                    <Image
                      className="shadow-md rounded-lg bg-slate-50 w-40"
                      src="https://tailwindcss.com/_next/static/media/headlessui@75.c1d50bc1.jpg"
                      alt=""
                      width={80}
                      height={80}
                    />
                  </Link>
                </li>
                <li className="flex justify-between items-center mb-6 hover:bg-gray-100 p-2 hover:p-2 hover:rounded-md transition-all ease-in-out hover:scale-105">
                  <a
                    href="/blog"
                    className="text-gray-800 font-bold hover:text-gray-900 hover:underline transition-shadow ease-in-out"
                  >
                    How a visual artist redefines success in graphic design
                    <br />
                    <small className="text-gray-400">April 09, 2022</small>
                  </a>

                  <Link href="/blog">
                    <Image
                      className="shadow-md rounded-lg bg-slate-50 w-40"
                      src="https://tailwindcss.com/_next/static/media/headlessui@75.c1d50bc1.jpg"
                      alt=""
                      width={80}
                      height={80}
                    />
                  </Link>
                </li>
              </ul>
            </div>

            <div className="md:p-4 mt-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2">
                Categories
              </h2>
              <ul className="pl-8">
                <li className="mb-2 list-disc">
                  <a
                    href="#"
                    className="text-gray-800 font-semibold hover:text-gray-900 hover:underline transition-all ease-in-out hover:pl-2"
                  >
                    Buddy Band
                  </a>
                </li>
                <li className="mb-2 list-disc">
                  <a
                    href="#"
                    className="text-gray-800 font-semibold hover:text-gray-900 hover:underline transition-all ease-in-out hover:pl-2"
                  >
                    Active Band
                  </a>
                </li>
                <li className="mb-2 list-disc">
                  <a
                    href="#"
                    className="text-gray-800 font-semibold hover:text-gray-900 hover:underline transition-all ease-in-out hover:pl-2"
                  >
                    E.C.E Band
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
