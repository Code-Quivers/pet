"use client";

import { renderLoading } from "@/components/animation/form/SelectPicker/renderLoading";
import ProductCreateController from "@/components/products/forms/ProductCreateController";
import { ICreateProduct, packTypeEnums } from "@/types/forms/product";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Form,
  Input,
  InputPicker,
  Message,
  SelectPicker,
  useToaster,
} from "rsuite";
import { HiMiniCurrencyEuro, HiOutlineCurrencyDollar } from "react-icons/hi2";
import ProductImageUpload from "@/components/products/forms/ProductImageUpload";
import { FiFileText } from "react-icons/fi";
import { useAddProductMutation } from "@/redux/features/productsApi";
import { useGetSubCategoryQuery } from "@/redux/features/subCategoryApi";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { useGetCategoryQuery } from "@/redux/features/categoryApi";
import {
  useAddProductSizeMutation,
  useGetProductSizeQuery,
} from "@/redux/features/productSizeApi";
import {
  useAddProductColorMutation,
  useGetProductColorQuery,
} from "@/redux/features/productColorApi";

const AddProductForm = () => {
  const toaster = useToaster();
  let subCategoryQuery: any = {};
  const [subCategorySearch, setSubCategorySearch] = useState("");
  subCategoryQuery["limit"] = 100;
  subCategoryQuery["searchTerm"] = subCategorySearch;

  //Get All Category
  const {
    data: categoryResponse,
    isLoading: subCategoryLoading,
    isFetching: subCategoryFetching,
  } = useGetCategoryQuery({ ...subCategoryQuery });

  const categoryEnums = categoryResponse?.data?.map((single: any) => {
    return {
      label: single?.categoryName,
      value: single?.categoryId,
    };
  });

  //Get All Product Size
  const {
    data: productSizeResponse,
    isLoading: sizeLoading,
    isFetching: sizeFetching,
  } = useGetProductSizeQuery({});

  const productSize = productSizeResponse?.data?.map((size: any) => {
    return {
      label: size?.productSize,
      value: size?.sizeVarientId,
    };
  });

  //Create Product Size

  const [addProductSize, { data: productSizeData }] =
    useAddProductSizeMutation();

  const handleAddProductSize = async (newData: any) => {
    await addProductSize(newData);
  };

  //Get All Product Color

  const {
    data: productColorResponse,
    isLoading: colorLoading,
    isFetching: colorFetching,
  } = useGetProductColorQuery({});

  const productColor = productColorResponse?.data?.map((color: any) => {
    return {
      label: color?.productColor,
      value: color?.colorVarientId,
    };
  });

  //Create Product Color

  const [addProductColor, { data: productColorData }] =
    useAddProductColorMutation();

  const handleAddProductColor = async (newData: any) => {
    await addProductColor(newData);
  };

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
      productDescription: newData?.productDescription,
      productPrice: newData?.productPrice
        ? parseInt(newData?.productPrice)
        : "",
      productStock: newData?.productStock
        ? parseInt(newData?.productStock)
        : "",
      categoryId: newData?.categoryId,
      colorVarientId: newData?.colorVarientId,
      sizeVarientId: newData?.sizeVarientId,
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
                  label="Product Price"
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

              {/* Product Price (optional) */}
              <div className="space-y-1">
                <ProductCreateController
                  label="Product Quantity"
                  placeholder="Enter Product Quantity..."
                  control={control}
                  errors={errors}
                  name="productStock"
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
                  Product Image
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
              {/* select category */}
              <div className="space-y-1">
                <label className="block font-medium text-black ">
                  Category
                </label>
                <Controller
                  name="categoryId"
                  control={control}
                  rules={{ required: "Category is required" }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <SelectPicker
                        size="lg"
                        data={categoryEnums || []}
                        value={field.value}
                        onChange={(value: string | null) =>
                          field.onChange(value)
                        }
                        style={{
                          width: "100%",
                        }}
                        placeholder="Select Category"
                        searchable={false}
                        renderMenu={(menu) =>
                          renderLoading(
                            menu,
                            subCategoryLoading || subCategoryFetching
                          )
                        }
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.categoryId &&
                            !!errors?.categoryId?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.categoryId?.message}
                        </span>
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>

              {/* select Size */}
              <div className="space-y-1">
                <label className="block font-medium text-black ">
                  Product Size (Optional)
                </label>
                <Controller
                  name="sizeVarientId"
                  control={control}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <InputPicker
                        creatable
                        size="lg"
                        data={productSize || []}
                        // value={field.value}
                        onCreate={(value, item) => {
                          handleAddProductSize({ productSize: value });
                          // console.log(value, item);
                        }}
                        onChange={(value: string | null) =>
                          field.onChange(value)
                        }
                        style={{
                          width: "100%",
                        }}
                        placeholder="Select Product Size"
                        renderMenu={(menu) =>
                          renderLoading(menu, sizeLoading || sizeFetching)
                        }
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.sizeVarientId &&
                            !!errors?.sizeVarientId?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.sizeVarientId?.message}
                        </span>
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>

              {/* select Color */}
              <div className="space-y-1">
                <label className="block font-medium text-black ">
                  Product Color
                </label>
                <Controller
                  name="colorVarientId"
                  control={control}
                  rules={{ required: "Product Color is required" }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <InputPicker
                        size="lg"
                        data={productColor || []}
                        value={field.value}
                        creatable
                        onCreate={(value, item) => {
                          handleAddProductColor({ productColor: value });
                        }}
                        onChange={(value: string | null) =>
                          field.onChange(value)
                        }
                        style={{
                          width: "100%",
                        }}
                        placeholder="Select Product Color"
                        renderMenu={(menu) =>
                          renderLoading(menu, colorLoading || colorFetching)
                        }
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.colorVarientId &&
                            !!errors?.colorVarientId?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.colorVarientId?.message}
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
