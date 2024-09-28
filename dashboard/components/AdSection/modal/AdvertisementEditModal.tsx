"use client";

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
  Toggle,
  useToaster,
} from "rsuite";

import { useEffect, useState } from "react";

import { isActiveBoolean, promoTypeEnums } from "@/helpers/constant";

import { useUpdatePromoMutation } from "@/redux/features/promoCodeApi";
import { IEditAdDetails, IUpdateProductPromo } from "@/types/forms/product";
import { useUpdateAdvertisementMutation } from "@/redux/features/adAPi";

const AdvertisementEditModal = ({ isOpenEdit, handleCloseEdit, editData }: any) => {
  const query: Record<string, any> = {};

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm<IEditAdDetails>();




  const toaster = useToaster();
  const [
    updateAdvertisement ,
    { data, isLoading, isSuccess, isError, error, reset: resetReq },
  ] = useUpdateAdvertisementMutation();

  const handleUpdateProductPromo = async (updatedData: IEditAdDetails) => {
    const objData = {
      adTitle: updatedData.adTitle,
      adDetails: updatedData.adDetails,
      startDate: updatedData.startDate,
      endDate: updatedData.endDate,
      isActive: updatedData.isActive,
    };

    await updateAdvertisement({
      data: objData,
      adId: editData?.adId,
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
            <span className="text-sm font-semibold ">Edit Advertisement</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form
              onSubmit={handleSubmit(handleUpdateProductPromo)}
              className="px-1"
            >
              <div className="my-3 grid grid-cols-1 items-center gap-3">
          
              {/*Advertisement Name */}
                <div>
                  <label className="block font-medium text-black ">
                    Ad Title
                  </label>
                  <Controller
                    name="adTitle"
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper">
                        <Input
                          {...field}
                          defaultValue={editData?.adTitle}
                          placeholder="Write Ad Title"
                          className="!w-full !text-capitalize"
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

                <div>
                  <label className="block font-medium text-black ">
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
                          defaultValue={editData?.adDetails}
                          placeholder="Write promo Code like ET2024"
                          className="!w-full !text-capitalize"
                        />
                        <Form.ErrorMessage
                          show={
                            (!!errors?.adDetails &&
                              !!errors?.adDetails?.message) ||
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
              </div>


              <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-3 my-3">
                {/* Expire Date */}
                <div className="space-y-1">
                  <label className="block font-medium text-black ">
                    Start Date
                  </label>
                  <Controller
                    name="startDate"
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper w-full">
                        <DatePicker
                          defaultValue={new Date(editData?.startDate)}
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
                            (!!errors?.startDate &&
                              !!errors?.startDate?.message) ||
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
                <div className="space-y-1">
                  <label className="block font-medium text-black ">
                    End Date
                  </label>
                  <Controller
                    name="endDate"
                    control={control}
                    render={({ field }) => (
                      <div className="rs-form-control-wrapper w-full">
                        <DatePicker
                          defaultValue={new Date(editData?.endDate)}
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

                <div className="space-y-1">
  <label className="block font-medium text-black ">
    Advertisement is Active
  </label>
  <Controller
    name="isActive"
    defaultValue={editData?.isActive}
    control={control}
    render={({ field }) => (
      <div className="rs-form-control-wrapper">
        <Toggle
          size="lg"
          checked={field.value} 
          onChange={(checked: any) => field.onChange(checked)}
          style={{
            width: "100%",
          }}
        />
      </div>
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
                  Edit Advertisement
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdvertisementEditModal;
