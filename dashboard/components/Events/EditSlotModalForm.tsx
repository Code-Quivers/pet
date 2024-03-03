"use client";
import {
  DatePicker,
  Form,
  InputGroup,
  Message,
  Modal,
  useToaster,
} from "rsuite";
import { Controller, useForm } from "react-hook-form";
import { Button } from "rsuite";
import { useEffect } from "react";
import { useEditSlotMutation } from "@/redux/features/slotApi";

type IUpdateSlot = {
  startTime?: Date;
  endTime?: Date;
};

const EditSlotModalForm = ({ isOpenEdit, handleClose, editData }: any) => {
  const [updateSlot, { data, isSuccess, isError, isLoading, error, reset }] =
    useEditSlotMutation();
  const toaster = useToaster();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm<IUpdateSlot>();

  const handleUpdateSlot = async (newData: IUpdateSlot) => {
    await updateSlot({
      slotId: editData?.slotId,
      data: newData,
    });
  };

  useEffect(() => {
    if (isSuccess && !isError && !isLoading) {
      toaster.push(
        <Message bordered showIcon type="success" closable>
          <h4 className="font-semibold ">
            {data?.message || "Category Updated"}
          </h4>
        </Message>,
        { placement: "topEnd", duration: 2000 }
      );
      reset();
      handleClose();
      formReset();
    }
    if (!isSuccess && isError && !isLoading && error) {
      toaster.push(
        <Message bordered showIcon type="error" closable>
          <h4 className="font-semibold ">
            {
              // @ts-ignore
              error?.message || "Category Creation Failed"
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
    handleClose,
    isError,
    isLoading,
    isSuccess,
    reset,
    toaster,
  ]);

  const handleModalClose = () => {
    handleClose();
    reset();
    formReset();
  };
  return (
    <div>
      <Modal backdrop="static" open={isOpenEdit} onClose={handleModalClose}>
        <Modal.Header>
          <Modal.Title>Edit Slot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="px-1">
            <form onSubmit={handleSubmit(handleUpdateSlot)}>
              <div className="flex flex-col  sm:flex-row lg:flex-col justify-between max-xl:items-start">
                <div>
                  <label htmlFor="hallName">Slot Time Range</label>

                  <div className="mt-1 ">
                    <InputGroup className="max-sm:flex max-sm:flex-col">
                      <Controller
                        name="startTime"
                        control={control}
                        render={({ field }) => (
                          <div className="rs-form-control-wrapper">
                            <DatePicker
                              defaultValue={
                                editData?.startTime !== null
                                  ? new Date(editData?.startTime)
                                  : undefined
                              }
                              placement="bottomStart"
                              format="hh:mm"
                              block
                              editable={false}
                              {...field}
                              size="lg"
                              placeholder="Slot Start"
                              appearance="subtle"
                            />
                            <Form.ErrorMessage
                              show={
                                (!!errors?.startTime &&
                                  !!errors?.startTime?.message) ||
                                false
                              }
                              placement="topEnd"
                            >
                              <span className="font-semibold">
                                {errors?.startTime?.message}
                              </span>
                            </Form.ErrorMessage>
                          </div>
                        )}
                      />
                      <InputGroup.Addon>
                        <span className="text-lg font-medium">to</span>
                      </InputGroup.Addon>
                      <Controller
                        name="endTime"
                        control={control}
                        render={({ field }) => (
                          <div className="rs-form-control-wrapper">
                            <DatePicker
                              editable={false}
                              {...field}
                              defaultValue={
                                editData?.endTime !== null
                                  ? new Date(editData?.endTime)
                                  : undefined
                              }
                              format="hh:mm"
                              placement="bottomEnd"
                              block
                              name="Slot End"
                              size="lg"
                              appearance="default"
                              placeholder="Slot End"
                              style={{ width: 230 }}
                            />
                            <Form.ErrorMessage
                              show={
                                (!!errors?.endTime &&
                                  !!errors?.endTime?.message) ||
                                false
                              }
                              placement="topEnd"
                            >
                              <span className="font-semibold">
                                {errors?.endTime?.message}
                              </span>
                            </Form.ErrorMessage>
                          </div>
                        )}
                      />
                    </InputGroup>
                  </div>
                </div>
                <div className="flex justify-end mt-3 ">
                  <Button
                    loading={isLoading}
                    type="submit"
                    className="!bg-[#3c50e0] !px-5 !text-sm !text-white  !font-semibold"
                    size="lg"
                  >
                    Update
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditSlotModalForm;
