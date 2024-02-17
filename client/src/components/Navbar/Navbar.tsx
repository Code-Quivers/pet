"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "../../../public/images/logo/E.T.-Logo.png";
import Link from "next/link";
import { RiMenu2Line } from "react-icons/ri";
import { IoCartOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import NavbarDrawer from "./NavbarDrawer";
import Cart from "../ProductsPage/Cart/Cart";
import SearchModalDrawer from "./SearchModalDrawer";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <header className="bg-primary">
      <NavbarDrawer open={open} setOpen={setOpen} />
      <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} />
      <SearchModalDrawer
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
      />
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <Image
              className="w-60 object-fill"
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
                  onClick={() => setSearchOpen(true)}
                  className="rounded py-2 transition text-white text-3xl"
                >
                  <CiSearch />
                </button>
              </div>
              <div className="block">
                <button
                  onClick={() => setOpen(true)}
                  className="rounded py-2 transition text-white text-3xl"
                >
                  <RiMenu2Line />
                </button>
              </div>
              <div className="block">
                <button
                  onClick={() => setCartOpen(true)}
                  className="rounded py-2 transition text-white text-3xl"
                >
                  <IoCartOutline />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
