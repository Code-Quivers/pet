"use client";

import { renderLoading } from "@/components/animation/form/SelectPicker/renderLoading";
import ProductCreateController from "@/components/products/forms/ProductCreateController";
import { ICreateProduct, packTypeEnums } from "@/types/forms/product";
import { Controller, useForm } from "react-hook-form";
import { Button, Form, Input, Message, SelectPicker, useToaster } from "rsuite";
import { HiMiniCurrencyEuro, HiOutlineCurrencyDollar } from "react-icons/hi2";
import ProductImageUpload from "@/components/products/forms/ProductImageUpload";
import { FiFileText } from "react-icons/fi";
import { useAddProductMutation } from "@/redux/features/productsApi";
import { useGetSubCategoryQuery } from "@/redux/features/subCategoryApi";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

const AddProductForm = () => {
  const toaster = useToaster();
  let subCategoryQuery: any = {};
  const [subCategorySearch, setSubCategorySearch] = useState("");
  subCategoryQuery["limit"] = 100;
  subCategoryQuery["searchTerm"] = subCategorySearch;
  const {
    data: subCategoryResponse,
    isLoading: subCategoryLoading,
    isFetching: subCategoryFetching,
  } = useGetSubCategoryQuery({ ...subCategoryQuery });

  const subCategoryEnums = subCategoryResponse?.data?.map((single: any) => {
    return {
      label: single?.subCategoryName,
      value: single?.subCategoryId,
    };
  });

  const [addProduct, { data, isLoading, isSuccess, isError, error, reset }] =
    useAddProductMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm<ICreateProduct>();

  const handleAddProduct = async (newData: ICreateProduct) => {
    const formData = new FormData();

    if (newData?.productImage?.blobFile) {
      formData.append("file", newData?.productImage?.blobFile);
    }
    const obj = {
      productName: newData?.productName,
      description: newData?.productDescription,
      price: newData?.productPrice ? parseInt(newData?.productPrice) : "",
      shortSummery: newData?.shortSummery,
      subCategoryId: newData?.subCategoryId,
      packType: newData?.packTypeId,
    };

    const productData = JSON.stringify(obj);

    formData.append("data", productData);

    await addProduct(formData);
  };

  useEffect(() => {
    if (isSuccess && !isError && !isLoading) {
      toaster.push(
        <Message bordered showIcon type="success" closable>
          <h4 className="font-semibold ">
            {data?.message || "Successfully Product Created"}
          </h4>
        </Message>,
        { placement: "topEnd", duration: 2000 }
      );
      reset();
      formReset();
      redirect("/products");
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
    <div className="rounded-sm border border-stroke bg-white  shadow-default dark:border-strokedark dark:bg-boxdark ">
      {/* heading */}
      <div className="border-b p-5">
        <h2 className="text-2xl font-semibold">Add Product</h2>
      </div>
      {/* content */}
      <div className="p-5 ">
        <form onSubmit={handleSubmit(handleAddProduct)} className="px-1">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {/* left */}
            <div className="col-span-2 space-y-2">
              {/* Product Name */}
              <div className="space-y-1">
                <ProductCreateController
                  label="Product Name"
                  placeholder="Enter Product Name.."
                  requiredMessage="Product Name is required"
                  control={control}
                  errors={errors}
                  name="productName"
                  icon={<FiFileText size={20} className="text-[#cfcfcf]" />}
                />
              </div>
              {/* Product Price (optional) */}
              <div className="space-y-1">
                <ProductCreateController
                  label="Product Price (optional)"
                  placeholder="Enter Product Price..."
                  control={control}
                  errors={errors}
                  name="productPrice"
                  type="number"
                  icon={
                    <HiMiniCurrencyEuro className="text-[#ababab]" size={20} />
                  }
                />
              </div>

              {/* Product Description(optional) */}
              <div className="space-y-1">
                <label className="block font-medium text-black ">
                  Product Description
                </label>
                <Controller
                  name="productDescription"
                  control={control}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <Input
                        as="textarea"
                        rows={3}
                        {...field}
                        placeholder="Write product Description..."
                        className="!w-full"
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.productDescription &&
                            !!errors?.productDescription?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.productDescription?.message}
                        </span>
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
              {/* Product Image */}
              <div className="space-y-1">
                <label className="block font-medium text-black  ">
                  Product Image (optional)
                </label>
                <Controller
                  name="productImage"
                  control={control}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <ProductImageUpload field={field} />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.productImage &&
                            !!errors?.productImage?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.productImage?.message}
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
                  name="subCategoryId"
                  control={control}
                  rules={{ required: "Sub Category is required" }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <SelectPicker
                        onSearch={(e) => {
                          setSubCategorySearch(e);
                        }}
                        size="lg"
                        data={subCategoryEnums || []}
                        value={field.value}
                        onChange={(value: string | null) =>
                          field.onChange(value)
                        }
                        style={{
                          width: "100%",
                        }}
                        placeholder="Select Item"
                        renderMenu={(menu) =>
                          renderLoading(
                            menu,
                            subCategoryLoading || subCategoryFetching
                          )
                        }
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.subCategoryId &&
                            !!errors?.subCategoryId?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.subCategoryId?.message}
                        </span>
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
              {/* select pack type (optional) */}
              <div className="space-y-1">
                <label className="block font-medium text-black ">
                  Pack Type (optional)
                </label>
                <Controller
                  name="packTypeId"
                  control={control}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <SelectPicker
                        searchable={false}
                        size="lg"
                        data={packTypeEnums}
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
                          (!!errors?.packTypeId &&
                            !!errors?.packTypeId?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        {" "}
                        <span className="font-semibold">
                          {errors?.packTypeId?.message}
                        </span>
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
              {/* short summary */}
              <div className="space-y-1">
                <label className="block font-medium text-black ">
                  Short Summary
                </label>
                <Controller
                  name="shortSummery"
                  control={control}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <Input
                        as="textarea"
                        rows={3}
                        {...field}
                        placeholder="Write a summary about the product..."
                        className="!w-full"
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.shortSummery &&
                            !!errors?.shortSummery?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.shortSummery?.message}
                        </span>
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-5">
            <Button
              loading={isLoading}
              type="submit"
              className="!bg-[#3c50e0] !px-6 !text-white  !font-semibold"
              size="lg"
            >
              Add Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
