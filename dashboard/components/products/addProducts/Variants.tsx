"use client";

import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { HiPlus } from "react-icons/hi";
import { InputNumber, InputPicker, SelectPicker } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { addVariant } from "@/redux/features/slice/variantsSlice";
import { Controller, set, useForm } from "react-hook-form";

const Variants = () => {
  const dispatch = useDispatch();
  // const { productVariations } = useSelector((state: any) => state?.variants);
  const [productVariations, setProductVariations] = useState<any>([]);
  const { control } = useForm();

  const handleVariant = (value: any, variantIndex: number, fieldName: any) => {
    const updatedProductVariations = [...productVariations];
    updatedProductVariations[variantIndex][fieldName] = value;
    setProductVariations(updatedProductVariations);
    console.log(productVariations);
  };

  const data = ["Red", "Green", "Pink", "Blue"].map((item) => ({
    label: item,
    value: item,
  }));
  const sizeData = ["Small", "Large", "Medium"].map((item) => ({
    label: item,
    value: item,
  }));

  return (
    <>
      <section className="my-5 py-4 bg-white border rounded-xl">
        <div>
          <p className="font-semibold text-sm border-b px-4 pb-4">Variants</p>
        </div>

        {productVariations?.map((variant: any, variantIndex: number) => (
          <div
            key={variantIndex}
            className={`${variantIndex === 2 ? "" : "border-b"} px-5 my-3`}
          >
            <div className="flex gap-7 mb-2">
              {/* Color name */}
              <div className="w-full">
                <label htmlFor="color">Color</label>
                <Controller
                  control={control}
                  name="color"
                  render={({ field }) => (
                    <div>
                      <InputPicker
                        creatable
                        className="w-full mt-1"
                        onChange={(value) => {
                          field.onChange(value);
                          handleVariant(value, variantIndex, "color");
                          // productVariations[variantIndex].color = value;
                          // setProductVariations(productVariations);
                          // console.log(productVariations);
                        }}
                        data={data}
                      />
                    </div>
                  )}
                />
              </div>
              {/* Size values */}
              <div className="w-full">
                <label htmlFor="" className="">
                  Size
                </label>
                <div className="">
                  <Controller
                    control={control}
                    name="size"
                    render={({ field }) => (
                      <InputPicker
                        data={sizeData}
                        className="w-full mt-1"
                        onChange={(value) => {
                          field.onChange(value);
                          handleVariant(value, variantIndex, "size");
                        }}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-7 mb-5">
              <div className="w-full">
                <label htmlFor="stock">Stock</label>
                <Controller
                  name="stock"
                  control={control}
                  render={({ field }) => (
                    <InputNumber
                      max={100}
                      min={1}
                      className="w-full mt-1"
                      placeholder="Stock"
                      onChange={(value) => {
                        field.onChange(value);
                        handleVariant(value, variantIndex, "stock");
                      }}
                    />
                  )}
                />
              </div>
              <div className="w-full">
                <label htmlFor="stock">Variant Price</label>
                <Controller
                  name="price"
                  control={control}
                  render={({ field }) => (
                    <InputNumber
                      max={100}
                      min={1}
                      className="w-full mt-1"
                      placeholder="Price"
                      onChange={(value) => {
                        field.onChange(value);
                        handleVariant(value, variantIndex, "price");
                      }}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        ))}

        <span
          onClick={() => {
            setProductVariations([
              ...productVariations,
              {
                color: "",
                size: "",
                stock: "",
                price: "",
              },
            ]);
          }}
          className="px-4 pt-5 text-[#3f84de] text-sm inline-block cursor-pointer hover:underline-offset-2 hover:underline"
        >
          <HiPlus className="inline-block" /> Add options size or color
        </span>
      </section>
    </>
  );
};

export default Variants;
