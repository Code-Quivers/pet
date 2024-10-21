"use client";

import { useState } from "react";
import { IoHomeOutline } from "react-icons/io5";

const DashboardSidebarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <section className="flex flex-col justify-between h-full p-5">
      <div className="grid h-full grid-flow-row grid-rows-8">
        <div className="row-span-1">E.T. Home</div>
        <div className="row-span-6 h-full">
          <div className="space-y-1">
            {/* section title */}
            <div>
              <p className="text-xs text-body">Main Menu</p>
            </div>
            <div className="p-1">
              <button className="flex items-center gap-3">
                <span>
                  <IoHomeOutline />
                </span>{" "}
                <span>Home</span>
              </button>
            </div>
            <div className="p-1">
              <button className="flex items-center gap-3" onClick={toggleMenu}>
                <span>
                  <IoHomeOutline />
                </span>
                <span>Products</span>
              </button>

              {/* Submenu */}
              <div
                className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                  isOpen ? "max-h-40" : "max-h-0"
                }`}
              >
                <div className="mt-2 space-y-2">
                  <a
                    href="#item1"
                    className="block text-gray-700 hover:text-blue-600"
                  >
                    Product 1
                  </a>
                  <a
                    href="#item2"
                    className="block text-gray-700 hover:text-blue-600"
                  >
                    Product 2
                  </a>
                  <a
                    href="#item3"
                    className="block text-gray-700 hover:text-blue-600"
                  >
                    Product 3
                  </a>
                </div>
              </div>
            </div>
            <div className="p-1">
              <button className="flex items-center gap-3">
                <span>
                  <IoHomeOutline />
                </span>{" "}
                <span>Category</span>
              </button>
            </div>
            <div className="p-1">
              <button className="flex items-center gap-3">
                <span>
                  <IoHomeOutline />
                </span>{" "}
                <span>Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>logout</div>
    </section>
  );
};

export default DashboardSidebarMenu;
