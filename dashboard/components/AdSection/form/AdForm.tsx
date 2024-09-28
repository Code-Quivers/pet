"use client";

import { renderLoading } from "@/components/animation/form/SelectPicker/renderLoading";
import { IAdDetails, ICreateProductPromo, ICreateProductQA } from "@/types/forms/product";
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
import { useGetProductQuery } from "@/redux/features/productsApi";
import { useAddAdvertisementMutation } from "@/redux/features/adAPi";

const AdFormSection = () => {

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
  } = useForm<IAdDetails>();


  const [addAdvertisement, { data, error, isLoading, isSuccess, isError,reset }] = useAddAdvertisementMutation()


  const handleAddPromoCode = async (newData: IAdDetails) => {
    const objData = {
      adTitle: newData.adTitle,
      adDetails: newData.adDetails,
      startDate: newData.startDate,
      endDate: newData.endDate,
      isActive: newData.isActive || false,
    };
    await addAdvertisement(objData);
  };

  useEffect(() => {
    if (isSuccess && !isError && !isLoading) {
      toaster.push(
        <Message bordered showIcon type="success" closable>
          <h4 className="font-semibold ">
            {data?.message || "Successfully Published"}
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
              error?.message || "Publish Failed"
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
        <h2 className="text-2xl font-semibold">Ad Section</h2>
      </div>
      {/* content */}
      <div className="p-5 ">
        <form onSubmit={handleSubmit(handleAddPromoCode)} className="px-1">
          <div className="grid grid-cols-12 gap-x-3 gap-y-5">
            {/* promotionName */}
            <div className="space-y-1 col-span-6">
              <label className="block font-medium text-[15px] text-graydark ">
                Ad Title
              </label>
              <Controller
                name="adTitle"
                control={control}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <Input
                      {...field}
                      placeholder="Ad Title"
                      className="!w-full"
                    />
                    <Form.ErrorMessage
                      show={
                        (!!errors?.adTitle &&
                          !!errors?.adTitle?.message) ||
                        false
                      }
                      placement="topEnd"
                    >
                      <span className="font-semibold">
                        {errors?.adTitle?.message}
                      </span>
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>
            {/* promo code */}
            <div className="space-y-1 col-span-6">
              <label className="block font-medium text-[15px] text-graydark ">
                Ad Details
              </label>
              <Controller
                name="adDetails"
                control={control}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper">
                    <Input
                    as = "textarea"
                    rows = {1}
                      {...field}
                      placeholder="Ex: Buy a Backup Buddy and use code 2FOR1 to get a free Active band"
                      className="!w-full !text-capitalize"
                    />
                    <Form.ErrorMessage
                      show={
                        (!!errors?.adDetails && !!errors?.adDetails?.message) ||
                        false
                      }
                      placement="topEnd"
                    >
                      <span className="font-semibold">
                        {errors?.adDetails?.message}
                      </span>
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>
            {/* Start Date */}
            <div className="col-span-6 space-y-1">
              <label className="block font-medium text-[15px] text-graydark ">
                Start Date
              </label>
              <Controller
                name="startDate"
                control={control}
                rules={{ required: " Start Date is required" }}
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
                        (!!errors?.startDate && !!errors?.startDate?.message) ||
                        false
                      }
                      placement="topEnd"
                    >
                      <span className="font-semibold">
                        {errors?.startDate?.message as string}
                      </span>
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>
            {/* End Date */}
            <div className="col-span-6 space-y-1">
              <label className="block font-medium text-[15px] text-graydark ">
                End Date
              </label>
              <Controller
                name="endDate"
                control={control}
                rules={{ required: " End Date is required" }}
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
                        (!!errors?.endDate && !!errors?.endDate?.message) ||
                        false
                      }
                      placement="topEnd"
                    >
                      <span className="font-semibold">
                        {errors?.endDate?.message as string}
                      </span>
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>
    
            {/* Is Active switch */}
            <div className="space-x-5 col-span-12">
              <label htmlFor="isActive" className="font-semibold">
                Enable Ad
              </label>
              <Controller
                control={control}
                name="isActive"
                render={({ field }) => (
                  <Toggle
                    checked={field.value}
                    onChange={() => {
                      field.onChange(!field.value);
                    }}
                    size="md"
                  />
                )}
              />
            </div>
          </div>


          <div className="flex justify-end mt-5">
            <Button
              loading={isLoading}
              type="submit"
              className="!bg-[#3c50e0] !px-6 !text-white  !font-semibold"
              size="lg"
            >
              Publish Ad
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdFormSection;
