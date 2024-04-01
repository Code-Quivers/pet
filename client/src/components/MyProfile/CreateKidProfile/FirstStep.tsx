"use client";

import { useGetAvailableBarCodeQuery } from "@/redux/api/features/kids/kidApi";
import { useDebounced } from "@/redux/hooks";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";

const FirstStep = ({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<number>>;
}) => {
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState<string>("");
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 100,
  });

  if (!!searchTerm) {
    query["code"] = searchTerm;
  }
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
    watch,
  } = useForm<{
    code: string;
  }>();

  const { data, isLoading, isError, error } = useGetAvailableBarCodeQuery(
    { ...query }
    // {
    //   skip: !searchTerm,
    // }
  );
  console.log("data", debouncedTerm);
  return (
    <div>
      <div>
        <h2 className="text-center text-4xl font-bold">Create New Kid </h2>
        <p className="pt-2 px-4 text-base text-center text-gray-500">
          Step one: Enter the code on the back of your ETPhoneHome. For example,
          <br /> if the link on your ETPhoneHome is etphonehome.co/tag/aBc123,
          your code is aBc123.
        </p>
        <form>
          <div className="mt-5">
            <label className="text-base mb-2 block px-5 font-semibold">
              Type product code
            </label>
            <div className="relative  px-5">
              <input
                onChange={(e) => setSearchTerm(e.target.value)}
                name="email"
                type="text"
                required
                className="w-full bg-transparent font-bold text-md border-2 rounded-lg focus:border-cyan-400 px-3 py-3 outline-none"
                placeholder="Enter code"
              />
              <div className="h-10">
                <span className="mt-2   text-red-600 text-sm">
                  {isError &&
                    error &&
                    // @ts-ignore
                    error?.message}
                </span>
              </div>
            </div>
          </div>
        </form>
        <p className="pt-2 text-sm px-5 text-gray-500 ">
          {`Note: if you're having trouble, simply scan the QR code on the back of
        your E.T.Phone home with your phone's camera (please use your phone's native
        camera app), and follow the link!`}
        </p>
      </div>
      <div className="flex justify-end mt-10">
        <button
          className=" bg-[#29aae1] p-5 text-white hover:bg-[#38addf]  shadow-xl  rounded-full transition-all duration-300 ease-in-out "
          onClick={() => setStep(1)}
          disabled={(!!isError && !!error) || !!isLoading}
        >
          <FaArrowRight size={25} />
        </button>
      </div>
    </div>
  );
};

export default FirstStep;
