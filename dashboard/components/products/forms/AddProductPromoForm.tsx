"use client";

import { renderLoading } from "@/components/animation/form/SelectPicker/renderLoading";
import { ICreateProductPromo, ICreateProductQA } from "@/types/forms/product";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Message,
  SelectPicker,
  Toggle,
  useToaster,
} from "rsuite";

import { useEffect, useState } from "react";

import {
  useGetCategoryQuery,
  useGetSingleCategoryQuery,
} from "@/redux/features/categoryApi";

import { useAddPromoMutation } from "@/redux/features/promoCodeApi";
import { promoTypeEnums } from "@/helpers/constant";

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

  const [addPromoCode, { data, isLoading, isSuccess, isError, error, reset }] =
    useAddPromoMutation();

  const handleAddPromoCode = async (newData: ICreateProductPromo) => {
    const objData = {
      type: newData.type,
      productId: newData.productId,
      promotionName: newData.promoName,
      promoCode: newData.promoCode,
      expireDate: newData.expireDate,
      threshold: newData.threshold ? Number(newData.threshold) : undefined,
      discount: newData.discount ? Number(newData.discount) : undefined,
      buy: newData.buy ? Number(newData.buy) : undefined,
      get: newData.get ? Number(newData.get) : undefined,
    };

    console.log("objData", objData);

    await addPromoCode(objData);
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
          <div className="grid grid-cols-12 gap-x-3 gap-y-5">
            {/* promotionName */}
            <div className="space-y-1 col-span-6">
              <label className="block font-medium text-[15px] text-graydark ">
                Promotion Name
              </label>
              <Controller
                name="promoName"
                control={control}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <Input
                      {...field}
                      placeholder="Promotion Name"
                      className="!w-full"
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
            {/* promo code */}
            <div className="space-y-1 col-span-6">
              <label className="block font-medium text-[15px] text-graydark ">
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
            {/* Promotion type */}
            <div className="col-span-6 space-y-1">
              <label className="block font-medium text-[15px] text-graydark ">
                Promotion type
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
            {/* Expire Date */}
            <div className="col-span-6 space-y-1">
              <label className="block font-medium text-[15px] text-graydark ">
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
                      placement="bottom"
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
            {/* Purchase Product Name */}
            <div className="space-y-1 col-span-4">
              <label className="block font-medium text-[15px] text-graydark ">
                Purchase product
              </label>
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
            {/* purchase quantity  */}
            <div className="space-y-1 col-span-2">
              <label className="block font-medium text-[15px] text-graydark ">
                Purchase Quantity
              </label>
              <Controller
                name="purchaseQuantity"
                control={control}
                rules={{ required: "Purchase Quantity is required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <InputNumber
                      {...field}
                      placeholder="Write Purchase Quantity"
                      className="!w-full"
                      size="lg"
                    />
                    {/* <Form.ErrorMessage
                        show={
                          (!!errors?.purchaseQuantity &&
                            !!errors?.purchaseQuantity?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.purchaseQuantity?.message}
                        </span>
                      </Form.ErrorMessage> */}
                  </div>
                )}
              />
            </div>
            {/* Get free Product Name */}
            <div className="space-y-1 col-span-4">
              <label className="block font-medium text-[15px] text-graydark ">
                Get free product
              </label>
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
            {/* free quantity  */}
            <div className="space-y-1 col-span-2">
              <label className="block font-medium text-[15px] text-graydark ">
                Free quantity
              </label>
              <Controller
                name="purchaseQuantity"
                control={control}
                rules={{ required: "Purchase Quantity is required" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <InputNumber
                      size="lg"
                      {...field}
                      placeholder="Write Purchase Quantity"
                      className="!w-full"
                    />
                    {/* <Form.ErrorMessage
                        show={
                          (!!errors?.purchaseQuantity &&
                            !!errors?.purchaseQuantity?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.purchaseQuantity?.message}
                        </span>
                      </Form.ErrorMessage> */}
                  </div>
                )}
              />
            </div>
            {/* Is Active switch */}
            <div className="space-x-5 col-span-12">
              <label htmlFor="isActive" className="font-semibold">
                Enable Promo Code
              </label>
              <Controller
                control={control}
                name="isActive"
                render={({ field }) => <Toggle size="md" />}
              />
            </div>
          </div>

          {/* Product Name */}
          {/* select category */}
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-3 my-3">
            <div className="space-y-1">
              <label className="block font-medium text-[15px] text-graydark ">
                Category
              </label>
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
          </div> */}

          {/* Promo Name */}
          {/* <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-3 my-3">
            <div className="space-y-1">
              <label className="block font-medium text-[15px] text-graydark ">
                Promo Name
              </label>
              <Controller
                name="promoName"
                control={control}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <Input
                      as="textarea"
                      rows={3}
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
          </div> */}

          {/* <div className="my-3">
            {orderDiscount ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-3">
                <div className="space-y-1">
                  <label className="block font-medium text-[15px] text-graydark ">
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
                  <label className="block font-medium text-[15px] text-graydark ">
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
                  <label className="block font-medium text-[15px] text-graydark ">
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
                  <label className="block font-medium text-[15px] text-graydark ">
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
          </div> */}

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
