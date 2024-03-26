"use client";

import { renderLoading } from "@/components/animation/form/SelectPicker/renderLoading";
import { ICreateProductPromo, ICreateProductQA } from "@/types/forms/product";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputPicker,
  Message,
  SelectPicker,
  useToaster,
} from "rsuite";

import { useEffect, useState } from "react";

import {
  useGetCategoryQuery,
  useGetSingleCategoryQuery,
} from "@/redux/features/categoryApi";
import { useAddProductQAMutation } from "@/redux/features/productQAApi";
import moment from "moment";

const AddProductPromoForm = () => {
  const [orderDiscount, setOrderDiscount] = useState(false);

  const toaster = useToaster();
  let subCategoryQuery: any = {};
  const [subCategorySearch, setSubCategorySearch] = useState("");
  subCategoryQuery["limit"] = 100;
  subCategoryQuery["searchTerm"] = subCategorySearch;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
    watch,
  } = useForm<ICreateProductPromo>();

  const { categoryHref } = watch();

  //Get All Category
  const {
    data: categoryResponse,
    isLoading: subCategoryLoading,
    isFetching: subCategoryFetching,
  } = useGetCategoryQuery({ ...subCategoryQuery });

  const categoryEnums = categoryResponse?.data?.map((single: any) => {
    return {
      label: single?.categoryName,
      value: single?.categoryHref,
    };
  });

  const { data: categoriesWiseProduct, isLoading: productLoading } =
    useGetSingleCategoryQuery(categoryHref, {
      skip: !categoryHref,
    });

  const productEnum = categoriesWiseProduct?.data?.product?.length
    ? categoriesWiseProduct?.data?.product?.map((single: any) => {
        return {
          label: single?.productName,
          value: single?.productId,
        };
      })
    : [];

  const promos = [
    {
      label: "Buy & Get Offer",
      value: "BUY_ONE_GET_ONE",
    },
    {
      label: "Discount on Order",
      value: "DISCOUNT_BASED_ON_AMOUNT",
    },
  ];

  const promoTypeEnums = promos.map((promo: any) => {
    return {
      label: promo.label,
      value: promo.value,
    };
  });

  const [addProductQA, { data, isLoading, isSuccess, isError, error, reset }] =
    useAddProductQAMutation();

  const handleAddPromoCode = async (newData: ICreateProductPromo) => {
    const objData = {
      type: newData.type,
      productId: newData.productId,
      promotionName: newData.promoName,
      promoCode: newData.promoCode,
      expireDate: newData.expireDate,
      thresHold: newData.threshold,
      discount: newData.discount,
      buy: newData.buy,
      get: newData.get,
    };

    console.log("objData", objData);

    // await addProductQA(objData);

    formReset({
      type: "",
      productId: "",
      promoName: "",
      promoCode: "",
      //@ts-ignore
      expireDate: "",
      threshold: "",
      discount: "",
      buy: "",
      get: "",
      categoryHref: "",
    });
  };

  useEffect(() => {
    if (isSuccess && !isError && !isLoading) {
      toaster.push(
        <Message bordered showIcon type="success" closable>
          <h4 className="font-semibold ">
            {data?.message || "Successfully Created"}
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
              error?.message || "Creation Failed"
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
        <h2 className="text-2xl font-semibold">Add Promo Code</h2>
      </div>
      {/* content */}
      <div className="p-5 ">
        <form onSubmit={handleSubmit(handleAddPromoCode)} className="px-1">
          <div className="my-3">
            <div>
              <label className="block font-medium text-black ">
                Select Promo Offer
              </label>
              <Controller
                name="type"
                control={control}
                rules={{ required: "PromoOffer is required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <SelectPicker
                      size="lg"
                      data={promoTypeEnums}
                      value={field.value}
                      // onChange={(value: string | null) => field.onChange(value)}
                      onChange={(value: string | null) => {
                        // Update orderDiscount based on the selected value
                        if (value === "DISCOUNT_BASED_ON_AMOUNT") {
                          setOrderDiscount(true);
                        } else {
                          setOrderDiscount(false);
                        }
                        // Update the field value
                        field.onChange(value);
                      }}
                      style={{
                        width: "100%",
                      }}
                      placeholder="Select Promo Offer"
                      searchable={false}
                    />
                    <Form.ErrorMessage
                      show={
                        (!!errors?.type && !!errors?.type?.message) || false
                      }
                      placement="topEnd"
                    >
                      <span className="font-semibold">
                        {errors?.type?.message}
                      </span>
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-3 my-3">
            {/* Product Name */}
            {/* select category */}
            <div className="space-y-1">
              <label className="block font-medium text-black ">Category</label>
              <Controller
                name="categoryHref"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <SelectPicker
                      size="lg"
                      data={categoryEnums}
                      value={field.value}
                      onChange={(value: string | null) => field.onChange(value)}
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
              <label className="block font-medium text-black ">Product</label>
              <Controller
                name="productId"
                control={control}
                rules={{ required: "Product is required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <SelectPicker
                      size="lg"
                      data={productEnum || []}
                      value={field.value}
                      onChange={(value: string | null) => field.onChange(value)}
                      style={{
                        width: "100%",
                      }}
                      placeholder="Select Product "
                      searchable={false}
                      renderMenu={(menu) =>
                        renderLoading(
                          menu,
                          productLoading || subCategoryFetching
                        )
                      }
                    />
                    <Form.ErrorMessage
                      show={
                        (!!errors?.productId && !!errors?.productId?.message) ||
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

          <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-3 my-3">
            {/* Promo Name */}
            <div className="space-y-1">
              <label className="block font-medium text-black ">
                Promo Name
              </label>
              <Controller
                name="promoName"
                control={control}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <Input
                      {...field}
                      placeholder="Write promo Name"
                      className="!w-full !text-capitalize"
                    />
                    <Form.ErrorMessage
                      show={
                        (!!errors?.promoName && !!errors?.promoName?.message) ||
                        false
                      }
                      placement="topEnd"
                    >
                      <span className="font-semibold">
                        {errors?.promoName?.message}
                      </span>
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>

            <div className="space-y-1">
              <label className="block font-medium text-black ">
                Promo Code
              </label>
              <Controller
                name="promoCode"
                control={control}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <Input
                      {...field}
                      placeholder="Write promo Code like ET2024"
                      className="!w-full !text-capitalize"
                    />
                    <Form.ErrorMessage
                      show={
                        (!!errors?.promoCode && !!errors?.promoCode?.message) ||
                        false
                      }
                      placement="topEnd"
                    >
                      <span className="font-semibold">
                        {errors?.promoCode?.message}
                      </span>
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>
            {/* Expire Date */}
            <div className="space-y-1">
              <label className="block font-medium text-black ">
                Expire Date
              </label>
              <Controller
                name="expireDate"
                control={control}
                rules={{ required: "Date is required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper w-full">
                    <DatePicker
                      block
                      placement="auto"
                      size="lg"
                      editable={false}
                      className="!w-full"
                      value={field.value ? new Date(field.value) : null}
                      onChange={(value: Date | null): void => {
                        if (value) {
                          const isoString = value.toISOString();
                          field.onChange(isoString);
                        } else {
                          field.onChange(null);
                        }
                      }}
                    />
                    <Form.ErrorMessage
                      show={
                        (!!errors?.expireDate &&
                          !!errors?.expireDate?.message) ||
                        false
                      }
                      placement="topEnd"
                    >
                      <span className="font-semibold">
                        {errors?.expireDate?.message as string}
                      </span>
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>
          </div>

          <div className="my-3">
            {orderDiscount ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-3">
                <div className="space-y-1">
                  <label className="block font-medium text-black ">
                    Order Amount
                  </label>
                  <Controller
                    name="threshold"
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper">
                        <Input
                          {...field}
                          placeholder="Order Amount "
                          className="!w-full"
                        />
                        <Form.ErrorMessage
                          show={
                            (!!errors?.threshold &&
                              !!errors?.threshold?.message) ||
                            false
                          }
                          placement="topEnd"
                        >
                          <span className="font-semibold">
                            {errors?.threshold?.message}
                          </span>
                        </Form.ErrorMessage>
                      </div>
                    )}
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-medium text-black ">
                    Discount %
                  </label>
                  <Controller
                    name="discount"
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper">
                        <Input
                          {...field}
                          placeholder="Write discount as % "
                          className="!w-full"
                        />
                        <Form.ErrorMessage
                          show={
                            (!!errors?.discount &&
                              !!errors?.discount?.message) ||
                            false
                          }
                          placement="topEnd"
                        >
                          <span className="font-semibold">
                            {errors?.discount?.message}
                          </span>
                        </Form.ErrorMessage>
                      </div>
                    )}
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-3">
                <div className="space-y-1">
                  <label className="block font-medium text-black ">
                    Number of Buy
                  </label>
                  <Controller
                    name="buy"
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper">
                        <Input
                          {...field}
                          placeholder="Number of Buy "
                          className="!w-full"
                        />
                        <Form.ErrorMessage
                          show={
                            (!!errors?.buy && !!errors?.buy?.message) || false
                          }
                          placement="topEnd"
                        >
                          <span className="font-semibold">
                            {errors?.buy?.message}
                          </span>
                        </Form.ErrorMessage>
                      </div>
                    )}
                  />
                </div>
                <div className="space-y-1">
                  <label className="block font-medium text-black ">
                    Number of Get
                  </label>
                  <Controller
                    name="get"
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper">
                        <Input
                          {...field}
                          placeholder="Number of get"
                          className="!w-full"
                        />
                        <Form.ErrorMessage
                          show={
                            (!!errors?.get && !!errors?.get?.message) || false
                          }
                          placement="topEnd"
                        >
                          <span className="font-semibold">
                            {errors?.get?.message}
                          </span>
                        </Form.ErrorMessage>
                      </div>
                    )}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end mt-5">
            <Button
              loading={isLoading}
              type="submit"
              className="!bg-[#3c50e0] !px-6 !text-white  !font-semibold"
              size="lg"
            >
              Add Promo Code
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPromoForm;
