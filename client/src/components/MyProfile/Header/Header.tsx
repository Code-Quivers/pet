"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../../../public/images/logo/E.T.-Logo.png";
import Link from "next/link";
import { RiMenu2Line } from "react-icons/ri";
import Cart from "../../ProductsPage/Cart/Cart";
import HeaderDrawer from "./HeaderDrawer";

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-primary">
      <HeaderDrawer open={open} setOpen={setOpen} />
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Image
              className="w-60 object-cover"
              src={logo}
              width={100}
              height={100}
              alt=""
            />
          </div>
          <div className="md:flex md:items-center md:gap-12">
            <div className="flex items-center gap-4">
              <div className="block">
                <button
                  onClick={() => setOpen(true)}
                  className="rounded py-2 transition text-white text-3xl"
                >
                  <RiMenu2Line />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
