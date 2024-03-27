"use client";
import { Controller, useForm } from "react-hook-form";
// import AddProductTextEditor from "./AddProductTextEditor";
// import ShowAddVariant from "./ShowAddVariant";
import Variants from "./Variants";
import { Form, Input, InputNumber, SelectPicker } from "rsuite";
import { useState } from "react";
import { useGetCategoryQuery } from "@/redux/features/categoryApi";
import { useDebounced } from "@/redux/hook";
import AddProductUpload from "./AddProductUpload";
import { FileType } from "rsuite/esm/Uploader";

const AddProductsSection = () => {
  const query: Record<string, any> = {};
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [basePrice, setBasePrice] = useState<number>(0);
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
  const { data: categories } = useGetCategoryQuery({ ...query });

  const [productVariations, setProductVariations] = useState<any>([]);
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm();

  const handleAddProduct = (data: any) => {
    const formData = new FormData();
    // Map productVariations data and format it
    const productVariationData = productVariations?.map(
      ({ image, ...items }: any) => {
        return {
          ...items,
          price: parseFloat(items?.price),
          stock: parseInt(items?.stock),
        };
      }
    );
    // Construct the product object
    const product = {
      productName: data.title,
      productDescription: data.description,
      categoryId: data.category,
      productPrice: data.productPrice,
      productVariations: productVariationData,
    };
    // Convert product object to JSON string
    const productJSON = JSON.stringify(product);
    // Append product images to formData
    data?.productImages?.forEach((file: FileType) => {
      formData.append("files", file.blobFile as Blob);
    });

    // Append variant photos to formData
    productVariations?.forEach(({ image, ...others }: any) => {
      const { blobFile, name } = image ?? {};
      const [baseName, extension] = name?.split(".") ?? [];
      if (blobFile && baseName && extension) {
        formData.append(
          "files",
          blobFile as Blob,
          `${others?.id}_${baseName}.${extension}`
        );
      }
    });

    // appending all data to formData
    formData.append("data", productJSON);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleAddProduct)}>
        <div className="md:flex md:gap-5">
          <section className="md:w-[55%]">
            <h1 className="text-xl mb-1 font-medium">Product information</h1>
            <div className="bg-white border border-[#d1d5db] rounded-xl p-4">
              {/* product title */}
              <div className="flex flex-col   gap-2">
                <label htmlFor="title" className="font-medium">
                  Title
                </label>
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: "Product Title is Required !!" }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper ">
                      <Input
                        {...field}
                        type="text"
                        id="title"
                        className="!w-full border focus:outline-none py-1 px-3 rounded-md border-[#d1d5db]"
                        placeholder="Active Band"
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.title && !!errors?.title?.message) || false
                        }
                        placement="topEnd"
                      >
                        <span>{errors?.title?.message as string}</span>
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>

              {/* product description */}
              <div className="flex flex-col gap-2 w-full mt-3">
                <label htmlFor="title" className="font-medium">
                  Description
                </label>
                <Controller
                  control={control}
                  name="description"
                  rules={{
                    required: "Product Description is Required !!",
                  }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper  w-full">
                      <Input
                        as="textarea"
                        rows={5}
                        placeholder="Description"
                        value={field.value}
                        className="!w-full"
                        onChange={(value) => field.onChange(value)}
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.description &&
                            !!errors?.description?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span>{errors?.description?.message as string}</span>
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
              {/* product category */}

              <div className="flex flex-col gap-2 mt-2">
                <label htmlFor="category" className="font-medium">
                  Category
                </label>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: "Category is Required !!" }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper ">
                      <SelectPicker
                        className="w-full"
                        data={
                          categories?.data?.map((item: any) => ({
                            label: item?.categoryName,
                            value: item?.categoryId,
                          })) || []
                        }
                        label={undefined}
                        loading={undefined}
                        caretAs={undefined}
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.category && !!errors?.category?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span>{errors?.category?.message as string}</span>
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
              {/* product base price */}
              <div className="mt-2">
                <label htmlFor="" className="font-medium">
                  Base price
                </label>
                <Controller
                  control={control}
                  name="productPrice"
                  rules={{
                    required: "Base Price is required !!",
                    min: {
                      value: 0,
                      message: "Base Price must be greater than 0",
                    },
                  }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper ">
                      <div>
                        <InputNumber
                          value={field.value}
                          min={1}
                          step={0.1}
                          formatter={(value) => `€ ${value}`}
                          onChange={(value) => {
                            field.onChange(value);
                            setBasePrice(parseFloat(value as string));
                          }}
                        />
                      </div>
                      <Form.ErrorMessage
                        show={!!errors?.productPrice}
                        placement="topEnd"
                      >
                        <span>{errors?.productPrice?.message as string}</span>
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
            </div>
            {/* Pricing */}
            {/* <h1 className="text-xl mt-3 mb-2 font-medium">Pricing</h1> */}
          </section>
          {/* media */}
          <section className="md:w-[45%]">
            <h1 className="text-xl mb-1 font-medium max-md:my-2">
              Product Images
            </h1>
            <aside className="bg-white p-4 border border-[#d1d5db] rounded-xl">
              <div className="">
                <Controller
                  rules={{ required: "Product Image is Required" }}
                  name="productImages"
                  control={control}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper ">
                      <AddProductUpload field={field as any} />
                      <Form.ErrorMessage
                        show={!!errors?.productImages}
                        placement="topEnd"
                      >
                        <span>{errors?.productImages?.message as string}</span>
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
            </aside>
          </section>
        </div>
        <div>
          <h1 className="text-xl mt-3 mb-2 font-medium">Variants</h1>
          <Variants
            basePrice={basePrice}
            productVariations={productVariations}
            setProductVariations={setProductVariations}
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 w-full bg-primary text-white font-medium rounded-lg mt-3"
          >
            Add product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductsSection;
