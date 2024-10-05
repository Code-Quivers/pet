import Link from "next/link";
import React from "react";
import { Accordion, Drawer } from "rsuite";
import NavbarProfileDetails from "./NavbarProfileDetails";

const NavbarDrawer = ({ open, setOpen }: any) => {
  return (
    <div>
      <Drawer open={open} onClose={() => setOpen(false)} size={"xs"}>
        <Drawer.Body
          style={{ paddingLeft: 0, paddingRight: 0 }}
          className="!h-[100vh]"
        >
          <div className="flex flex-col justify-between ">
            {/* contents */}
            <div className="w-full h-[80vh] flex flex-col justify-center md:justify-start items-center  md:items-start gap-6 py-10 !px-2">
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
                      href="/"
                    >
                      {" "}
                      Home{" "}
                    </Link>
                    <Link
                      onClick={() => setOpen(false)}
                      className="text-xl text-gray-900 transition hover:text-gray-900/75"
                      href="/about-us"
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
                      href="/reviews"
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
                      <Accordion.Panel>
                        <div>
                          <h2>help</h2>
                        </div>
                      </Accordion.Panel>
                    </Link>
                  </div>
                </Accordion.Panel>
              </Accordion>
            </div>
            {/* bottom */}

            <div className="w-full sticky ">
              <NavbarProfileDetails setOpen={setOpen} />
            </div>
          </div>
        </Drawer.Body>
      </Drawer>
    </div>
  );
};

export default NavbarDrawer;
