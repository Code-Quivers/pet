"use client";

import { Input } from "rsuite";

const AddPricing = () => {
  return (
    <div>
      <div>
        <h2 className="text-sm font-medium">Pricing</h2>
      </div>

      {/*  */}
      <div>
        <div>
          <label htmlFor="compareAtPrice" className="text-xs  block my-2 mt-3 ">
            Price
          </label>

          <Input className="w-[50%] border-black/50" placeholder="0.00" />
        </div>

        <div className="flex w-full  gap-5  ">
          <div className=" w-full">
            <div>
              <label
                htmlFor="compareAtPrice"
                className="text-xs  block my-2 mt-3 "
              >
                Cost per item
              </label>

              <Input className="border-black/50" placeholder="0.00" />
            </div>
          </div>
          <div className=" w-full">
            <div>
              <label
                htmlFor="compareAtPrice"
                className="text-xs  block my-2 mt-3 "
              >
                Profit
              </label>

              <Input disabled className="  border-black/50" placeholder="--" />
            </div>
          </div>
          <div className=" w-full">
            <div>
              <label
                htmlFor="compareAtPrice"
                className="text-xs  block my-2 mt-3 "
              >
                Margin
              </label>

              <Input disabled className="  border-black/50" placeholder="--" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPricing;
