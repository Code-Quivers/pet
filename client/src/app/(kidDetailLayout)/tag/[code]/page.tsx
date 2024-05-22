"use client";
import CreateKidForm from "@/components/MyProfile/CreateKidProfile/CreateKidForm";
import { fileUrlKey } from "@/helpers/config/envConfig";
import { useGetKidProfileQuery } from "@/redux/api/features/kids/kidApi";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiPhone } from "react-icons/fi";
import { GrMapLocation } from "react-icons/gr";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { Loader } from "rsuite";

type Props = {
  params: { code: string };
};

const MyPetPage = ({ params }: Props) => {
  const router = useRouter();
  const [searchCode, setSearchCode] = useState("");
  const {
    data: kidDetails,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetKidProfileQuery({
    code: params?.code,
  });

  function formatDuration(start: any, end: any) {
    const duration = moment.duration(moment(end).diff(moment(start)));
    const years = duration.years();
    const months = duration.months();
    const days = duration.days();

    let formattedString = "";

    if (years > 0) {
      formattedString += `${years} year${years > 1 ? "s" : ""} `;
    }

    if (months > 0) {
      formattedString += `${months} month${months > 1 ? "s" : ""} `;
    }

    if (days > 0 && years === 0 && months === 0) {
      formattedString += `${days} day${days > 1 ? "s" : ""}`;
    }

    return formattedString.trim();
  }
  const endDate = new Date().toISOString();

  return (
    <div className="mx-auto max-w-screen-xl   sm:px-6 lg:px-8">
      {isLoading && (
        <div className="min-h-[70vh] flex justify-center items-center">
          <Loader content="Loading Details" size="md" />
        </div>
      )}

      {/* if Error occurred */}
      {!isLoading && isError && !isSuccess && (
        <div className="max-w-2xl mx-auto px-5 max-md:px-3">
          <div className="my-6  flex justify-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold">
              E.T. Phone Home
            </h2>
          </div>

          {/*  */}
          <div className="my-10 flex justify-center text-center ">
            <div className="space-y-3">
              <h2 className="text-xl text-wrap sm:text-3xl font-semibold">
                <span className="  block">E.T. Phone Home with Code</span>
                <span className="  block">{`"${params?.code}"`}</span>
                <span className="  block">
                  {
                    // @ts-ignore
                    error?.message || "Does Not Exist"
                  }
                </span>
              </h2>

              <p className="text-sm sm:text-[13px] text-wrap text-gray-500">
                {`Please make sure to include capital and lowercase letters. For
                example, if the code on the back of the Barcode is 'AbC12', the
                letters 'A' and 'C' need to be capitalized. Try searching for a
                different code below.`}
              </p>
            </div>
          </div>

          {/*  */}
          <div className="space-y-2">
            <label className="text-sm text-gray-500" htmlFor="code">
              Tag Code
            </label>
            <input
              onChange={(e: any) => setSearchCode(e.target.value)}
              name="code"
              type="text"
              className="w-full bg-transparent text-sm border shadow-sm border-gray-400 focus:border-cyan-400 px-2 py-3 outline-none rounded-lg "
            />
            <div className="pt-3">
              <button
                onClick={() => {
                  router.replace(searchCode);
                }}
                type="button"
                className="w-full bg-primary text-white rounded-lg  font-semibold shadow-xl py-2"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      )}

      {/* if no error occurred */}

      {!isLoading && !isError && isSuccess && (
        <>
          {kidDetails?.data?.barcodeStatus === "AVAILABLE" ? (
            <CreateKidForm tag={params.code} />
          ) : (
            <div className="md:max-w-2xl md:mx-auto">
              <div className="bg-primary px-10 py-[30px] md:pb-20 flex justify-center items-center">
                <div className="bg-white inline-block p-2 rounded-full">
                  <Image
                    className="rounded-full w-32 h-32 object-cover"
                    src={
                      kidDetails?.data?.kidImage
                        ? `${fileUrlKey()}/${kidDetails?.data?.kidImage}`
                        : "/images/defaultPhoto.webp"
                    }
                    width={1000}
                    height={1000}
                    alt="pet pic"
                  />
                </div>
              </div>

              <div className="bg-white   -mt-10 rounded-tl-[28px] rounded-tr-[28px] ">
                <div className="flex flex-col justify-center items-center pt-4 z-20">
                  <div className="md:pt-2">
                    <h2 className="text-3xl font-bold">
                      {kidDetails?.data?.firstName} {kidDetails?.data?.lastName}
                    </h2>
                  </div>
                  <div>
                    {/* <h2>{moment(kidDetails?.data?.kidAge).fromNow()}</h2> */}
                    <h2>{formatDuration(kidDetails?.data?.kidAge, endDate)}</h2>
                  </div>
                </div>
                {/* <div className="grid grid-cols-5 p-5 text-center items-center">
                  <div className="text-lg md:text-xl text-gray-700 font-bold">
                    Name
                  </div>
                  <div className="text-lg md:text-xl text-gray-700 font-bold">
                    Relation
                  </div>
                  <div className="text-lg md:text-xl text-gray-700 font-bold">
                    Call
                  </div>
                  <div className="text-lg md:text-xl text-gray-700 font-bold">
                    Text
                  </div>
                  <div className="text-lg md:text-xl text-gray-700 font-bold">
                    GPS
                  </div>
                </div> */}

                <section className="mt-5">
                  <div className="grid grid-cols-12 px-3 text-sm font-bold">
                    <p className="col-span-3">Name</p>
                    <p className="col-span-3">Relationship</p>
                    <p className="col-span-2 text-center">Call</p>
                    <p className="col-span-2 text-center">Text</p>
                    <p className="col-span-2 text-center">Share Gps</p>
                  </div>
                  <div className="grid grid-cols-12 px-3 text-sm mt-2 items-center gap-x-2">
                    {kidDetails?.data?.relations?.length > 0 &&
                      kidDetails?.data?.relations?.map(
                        (relation: any, idx: number) => (
                          <>
                            <p className="col-span-3 py-2">
                              {relation?.firstName} {relation?.lastName}
                            </p>
                            <p className="col-span-3 py-2">
                              {relation?.relation}
                            </p>
                            <div className="col-span-2 text-center py-2">
                              <button className="bg-[#cdf7fece] rounded-md w-9 h-9 transition-all ease-in-out">
                                <span className="flex justify-center text-primary">
                                  <FiPhone size={20} />
                                </span>
                              </button>
                            </div>
                            <div className="py-2 col-span-2 text-center">
                              <button className="bg-[#cdf7fece] rounded-md w-9 h-9 transition-all ease-in-out">
                                <span className="flex justify-center text-primary">
                                  <IoChatboxEllipsesOutline size={20} />
                                </span>
                              </button>
                            </div>
                            <div className="py-2 col-span-2 text-center">
                              <button className="bg-[#cdf7fece] rounded-md w-9 h-9 transition-all ease-in-out">
                                <span className="flex justify-center text-primary">
                                  <GrMapLocation size={20} />
                                </span>
                              </button>
                            </div>
                          </>
                        )
                      )}
                  </div>
                </section>

                {/* kid emergency contact info */}
                {/* {kidDetails?.data?.relations?.map(
                  (relation: any, idx: number) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center md:gap-6"
                    >
                      <div className="text-start px-5 rounded-2xl flex justify-between items-center gap-3">
                        <div>
                          <div className="flex justify-around">
                            <h2 className="text-base line-clamp-1 md:text-xl text-gray-700 font-bold">
                              {relation?.name}
                            </h2>
                          </div>
                          <div>
                            <h2 className="text-base md:text-xl text-gray-700 block md:hidden">
                              {relation?.relation}
                            </h2>
                          </div>
                        </div>
                        <div className="md:block hidden">
                          <h2 className="text-lg md:text-xl text-gray-700 font-bold">
                            {relation?.relation}
                          </h2>
                        </div>
                      </div>

                      <div className="text-start p-5 rounded-2xl flex justify-between items-center gap-3">
                        <button className="bg-[#d4ecf7] p-2.5 rounded-3xl hover:scale-105 transition-all ease-in-out">
                          <FiPhone className="text-lg text-[#1d7296]" />
                        </button>
                        <button className="bg-[#d4ecf7] p-2.5 rounded-3xl hover:scale-105 transition-all ease-in-out">
                          <AiOutlineMessage className="text-lg text-[#1d7296]" />
                        </button>
                        <button className="bg-[#d4ecf7] p-2.5 rounded-3xl hover:scale-105 transition-all ease-in-out">
                          <GrMapLocation className="text-lg text-[#1d7296]" />
                        </button>
                      </div>
                    </div>
                  )
                )} */}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyPetPage;
