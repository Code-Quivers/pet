"use client";

import { IUpdateProductPromo, IUpdateProductQA } from "@/types/forms/product";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Message,
  Modal,
  SelectPicker,
  TagPicker,
  useToaster,
} from "rsuite";

import { renderLoading } from "@/components/animation/form/SelectPicker/renderLoading";
import { useEffect, useState } from "react";
import { useUpdateProductQAMutation } from "@/redux/features/productQAApi";
import { promoTypeEnums } from "@/helpers/constant";
import { watch } from "fs";
import {
  useGetCategoryQuery,
  useGetSingleCategoryQuery,
} from "@/redux/features/categoryApi";
import { useGetProductQuery } from "@/redux/features/productsApi";
import { useUpdatePromoMutation } from "@/redux/features/promoCodeApi";

const PromoCodeEditModal = ({ isOpenEdit, handleCloseEdit, editData }: any) => {
  const query: Record<string, any> = {};
  const [orderDiscount, setOrderDiscount] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm<IUpdateProductPromo>();

  const { data: allProducts } = useGetProductQuery({ ...query });

  const productEnum =
    allProducts?.data?.map((single: any) => {
      return {
        label: single?.productName,
        value: single?.productId,
      };
    }) || [];

  const toaster = useToaster();
  const [
    updateProductPromo,
    { data, isLoading, isSuccess, isError, error, reset: resetReq },
  ] = useUpdatePromoMutation();

  const handleUpdateProductPromo = async (updatedData: IUpdateProductPromo) => {
    const objData = {
      productId: updatedData.productId,
      promotionName: updatedData.promotionName,
      promoCode: updatedData.promoCode,
      expireDate: updatedData.expireDate,
      type: updatedData.type,
      threshold: updatedData.threshold
        ? Number(updatedData.threshold)
        : undefined,
      discount: updatedData.discount ? Number(updatedData.discount) : undefined,
      buy: updatedData.buy ? Number(updatedData.buy) : undefined,
      get: updatedData.get ? Number(updatedData.get) : undefined,
    };

    console.log("objData", objData);

    await updateProductPromo({
      data: objData,
      id: editData?.id,
    });
  };

  useEffect(() => {
    if (isSuccess && !isError && !isLoading) {
      toaster.push(
        <Message bordered showIcon type="success" closable>
          <h4 className="font-semibold ">
            {data?.message || "Successfully Updated"}
          </h4>
        </Message>,
        { placement: "topEnd", duration: 2000 }
      );
      resetReq();
      handleCloseEdit();
      formReset();
    }
    if (!isSuccess && isError && !isLoading && error) {
      toaster.push(
        <Message bordered showIcon type="error" closable>
          <h4 className="font-semibold ">
            {
              // @ts-ignore
              error?.message || "Update Failed"
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
    handleCloseEdit,
    isError,
    isLoading,
    isSuccess,
    resetReq,
    toaster,
  ]);

  return (
    <div>
      <Modal
        size="lg"
        open={isOpenEdit}
        onClose={handleCloseEdit}
        backdrop={"static"}
      >
        <Modal.Header>
          <Modal.Title>
            <span className="text-sm font-semibold ">Edit Promo Code</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form
              onSubmit={handleSubmit(handleUpdateProductPromo)}
              className="px-1"
            >
              <div className="my-3">
                <div>
                  <label className="block font-medium text-black ">
                    Select Promo Offer
                  </label>
                  <Controller
                    name="type"
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper">
                        <SelectPicker
                          size="lg"
                          defaultValue={editData?.promotion?.type}
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

              <div className="grid grid-cols-1  items-center gap-3 my-3">
                {/* Product Name */}
                <div className="space-y-1">
                  <label className="block font-medium text-black ">
                    Product
                  </label>
                  <Controller
                    name="productId"
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper">
                        <TagPicker
                          size="lg"
                          defaultValue={
                            editData?.promotion?.products?.map(
                              (product: any) => product.productId
                            ) || []
                          }
                          data={productEnum || []}
                          value={field.value}
                          onChange={(value: string | null) =>
                            field.onChange(value)
                          }
                          style={{
                            width: "100%",
                          }}
                          placeholder="Select Product "
                          searchable={false}
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

              <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-3 my-3">
                {/* Promo Name */}
                <div className="space-y-1">
                  <label className="block font-medium text-black ">
                    Promo Name
                  </label>
                  <Controller
                    name="promotionName"
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper">
                        <Input
                          {...field}
                          defaultValue={editData?.promotion.promotionName}
                          placeholder="Write promo Name"
                          className="!w-full !text-capitalize"
                        />
                        <Form.ErrorMessage
                          show={
                            (!!errors?.promotionName &&
                              !!errors?.promotionName?.message) ||
                            false
                          }
                          placement="topEnd"
                        >
                          <span className="font-semibold">
                            {errors?.promotionName?.message}
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
                          defaultValue={editData?.promotion?.promoCode}
                          placeholder="Write promo Code like ET2024"
                          className="!w-full !text-capitalize"
                        />
                        <Form.ErrorMessage
                          show={
                            (!!errors?.promoCode &&
                              !!errors?.promoCode?.message) ||
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
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper w-full">
                        <DatePicker
                          defaultValue={
                            new Date(editData?.promotion?.expireDate)
                          }
                          block
                          placement="auto"
                          size="lg"
                          editable={false}
                          className="!w-full"
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
                              defaultValue={editData?.threshold}
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
                              defaultValue={editData?.discount}
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
                              defaultValue={editData?.buy}
                              placeholder="Number of Buy "
                              className="!w-full"
                            />
                            <Form.ErrorMessage
                              show={
                                (!!errors?.buy && !!errors?.buy?.message) ||
                                false
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
                              defaultValue={editData?.get}
                              placeholder="Number of get"
                              className="!w-full"
                            />
                            <Form.ErrorMessage
                              show={
                                (!!errors?.get && !!errors?.get?.message) ||
                                false
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
                  Edit Promo Code
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PromoCodeEditModal;
