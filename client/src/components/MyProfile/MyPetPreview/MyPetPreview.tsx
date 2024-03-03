import Image from "next/image";
import React from "react";
import myPetImage from "../../../../public/images/myaccount/mypet.png";
import { FiPhone } from "react-icons/fi";
import { AiOutlineMessage } from "react-icons/ai";

const MyPetPreview = () => {
  return (
    <div className="my-10">
      <div className="bg-primary px-10 pt-10 md:pb-20 flex justify-center items-center">
        <div className="bg-white inline-block p-2 rounded-full">
          <Image
            className="rounded-full"
            src={myPetImage}
            width={150}
            height={150}
            alt="pet pic"
          />
        </div>
      </div>
      <div className="bg-white border -mt-10 rounded-tl-[26px] rounded-tr-[26px]">
        <div className="flex justify-between items-center p-4 z-20">
          <div>
            <h2 className="text-3xl font-bold">Brady</h2>
            <h3 className="text-base text-gray-500 ">Golden Retriever</h3>
            <p className="pt-2 text-base text-gray-500 ">
              Brady enjoys long walks on the beach, frequent trips to the park,
              and chasing squirrels!
            </p>
          </div>
          <div>
            <h2>LOGO</h2>
          </div>
        </div>
        {/* pet gender age weight info */}
        <div className="flex justify-between items-center gap-6 p-3">
          <div className="text-center bg-[#E0F1C9] p-5 rounded-2xl">
            <h2 className="text-base text-gray-700 font-bold">Boy</h2>
            <h2 className="text-base text-gray-600">Gender</h2>
          </div>
          <div className="text-center bg-[#FFEFC7] p-5 rounded-2xl">
            <h2 className="text-base text-gray-700 font-bold">8 years</h2>
            <h2 className="text-base text-gray-600">Age</h2>
          </div>
          <div className="text-center bg-[#C2EAFF] p-5 rounded-2xl">
            <h2 className="text-base text-gray-700 font-bold">70 lbs</h2>
            <h2 className="text-base text-gray-600">Weight</h2>
          </div>
        </div>
        {/* pet emergency contact info */}
        <div className="flex justify-between items-center md:gap-6">
          <div className="text-start p-5 rounded-2xl flex justify-between items-center gap-3">
            <div>
              <button className="px-3 py-1.5 bg-[#A1D7F3] rounded-full text-2xl font-extrabold text-[#6BB4DA]">
                D
              </button>
            </div>
            <div>
              <h2 className="text-lg md:text-xl text-gray-700 font-bold">
                Dad
              </h2>
              <h2 className="text-sm md:text-base text-gray-600">
                +1 (555) 555-5555
              </h2>
            </div>
          </div>

          <div className="text-start p-5 rounded-2xl flex justify-between items-center gap-3">
            <button className="bg-primary p-2 rounded-3xl hover:scale-105 transition-all ease-in-out">
              <FiPhone className="text-2xl text-white" />
            </button>
            <button className="bg-black p-2 rounded-3xl hover:scale-105 transition-all ease-in-out">
              <AiOutlineMessage className="text-2xl text-white" />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center md:gap-6">
          <div className="text-start p-5 rounded-2xl flex justify-between items-center gap-3">
            <div>
              <button className="px-3 py-1.5 bg-[#A1D7F3] rounded-full text-2xl font-extrabold text-[#6BB4DA]">
                D
              </button>
            </div>
            <div>
              <h2 className="text-lg md:text-xl text-gray-700 font-bold">
                Mom
              </h2>
              <h2 className="text-sm md:text-base text-gray-600">
                +1 (555) 555-5555
              </h2>
            </div>
          </div>

          <div className="text-start p-5 rounded-2xl flex justify-between items-center gap-3">
            <button className="bg-primary p-2 rounded-3xl hover:scale-105 transition-all ease-in-out">
              <FiPhone className="text-2xl text-white" />
            </button>
            <button className="bg-black p-2 rounded-3xl hover:scale-105 transition-all ease-in-out">
              <AiOutlineMessage className="text-2xl text-white" />
            </button>
          </div>
        </div>
        {/* pet address and map links */}
        <div className="flex justify-between items-center gap-6">
          <div className="text-start p-5 rounded-2xl">
            <div>
              <h2 className="text-xl text-gray-700 font-bold">Home</h2>
              <h2 className="text-base text-gray-600">US</h2>
              <h2 className="text-base text-gray-600">
                1600 Pennsylvania Avenue NW
              </h2>
              <h2 className="text-base text-gray-600">
                Washington Washington DC 20500
              </h2>
            </div>
          </div>
          <div className="text-start p-5 rounded-2xl flex flex-col justify-between items-center gap-3">
            <button className="text-sm bg-[#FFD9D9] px-10 py-1.5 rounded-3xl hover:scale-105 transition-all ease-in-out text-[#E96E6E] w-full">
              Copy
            </button>
            <button className="text-sm bg-[#D7F1FF] px-3 md:px-10 py-1.5 rounded-3xl hover:scale-105 transition-all ease-in-out text-[#4dacdf] md:w-full">
              Open in maps
            </button>
          </div>
        </div>
        {/* Behavior Health Provider information */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 p-4">
          <div className="bg-[#E0F1C9] p-7 w-full h-52 rounded-2xl text-start">
            <h2 className="text-lg text-gray-700 font-bold">Behavior</h2>
            <p className="text-base text-gray-700 py-2">Good with...</p>
            <h2 className="text-base text-gray-600">Kids: Yes</h2>
            <h2 className="text-base text-gray-600">Dogs: Yes</h2>
            <h2 className="text-base text-gray-600">Cats: Yes</h2>
          </div>
          <div className="bg-[#FFEFC7] p-7 w-full h-52 rounded-2xl text-start">
            <h2 className="text-lg text-gray-700 font-bold">Health</h2>
            <h2 className="text-base text-gray-600">Allergies: None</h2>
            <h2 className="text-base text-gray-600">Medicine: None</h2>
            <h2 className="text-base text-gray-600">Neutered/spayed: Yes</h2>
          </div>
          <div className="bg-[#C2EAFF] p-7 w-full h-52 rounded-2xl text-start">
            <h2 className="text-lg text-gray-700 font-bold">Provider</h2>
            <h2 className="text-base text-gray-600">Vet name: Not disclosed</h2>
            <h2 className="text-base text-gray-600">
              Vet phone #: Not disclosed
            </h2>
            <h2 className="text-base text-gray-600">
              Vet license ID: Not disclosed
            </h2>
            <h2 className="text-base text-gray-600">
              Microchip #: Not disclosed
            </h2>
            <h2 className="text-base text-gray-600">
              Rabies ID: Not disclosed
            </h2>
          </div>
        </div>
        <div className="flex justify-between items-center gap-6 p-3">
          <button className="text-lg bg-primary hover:bg-blue-700 transition-all px-3 md:px-10 py-3 rounded-3xl  text-white w-full">
            Notify owner of your location
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyPetPreview;
