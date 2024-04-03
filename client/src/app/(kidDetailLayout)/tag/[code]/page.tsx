import { fileUrlKey, getBaseUrl } from "@/helpers/config/envConfig";
import { Metadata } from "next";
import Image from "next/image";
import { AiOutlineMessage } from "react-icons/ai";
import { FiPhone } from "react-icons/fi";
import { GiGps } from "react-icons/gi";

const url = getBaseUrl();

async function getData(id: string) {
  const res = await fetch(`${url}/tag/${id}`, {
    next: {
      tags: ["blogs"],
      revalidate: 100,
    },
  });

  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error("Failed to fetch data");
  // }

  return res.json();
}

type Props = {
  params: { code: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const kidDetails = await getData(params.code);
  return {
    title: `${kidDetails?.data?.kidName} - E.T`,
  };
}

const MyPetPage = async ({ params }: Props) => {
  const kidDetails = await getData(params.code);
  return (
    <div className="mx-auto max-w-screen-xl  sm:px-6 lg:px-8">
      <div className=" md:max-w-2xl md:mx-auto">
        <div className="bg-primary px-10 py-20  md:pb-20 flex justify-center items-center">
          <div className="bg-white inline-block p-2 rounded-full">
            <Image
              className="rounded-full"
              src={`${fileUrlKey()}/${kidDetails?.data?.kidImage}`}
              width={120}
              height={120}
              alt="pet pic"
            />
          </div>
        </div>
        <div className="bg-white border -mt-10 rounded-tl-[26px] rounded-tr-[26px]">
          <div className="flex flex-col justify-center items-center p-4 z-20">
            <div className="md:pt-2 pt-10">
              <h2 className="text-3xl font-bold">
                {kidDetails?.data?.kidName}
              </h2>
            </div>
            <div>
              <h2>Age: {kidDetails?.data?.kidAge}</h2>
            </div>
          </div>

          {/* kid emergency contact info */}
          {kidDetails?.data?.relations?.map((relation: any, idx: number) => (
            <div
              key={idx}
              className="flex justify-between items-center md:gap-6"
            >
              <div className="text-start p-5 rounded-2xl flex justify-between items-center gap-3">
                <div>
                  <button className="px-3 py-1.5 bg-[#A1D7F3] rounded-full text-2xl font-extrabold text-[#6BB4DA]">
                    D
                  </button>
                </div>
                <div>
                  <h2 className="text-lg md:text-xl text-gray-700 font-bold">
                    {relation?.name}
                  </h2>
                  <a className="text-sm md:text-base text-gray-600 md:block hidden">
                    {relation?.phoneNo}
                  </a>
                </div>
                <div>
                  <h2 className="text-lg md:text-xl text-gray-700 font-bold">
                    {relation?.relation}
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
                <button className="bg-black p-2 rounded-3xl hover:scale-105 transition-all ease-in-out">
                  <GiGps className="text-2xl text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPetPage;
