import React from "react";
import { SelectPicker } from "rsuite";
import { Uploader } from "rsuite";
import CameraRetroIcon from "@rsuite/icons/legacy/CameraRetro";

const SecondStep = () => {
  const data = ["Boy", "Girl"].map((item) => ({ label: item, value: item }));

  return (
    <div className="text-center py-10">
      <h2 className="text-center text-4xl font-bold">Create New Kid</h2>
      <p className="pt-2 text-lg text-gray-500 w-3/4 md:w-3/6 mx-auto">
        Step two: Enter information about your kid.
      </p>
      <form action="#" className="mt-10 max-w-4xl mx-auto px-5">
        {/* pet name and pet age */}
        <div className="w-full text-center my-10">
          <h2 className="text-lg block mb-2"> Upload Kid Photo</h2>
          <Uploader
            multiple
            listType="picture"
            action="//jsonplaceholder.typicode.com/posts/"
          >
            <button>
              <CameraRetroIcon />
            </button>
          </Uploader>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 pb-4">
          <div className="w-full text-start">
            <label className="text-base block mb-2">Enter name</label>
            <div className="relative flex items-center mx-auto ">
              <input
                name="name"
                type="text"
                required
                className="w-full bg-transparent text-sm border shadow-sm border-gray-400 focus:border-cyan-400 px-2 py-3 outline-none rounded-lg"
                placeholder="Enter kid name"
              />
            </div>
          </div>

          {/* pet age */}
          <div className="w-full text-start">
            <label className="text-base block mb-2">Kid age</label>
            <div className="relative flex items-center mx-auto ">
              <input
                name="age"
                type="date"
                required
                className="w-full removeDownIcon bg-transparent text-sm shadow-sm border border-gray-400 focus:border-cyan-400 px-2 py-3 outline-none rounded-lg"
                placeholder="Date of birth"
              />
              <div className="absolute inset-y-0 sm:hidden right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400 transform rotate-90"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        {/* Contact person Information */}
        <div className="text-center py-10">
          <h2 className="text-xl font-semibold pb-2">My Contact</h2>
          <p className="text-sm text-gray-500">
            Add your contact Information as much as you want
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 pb-4">
          {/* contact person name */}
          <div className="w-full text-start">
            <label className="text-base block mb-2">Name</label>
            <div className="relative flex items-center mx-auto ">
              <input
                name="contactName"
                type="text"
                required
                placeholder="Contact person name"
                className="w-full bg-transparent text-sm shadow-sm border border-gray-400 focus:border-cyan-400 px-2 py-3 outline-none rounded-lg"
              />
            </div>
          </div>

          {/* contact person relation */}
          <div className="w-full text-start">
            <label className="text-base block mb-2">Relation name</label>
            <div className="relative flex items-center mx-auto ">
              <input
                name="contactRelation"
                type="text"
                required
                placeholder="Contact person relation"
                className="w-full bg-transparent text-sm shadow-sm border border-gray-400 focus:border-cyan-400 px-2 py-3 outline-none rounded-lg"
              />
            </div>
          </div>
          <div className="w-full text-start">
            <label className="text-base block mb-2">Cell number</label>
            <div className="relative flex items-center mx-auto">
              <input
                name="cellNumber"
                type="tel"
                required
                placeholder="Contact person number"
                className="w-full bg-transparent text-sm shadow-sm border border-gray-400 focus:border-cyan-400 px-2 py-3 outline-none rounded-lg"
              />
            </div>
          </div>
        </div>
        <div className="text-start py-2 hover:underline cursor-pointer text-lg">
          Add new contact
        </div>
      </form>
    </div>
  );
};

export default SecondStep;
