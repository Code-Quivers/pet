"use client";

import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { HiPlus } from "react-icons/hi";
import { Input, SelectPicker } from "rsuite";

const Variants = () => {
  const data = ["Size", "Color", "Style"].map((item) => ({
    label: item,
    value: item,
  }));

  // state manage
  const [variants, setVariants] = useState([]);

  const addVariant = () => {
    const newVariants = [...variants, { optionName: "", optionValues: [""] }];
    setVariants(newVariants);
  };

  const removeVariant = (index) => {
    const newVariants = [...variants];
    newVariants.splice(index, 1);
    setVariants(newVariants);
  };

  const handleOptionNameChange = (index, value) => {
    const newVariants = [...variants];
    newVariants[index].optionName = value;
    setVariants(newVariants);
  };

  const handleOptionValueChange = (variantIndex, valueIndex, value) => {
    const newVariants = [...variants];
    newVariants[variantIndex].optionValues[valueIndex] = value;
    setVariants(newVariants);
  };

  const addOptionValue = (variantIndex) => {
    const newVariants = [...variants];
    newVariants[variantIndex].optionValues.push("");
    setVariants(newVariants);
  };

  const removeOptionValue = (variantIndex, valueIndex) => {
    const newVariants = [...variants];
    newVariants[variantIndex].optionValues.splice(valueIndex, 1);
    setVariants(newVariants);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <>
      <section className="my-5 py-4 bg-white border rounded-xl">
        <div>
          <p className="font-semibold text-sm border-b px-4 pb-4">Variants</p>
        </div>

        {variants?.map((variant, variantIndex) => (
          <div
            key={variantIndex}
            className={`${variantIndex === 2 ? "" : "border-b"}`}
          >
            {/* option name */}
            <div className="px-5 pt-3">
              <label htmlFor="" className="text-sm font-medium ">
                Option name
              </label>
              <div className="flex items-center gap-5">
                <SelectPicker
                  defaultValue={data[0]}
                  style={{
                    width: "100%",
                  }}
                  onChange={handleChange}
                  data={data}
                />
                <RiDeleteBinLine
                  onClick={() => removeVariant(variantIndex)}
                  size={20}
                  className="hover:text-red-600 cursor-pointer"
                />
              </div>
            </div>

            {/* option values */}
            <div className="px-6 pt-3">
              {variant.optionValues?.length > 0 && (
                <label htmlFor="" className="block text-sm">
                  Option values
                </label>
              )}
              {variant.optionValues.map((value, valueIndex) => (
                <>
                  <div className="flex  gap-5" key={valueIndex}>
                    <Input
                      onChange={(value) =>
                        handleOptionValueChange(variantIndex, valueIndex, value)
                      }
                      placeholder="add something..."
                      className="w-[95%] mb-2"
                      value={value?.value}
                    />
                    <RiDeleteBinLine
                      onClick={() =>
                        removeOptionValue(variantIndex, valueIndex)
                      }
                      size={20}
                      className={`${
                        valueIndex < 0
                          ? "hidden"
                          : "hover:text-red-600 cursor-pointer block mt-1"
                      }`}
                    />
                  </div>
                </>
              ))}
              <div className=" flex flex-col justify-start items-start  my-2">
                <button
                  onClick={() => addOptionValue(variantIndex)}
                  className="text-sm mb-2 text-blue-600 inline-block cursor-pointer hover:underline-offset-2 hover:underline"
                >
                  <HiPlus className="inline-block" /> Add option value
                </button>{" "}
                {variant.optionValues.length > 0 && (
                  <button className="border text-xs px-4 py-2 rounded-lg text-slate-500 font-semibold shadow doneButton ">
                    Done
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {variants.length < 3 && (
          <span
            onClick={addVariant}
            className="px-4 pt-5 text-[#3f84de] text-sm inline-block cursor-pointer hover:underline-offset-2 hover:underline"
          >
            <HiPlus className="inline-block" /> Add options size or color
          </span>
        )}
      </section>
    </>
  );
};

export default Variants;
