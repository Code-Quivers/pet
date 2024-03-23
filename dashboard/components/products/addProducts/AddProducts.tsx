"use client";
import { Controller, useForm } from "react-hook-form";
import AddPricing from "./AddPricing";
import AddProductTextEditor from "./AddProductTextEditor";
import ShowAddVariant from "./ShowAddVariant";
import Variants from "./Variants";
import { Input, SelectPicker } from "rsuite";
import { useState } from "react";
import { useGetCategoryQuery } from "@/redux/features/categoryApi";
import { useDebounced } from "@/redux/hook";
import AddProductUpload from "./AddProductUpload";
import { FileType } from "rsuite/esm/Uploader";

const AddProductsSection = () => {
  const data2 = [
    "Eugenia",
    "Bryan",
    "Linda",
    "Nancy",
    "Lloyd",
    "Alice",
    "Julia",
    "Albert",
  ].map((item) => ({ label: item, value: item }));
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 300,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }
  const { data } = useGetCategoryQuery({ ...query });
  let category = data?.data;
  category = category?.map((item: any) => ({
    label: item?.categoryName,
    value: item?.categoryId,
  }));
  // console.log(category);
  const [productVariations, setProductVariations] = useState<any>([]);
  const { handleSubmit, control } = useForm();

  const handleAddProduct = (data: any) => {
    const formData = new FormData();

    const product = {
      productName: data.title,
      productDescription: data.description,
      categoryId: data.category,
      productPrice: data.productPrice,
      productVariations,
    };
    const obj = JSON.stringify(product);

    // appending files to formData
    data?.productImages?.forEach((file: FileType, index: number) => {
      formData.append("files", file.blobFile as Blob);
    });
    // appending all data to formData
    formData.append("data", obj);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleAddProduct)}>
        <div className="flex gap-5">
          <section className="w-[55%]">
            <h1 className="text-xl mb-1 font-medium">Product information</h1>
            <div className="bg-white border border-[#d1d5db] rounded-xl p-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="title" className="font-medium">
                  Title
                </label>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <input
                      onChange={(e) => field.onChange(e.target.value)}
                      type="text"
                      id="title"
                      className="border focus:outline-none py-1 px-3 rounded-md border-[#d1d5db]"
                      placeholder="Active Band"
                    />
                  )}
                />
              </div>
              <div className="flex flex-col gap-2 w-full mt-3">
                <label htmlFor="title">Description</label>
                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <Input
                      as="textarea"
                      rows={5}
                      placeholder="Description"
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                    />
                  )}
                />
              </div>
              <div className="flex flex-col gap-2 mt-2">
                <label htmlFor="category">Category</label>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <SelectPicker
                        // placement="top"
                        className="w-full"
                        data={category || []}
                        label={undefined}
                        loading={undefined}
                        caretAs={undefined}
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                      />
                    </div>
                  )}
                />
              </div>
            </div>
            {/* Pricing */}
            <h1 className="text-xl mt-3 mb-2 font-medium">Pricing</h1>
            <div className="p-4 bg-white rounded-xl border border-[#d1d5db]">
              <Controller
                control={control}
                name="productPrice"
                render={({ field }) => <AddPricing field={field} />}
              />
            </div>
            <div>
              <h1 className="text-xl mt-3 mb-2 font-medium">Variants</h1>
              <Variants
                productVariations={productVariations}
                setProductVariations={setProductVariations}
              />
            </div>
          </section>
          {/* media */}
          <section className="w-[45%]">
            <h1 className="text-xl mb-1 font-medium">Product Image</h1>
            <aside className="bg-white p-4 border border-[#d1d5db] rounded-xl">
              <div className="">
                <Controller
                  name="productImages"
                  control={control}
                  render={({ field }) => (
                    <AddProductUpload field={field as any} />
                  )}
                />
              </div>
            </aside>
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-white font-medium rounded-md mt-3"
              >
                Add product
              </button>
            </div>
          </section>
        </div>
      </form>
    </div>
  );
};

export default AddProductsSection;

// const product = [
//   {
//     productId: "d9546eb0-46db-4586-8692-2e46b57c4bc9",
//     productName: "Backup Buddy Belt",
//     productImage:
//       "productImg\\1710354002010-349231518_634724704867558_772649301878214380_n.jpg",
//     productPrice: 100,
//     productDescription: "Backup Buddy is a Only brand",
//     productStatus: "AVAILABLE",
//     categoryId: "f24e20d8-f2ac-40f4-bdcb-afdf341f1105",
//     createdAt: "2024-03-13T18:20:02.000Z",
//     updatedAt: "2024-03-13T18:20:02.000Z",

//     productVariations: [
//       {
//         variantId: "9f4092e9-17a4-4e98-a746-a0698f1b7508",
//         barcodeCode: "et3562611710354002255",
//         variantPrice: 100,
//         color: "red",
//         size: "sm",
//         stock: 12,
//         productId: "d9546eb0-46db-4586-8692-2e46b57c4bc9",
//         createdAt: "2024-03-13T18:20:02.000Z",
//         updatedAt: "2024-03-13T18:20:02.000Z",
//       },
//       {
//         variantId: "b6ca23a4-56f4-4af6-a088-8581e9c0a697",
//         barcodeCode: "et7774031710354002255",
//         variantPrice: 120,
//         color: "blue",
//         size: "md",
//         stock: 20,
//         productId: "d9546eb0-46db-4586-8692-2e46b57c4bc9",
//         createdAt: "2024-03-13T18:20:02.000Z",
//         updatedAt: "2024-03-13T18:20:02.000Z",
//       },
//     ],
//   },
// ];
