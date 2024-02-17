import Link from "next/link";
import React from "react";
import { Accordion, Drawer, Placeholder } from "rsuite";

const NavbarDrawer = ({ open, setOpen }: any) => {
  return (
    <div>
      <Drawer open={open} onClose={() => setOpen(false)} size={"xs"}>
        <Drawer.Body style={{ paddingLeft: 0, paddingRight: 0 }}>
          <div className="flex flex-col justify-center md:justify-start items-center  md:items-start bg-white gap-6 p-10">
            <Accordion className="!w-full !p-0 !m-0">
              <Accordion.Panel
                defaultExpanded
                className="!text-2xl"
                header={
                  <div className="text-2xl text-gray-900 transition hover:text-gray-900/75">
                    Welcome
                  </div>
                }
              >
                <div className="flex flex-col gap-4">
                  <Link
                    onClick={() => setOpen(false)}
                    className="text-xl text-gray-900 transition hover:text-gray-900/75"
                    href="#"
                  >
                    {" "}
                    Home{" "}
                  </Link>
                  <Link
                    onClick={() => setOpen(false)}
                    className="text-xl text-gray-900 transition hover:text-gray-900/75"
                    href="#"
                  >
                    {" "}
                    About Us{" "}
                  </Link>
                </div>
              </Accordion.Panel>
              <Accordion.Panel
                className="!text-2xl"
                header={
                  <div className="text-2xl text-gray-900 transition hover:text-gray-900/75">
                    Shop
                  </div>
                }
              >
                <div className="flex flex-col gap-4">
                  <Link
                    onClick={() => setOpen(false)}
                    className="text-xl text-gray-900 transition hover:text-gray-900/75"
                    href="#"
                  >
                    {" "}
                    Backup Buddy{" "}
                  </Link>
                  <Link
                    onClick={() => setOpen(false)}
                    className="text-xl text-gray-900 transition hover:text-gray-900/75"
                    href="#"
                  >
                    {" "}
                    I.C.E{" "}
                  </Link>
                  <Link
                    onClick={() => setOpen(false)}
                    className="text-xl text-gray-900 transition hover:text-gray-900/75"
                    href="#"
                  >
                    {" "}
                    Active{" "}
                  </Link>
                </div>
              </Accordion.Panel>
              <Accordion.Panel
                className="!text-2xl"
                header={
                  <div className="text-2xl text-gray-900 transition hover:text-gray-900/75">
                    Support
                  </div>
                }
              >
                <div className="flex flex-col gap-4">
                  <Link
                    onClick={() => setOpen(false)}
                    className="text-xl text-gray-900 transition hover:text-gray-900/75"
                    href="#"
                  >
                    {" "}
                    Reviews{" "}
                  </Link>
                  <Link
                    onClick={() => setOpen(false)}
                    className="text-xl text-gray-900 transition hover:text-gray-900/75"
                    href="#"
                  >
                    {" "}
                    Support{" "}
                  </Link>
                </div>
              </Accordion.Panel>
            </Accordion>

            {/* <Link
              onClick={() => setOpen(false)}
              className="text-2xl text-gray-900 transition hover:text-gray-900/75"
              href="#"
            >
              {" "}
              Reviews{" "}
            </Link>
            <Link
              onClick={() => setOpen(false)}
              className="text-2xl text-gray-900 transition hover:text-gray-900/75"
              href="#"
            >
              {" "}
              Support{" "}
            </Link>
            <Link
              onClick={() => setOpen(false)}
              className="text-2xl text-gray-900 transition hover:text-gray-900/75"
              href="#"
            >
              {" "}
              Blog{" "}
            </Link> */}
          </div>
        </Drawer.Body>
      </Drawer>
    </div>
  );
};

export default NavbarDrawer;
