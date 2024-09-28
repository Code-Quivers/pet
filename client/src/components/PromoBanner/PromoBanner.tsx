import { useGetAdvertisementQuery } from "@/redux/api/features/adApi";
import Link from "next/link";
import React from "react";
import Marquee from "react-fast-marquee";
import { LuDot } from "react-icons/lu";

const PromoBanner = () => {

  const {data: showAdvertisement, isLoading} = useGetAdvertisementQuery({})

  const activeAds = showAdvertisement?.data?.filter((ad: any) => ad.isActive === true);

  return (
    <div className="">
      {
        activeAds && activeAds.length > 0 && <div className="bg-gray-950">
        <div className=" py-1">
          <Marquee className="text-white" autoFill pauseOnHover>
            {/* <div>
              <p className="ml-3 md:text-center font-medium text-white">
                Buy a<span className="font-semibold"> Backup Buddy</span> and
                use code
                <span className="font-black"> 2FOR1</span> to get a free{" "}
                <span className="font-black">Active band</span>
                <Link href={"/"} className="underline text-white ml-3">
                  Buy Now
                </Link>
                <LuDot size={25} className="inline mx-10" />
              </p>
            </div> */}

<div>
  {isLoading ? (
    <p className="ml-3 md:text-center font-medium text-white">Loading Advertisement</p>
  ) : (
    activeAds.map((ad: any) => (
      <p key={ad.adId} className="ml-3 md:text-center font-medium text-white">
        {ad.adDetails}
        <Link href={"/"} className="underline text-white ml-3">
          Buy Now
        </Link>
        <LuDot size={25} className="inline mx-10" />
      </p>
    ))
  )}
</div>

          </Marquee>
          {/* <div className="md:flex sm:justify-center sm:items-center md:gap-3 text-xs sm:text-base">
            <div>
              <p className="ml-3 md:text-center font-medium text-white">
                Buy a<span className="font-semibold"> Backup Buddy</span> and
                use code
                <span className="font-black"> 2FOR1</span> to get a free{" "}
                <span className="font-black">Active band</span>
                <Link
                  href={"/"}
                  className="underline text-white md:hidden ml-3"
                >
                  Buy Now
                </Link>
              </p>
            </div>
            <button className="max-md:hidden">
              <Link href={"/"} className="underline text-white">
                Buy Now
              </Link>
            </button>
          </div> */}
        </div>
      </div>
      }
    </div>
  );
};

export default PromoBanner;
