"use client";

import { renderLoading } from "@/components/animation/form/SelectPicker/renderLoading";
import ProductCreateController from "@/components/products/forms/ProductCreateController";
import { ICreateBatchProduct, batchPackTypeEnums } from "@/types/forms/product";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Message,
  SelectPicker,
  useToaster,
} from "rsuite";

import { useAddBatchProductMutation } from "@/redux/features/batchProductApi";
import {
  useGetCategoryQuery,
  useGetSingleCategoryQuery,
} from "@/redux/features/categoryApi";
import { useGetSingleSubCategoryQuery } from "@/redux/features/subCategoryApi";
import { useEffect } from "react";

const AddProductBatchForm = () => {
  const toaster = useToaster();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
    watch,
  } = useForm<ICreateBatchProduct>();

  const { categoryHref, subCategoryHref } = watch();

  let query: any = {};
  query["limit"] = 100;

  const { data: categoryData, isLoading: isLoadingCategory } =
    useGetCategoryQuery({ ...query });
  // !
  const { data: singleCategoryData, isLoading: isLoadingSingleCategory } =
    useGetSingleCategoryQuery(categoryHref, {
      skip: !categoryHref,
    });
  const { data: singleSubCategoryData, isLoading: isLoadingSingleSubCategory } =
    useGetSingleSubCategoryQuery(subCategoryHref, {
      skip: !subCategoryHref,
    });

  const [
    addBatchProduct,
    { data, isLoading, isError, isSuccess, reset, error },
  ] = useAddBatchProductMutation();

  const handleAddBatchProduct = async (batchData: ICreateBatchProduct) => {
    const batchProductData = {
      productVat: batchData?.productVat ? parseInt(batchData?.productVat) : "",
      batchPrice: parseInt(batchData?.batchPrice),
      batchPackType: batchData?.batchPackType,
      productId: batchData?.productId,
    };
    await addBatchProduct(batchProductData);
  };

  useEffect(() => {
    if (isSuccess && !isError && !isLoading) {
      formReset({
        batchPackType: "",
        batchPrice: "",
        productVat: "",
        categoryHref: "",
        productId: "",
        subCategoryHref: "",
      });
      toaster.push(
        <Message bordered showIcon type="success" closable>
          <h4 className="font-semibold ">
            {data?.message || "Successfully Batch Product Added"}
          </h4>
        </Message>,
        { placement: "topEnd", duration: 2000 }
      );
      reset();
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
        <h2 className="text-2xl font-semibold">Add Batch Product</h2>
      </div>
      {/* content */}
      <div className="p-5">
        <form onSubmit={handleSubmit(handleAddBatchProduct)}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {/* left */}
            <div className="col-span-2 space-y-2">
              {/* Product Category */}
              <div className="space-y-1">
                <label className="block font-medium text-black ">
                  Product Category
                </label>
                <Controller
                  name="categoryHref"
                  control={control}
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <SelectPicker
                        cleanable={false}
                        placement="top"
                        size="lg"
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
                  Product Name
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
                        placeholder="Select Product"
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
              {/* Vat on Product */}
              <div className="space-y-1">
                <label className="block font-medium text-black ">
                  Vat on Product (optional)
                </label>
                <Controller
                  name="productVat"
                  control={control}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <Input
                        size="lg"
                        {...field}
                        placeholder="Vat on Product"
                        className="!w-full"
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.productVat &&
                            !!errors?.productVat?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.productVat?.message}
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
                        cleanable={false}
                        placement="top"
                        size="lg"
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

              {/* Batch Pack type */}
              <div className="space-y-1">
                <label className="block font-medium text-black ">
                  Batch Pack Type
                </label>
                <Controller
                  name="batchPackType"
                  control={control}
                  rules={{ required: "Sub Category is required" }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <SelectPicker
                        cleanable={false}
                        searchable={false}
                        size="lg"
                        placement="top"
                        data={batchPackTypeEnums}
                        value={field.value}
                        onChange={(value: string | null) =>
                          field.onChange(value)
                        }
                        style={{
                          width: "100%",
                        }}
                        placeholder="Select Pack Type"
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.batchPackType &&
                            !!errors?.batchPackType?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.batchPackType?.message}
                        </span>
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
              {/* Batch Price */}
              <div className="space-y-1">
                <label className="block font-medium text-black ">
                  Batch Price
                </label>
                <Controller
                  name="batchPrice"
                  control={control}
                  rules={{
                    required: "Batch Price is Required",
                    min: {
                      value: 1,
                      message: "Batch Price must be getter than 0",
                    },
                  }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <InputNumber
                        size="lg"
                        {...field}
                        min={1}
                        className="!w-full"
                        placeholder="Enter batch Price"
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.batchPrice &&
                            !!errors?.batchPrice?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.batchPrice?.message}
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

export default AddProductBatchForm;
