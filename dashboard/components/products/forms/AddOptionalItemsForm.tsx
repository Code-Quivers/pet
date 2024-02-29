"use client";

import { renderLoading } from "@/components/animation/form/SelectPicker/renderLoading";
import { IAddOptionalItems } from "@/types/forms/product";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Form,
  Message,
  SelectPicker,
  TagPicker,
  useToaster,
} from "rsuite";
// import photo from "@/app/photo.jpeg";
import Image from "next/image";
import {
  useGetCategoryQuery,
  useGetSingleCategoryQuery,
} from "@/redux/features/categoryApi";
import { useGetSingleSubCategoryQuery } from "@/redux/features/subCategoryApi";
import { useAddOptionalProductsMutation } from "@/redux/features/optionalItemsApi";
import { useEffect } from "react";
import { useGetBatchProductsQuery } from "@/redux/features/batchProductApi";
import { fileUrlKey } from "@/helpers/envConfig";
import noImage from "@/public/images/no-image.png";
const AddOptionalItemForm = () => {
  const toaster = useToaster();

  let query: any = {};
  query["limit"] = 200;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
    watch,
  } = useForm<IAddOptionalItems>();

  const { categoryHref, subCategoryHref } = watch();
  const { data: categoryData, isLoading: isLoadingCategory } =
    useGetCategoryQuery({ ...query });
  const { data: batchProducts, isLoading: isLoadingBatchProducts } =
    useGetBatchProductsQuery({ ...query });

  const { data: singleCategoryData, isLoading: isLoadingSingleCategory } =
    useGetSingleCategoryQuery(categoryHref, {
      skip: !categoryHref,
    });
  const { data: singleSubCategoryData, isLoading: isLoadingSingleSubCategory } =
    useGetSingleSubCategoryQuery(subCategoryHref, {
      skip: !subCategoryHref,
    });

  const [
    addOptionalProducts,
    { data, isLoading, isError, isSuccess, reset, error },
  ] = useAddOptionalProductsMutation();

  const handleLogin = async (optionalData: IAddOptionalItems) => {
    const obj = {
      productId: optionalData?.productId,
      batches: optionalData?.batchProductId,
    };
    await addOptionalProducts(obj);
  };
  useEffect(() => {
    if (isSuccess && !isError && !isLoading) {
      toaster.push(
        <Message bordered showIcon type="success" closable>
          <h4 className="font-semibold ">
            {data?.message || "Successfully Batch Product Added"}
          </h4>
        </Message>,
        { placement: "topEnd", duration: 2000 }
      );
      reset();
      formReset();
    }
    if (!isSuccess && isError && !isLoading && error) {
      toaster.push(
        <Message bordered showIcon type="error" closable>
          <h4 className="font-semibold ">
            {
              // @ts-ignore
              error?.message || "Product Creation Failed"
            }
          </h4>
        </Message>,
        { placement: "topEnd", duration: 2000 }
      );
    }
  }, [
    data?.message,
    error,
    formReset,
    isError,
    isLoading,
    isSuccess,
    reset,
    toaster,
  ]);
  return (
    <div className=" mt-6 rounded-sm border border-stroke bg-white  shadow-default dark:border-strokedark dark:bg-boxdark ">
      {/* heading */}
      <div className="border-b p-5">
        <h2 className="text-2xl font-semibold">Optional Items for Product</h2>
      </div>
      {/* content */}
      <div className="p-5">
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {/* left */}
            <div className="col-span-2 space-y-2">
              {/* Product Category */}
              <div className="space-y-1">
                <label className="block font-medium text-black ">
                  Category
                </label>
                <Controller
                  name="categoryHref"
                  control={control}
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <SelectPicker
                        placement="top"
                        size="lg"
                        cleanable={false}
                        data={
                          categoryData?.data?.map((single: any) => {
                            return {
                              label: single?.categoryName,
                              value: single?.categoryHref,
                            };
                          }) || []
                        }
                        value={field.value}
                        onChange={(value: string | null) =>
                          field.onChange(value)
                        }
                        style={{
                          width: "100%",
                        }}
                        placeholder="Select Category"
                        renderMenu={(menu) =>
                          renderLoading(menu, isLoadingCategory)
                        }
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.categoryHref &&
                            !!errors?.categoryHref?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.categoryHref?.message}
                        </span>
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
              {/* Product Name */}
              <div className="space-y-1">
                <label className="block font-medium text-black ">
                  Optional Item Name
                </label>
                <Controller
                  name="productId"
                  control={control}
                  rules={{ required: "Product is required" }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <SelectPicker
                        cleanable={false}
                        placement="top"
                        size="lg"
                        data={
                          singleSubCategoryData?.data?.Product?.map(
                            (single: any) => {
                              return {
                                label: single?.productName,
                                value: single?.productId,
                              };
                            }
                          ) || []
                        }
                        value={field.value}
                        onChange={(value: string | null) =>
                          field.onChange(value)
                        }
                        style={{
                          width: "100%",
                        }}
                        placeholder="Select..."
                        renderMenu={(menu) =>
                          renderLoading(menu, isLoadingSingleSubCategory)
                        }
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.productId &&
                            !!errors?.productId?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.productId?.message}
                        </span>
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
            </div>
            {/* right */}
            <div className="col-span-2 space-y-2">
              {/* select sub category */}
              <div className="space-y-1">
                <label className="block font-medium text-black ">
                  Sub Category
                </label>
                <Controller
                  name="subCategoryHref"
                  control={control}
                  rules={{ required: "Sub Category is required" }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <SelectPicker
                        placement="top"
                        size="lg"
                        cleanable={false}
                        data={
                          singleCategoryData?.data?.subCategory?.map(
                            (single: any) => {
                              return {
                                label: single?.subCategoryName,
                                value: single?.subCategoryHref,
                              };
                            }
                          ) || []
                        }
                        value={field.value}
                        onChange={(value: string | null) =>
                          field.onChange(value)
                        }
                        style={{
                          width: "100%",
                        }}
                        placeholder="Select Sub Category"
                        renderMenu={(menu) =>
                          renderLoading(menu, isLoadingSingleCategory)
                        }
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.subCategoryHref &&
                            !!errors?.subCategoryHref?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.subCategoryHref?.message}
                        </span>
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>

              {/* Batch Product */}
              <div className="space-y-1">
                <label className="block font-medium text-black ">
                  Main Product
                </label>

                <Controller
                  name="batchProductId"
                  control={control}
                  rules={{ required: "Batch Product is required" }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <TagPicker
                        searchable
                        data={
                          batchProducts?.data?.map((single: any) => {
                            return {
                              label: single?.product?.productName,
                              value: single?.batchId,
                              photo: single?.product?.productImage,
                              price: single?.batchPrice,
                            };
                          }) || []
                        }
                        size="lg"
                        placement="top"
                        placeholder="Select..."
                        block
                        value={field.value}
                        onChange={(value) => field.onChange(value)}
                        renderMenu={(menu) =>
                          renderLoading(menu, isLoadingBatchProducts)
                        }
                        renderMenuItem={(label, other) => (
                          <div className="flex items-start gap-3">
                            <div>
                              <Image
                                className="w-20"
                                width={100}
                                height={100}
                                src={
                                  other?.photo
                                    ? `${fileUrlKey()}/${other?.photo}`
                                    : noImage
                                }
                                alt=""
                              />
                            </div>
                            <div className="space-y-4">
                              <p className="font-semibold">{label}</p>
                              <p className="font-semibold">
                                Batch Price : € {other.price}
                              </p>
                            </div>
                          </div>
                        )}
                      />

                      <Form.ErrorMessage
                        show={
                          (!!errors?.batchProductId &&
                            !!errors?.batchProductId?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.batchProductId?.message}
                        </span>
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
          {/* other */}

          <div className="flex justify-end mt-5">
            <Button
              loading={isLoading}
              type="submit"
              className="!bg-[#3c50e0] !px-6 !text-white  !font-semibold"
              size="lg"
            >
              Save Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOptionalItemForm;
