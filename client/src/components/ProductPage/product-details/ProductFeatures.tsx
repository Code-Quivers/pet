import { HiOutlineLocationMarker } from "react-icons/hi";
import { TbLock, TbUserPentagon } from "react-icons/tb";
import { TiContacts } from "react-icons/ti";

const ProductFeatures = () => {
  return (
    <div className="max-lg:px-3 w-full items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-0 max-lg:gap-x-5  mb-10 gap-y-5  ">
      <div className="flex lg:flex-col max-lg:bg-[#f3f3f3] rounded-full lg:justify-center items-center gap-3 md:gap-5 ">
        <div className="bg-[#e0dfdf] p-4 sm:p-5 md:p-6 rounded-full">
          <TbUserPentagon size={50} className=" text-[#111111]" />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-[#1a1a1a]">
            Customizable Profile
          </h4>
        </div>
      </div>{" "}
      <div className="flex lg:flex-col max-lg:bg-[#f3f3f3] rounded-full lg:justify-center items-center gap-3 md:gap-5 ">
        <div className="bg-[#e0dfdf] p-4 sm:p-5 md:p-6 rounded-full">
          <TiContacts size={50} fill="#111111" />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-[#1a1a1a]">
            Unlimited Contact Info
          </h4>
        </div>
      </div>
      <div className="flex lg:flex-col max-lg:bg-[#f3f3f3] rounded-full lg:justify-center items-center gap-3 md:gap-5 ">
        <div className="bg-[#e0dfdf] p-4 sm:p-5 md:p-6 rounded-full">
          <HiOutlineLocationMarker size={50} className="text-[#111111]" />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-[#1a1a1a]">GPS Alert</h4>
        </div>
      </div>
      <div className="flex lg:flex-col max-lg:bg-[#f3f3f3] rounded-full lg:justify-center items-center gap-3 md:gap-5 ">
        <div className="bg-[#e0dfdf] p-4 sm:p-5 md:p-6 rounded-full">
          <TbLock size={50} className="text-[#1a1a1a]" />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-[#1a1a1a]">
            Privacy Controls
          </h4>
        </div>
      </div>
    </div>
  );
};

export default ProductFeatures;
