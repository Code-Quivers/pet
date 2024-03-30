"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

import { AutoComplete, InputGroup } from "rsuite";
import SearchIcon from "@rsuite/icons/Search";

const SingleBlogSidebar = () => {
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
    <>
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
              {/* <Image
                className="shadow-md rounded-lg bg-slate-50 w-40"
                src="https://tailwindcss.com/_next/static/media/headlessui@75.c1d50bc1.jpg"
                alt=""
                width={80}
                height={80}
              /> */}
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
    </>
  );
};

export default SingleBlogSidebar;
