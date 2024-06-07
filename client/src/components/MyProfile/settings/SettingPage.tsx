"use client";

import { FaPencil } from "react-icons/fa6";
import EmailSettingDrawer from "./EmailSettingDrawer";
import { useState } from "react";

const SettingPage = () => {
  const [isOpenEmailEdit, setIsOpenEmailEdit] = useState(false);
  const [isOpenNameEdit, setIsOpenNameEdit] = useState(false);
  const [isOpenPhoneEdit, setIsOpenPhoneEdit] = useState(false);
  //
  const handleCloseEmailEdit = () => setIsOpenEmailEdit(false);
  const handleCloseNameEdit = () => setIsOpenNameEdit(false);
  const handleClosePhoneEdit = () => setIsOpenPhoneEdit(false);
  return (
    <>
      <div className="mt-10">
        <div className="space-y-2 md:space-y-3">
          <h1 className="text-4xl font-bold text-pure_black">Settings</h1>
          <p className="text-[#898c90]">
            Edit your account and security settings.
          </p>
        </div>
        {/*  settings */}
        <div className="mt-10">
          {/* section title */}
          <div>
            <h1 className="text-2xl font-bold text-pure_black">Account</h1>
          </div>
          {/* email */}
          <div className="mt-3  border-t  border-b py-3 flex justify-between  items-center">
            <div>
              <h4 className="text-xl font-bold text-pure_black">Email</h4>
              <p className="text-[#898c90]">shafinur512@gmail.com</p>
            </div>
            <div>
              <button
                onClick={() => setIsOpenEmailEdit(true)}
                type="button"
                className="p-4 hover:bg-gray-200 duration-300 transition-all   rounded-full"
              >
                <FaPencil size={30} />
              </button>
            </div>
          </div>
          {/* Name */}
          <div className="border-b py-3 flex justify-between  items-center">
            <div>
              <h4 className="text-xl font-bold text-pure_black">Name</h4>
              <p className="text-[#898c90]">Shafinur Islam</p>
            </div>
            <div>
              <button
                type="button"
                className="p-4 hover:bg-gray-200 duration-300 transition-all   rounded-full"
              >
                <FaPencil size={30} />
              </button>
            </div>
          </div>
          {/* Phone Number */}
          <div className="border-b py-3 flex justify-between  items-center">
            <div>
              <h4 className="text-xl font-bold text-pure_black">
                Phone Number
              </h4>
              <p className="text-[#898c90]">+1 (555) 555-5555</p>
            </div>
            <div>
              <button
                type="button"
                className="p-4 hover:bg-gray-200 duration-300 transition-all   rounded-full"
              >
                <FaPencil size={30} />
              </button>
            </div>
          </div>
        </div>
        {/* security section title */}
        <div className="mt-10">
          <div>
            <h1 className="text-2xl font-bold text-pure_black">Security</h1>
          </div>
          {/* Phone Number */}
          <div className="border-b border-t mt-3 py-3 flex justify-between  items-center">
            <div>
              <h4 className="text-xl font-bold text-pure_black">Password</h4>
              <p className="text-[#898c90] text-xl">**********</p>
            </div>
            <div>
              <button
                type="button"
                className="p-4 hover:bg-gray-200 duration-300 transition-all   rounded-full"
              >
                <FaPencil size={30} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer */}
      <EmailSettingDrawer
        isOpen={isOpenEmailEdit}
        handleClose={handleCloseEmailEdit}
      />
    </>
  );
};

export default SettingPage;
