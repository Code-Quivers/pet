"use client";

import { Controller, useForm } from "react-hook-form";
import {
  Button,
  DatePicker,
  Form,
  InputGroup,
  Message,
  useToaster,
} from "rsuite";
import { useEffect } from "react";

import AllSlotListTable from "./AllSlotListTable";
import { useAddSlotMutation } from "@/redux/features/slotApi";
type ICreateSlot = {
  startTime: Date | null;
  endTime: Date | null;
};

const AddSlot = () => {
  const toaster = useToaster();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm<ICreateSlot>();
  const [addSlot, { data, isLoading, isSuccess, isError, error }] =
    useAddSlotMutation();

  const handleCreateHall = async (slotData: ICreateSlot) => {
    await addSlot(slotData);
  };

  useEffect(() => {
    if (isSuccess && !isLoading && !isError && !error && data) {
      formReset({
        endTime: null,
        startTime: null,
      });
      toaster.push(
        <Message bordered showIcon type="success" closable>
          <h4 className="font-semibold text-2xl">
            {data?.message || "Successfully created hall"}
          </h4>
        </Message>,
        { placement: "topEnd", duration: 2000 }
      );
    }
    if (!isSuccess && !isLoading && isError && error) {
      toaster.push(
        <Message bordered centered showIcon type="error" closable>
          <h4 className="font-semibold text-2xl">
            {
              // @ts-ignore
              error?.message ?? "Login Failed. try again !"
            }
          </h4>
        </Message>,
        { placement: "topEnd", duration: 2000 }
      );
    }
  }, [isSuccess, isLoading, isError, data, toaster, formReset, error]);

  return (
    <div className="rounded-sm border border-stroke bg-white p-3 shadow-default dark:border-strokedark dark:bg-boxdark  ">
      <div className="grid grid-cols-1 xl:grid-cols-7      justify-start items-start p gap-5 relative">
        <div className="xl:col-span-3 border shadow-default    p-3 xl:p-5 border-stroke dark:border-strokedark">
          <form onSubmit={handleSubmit(handleCreateHall)}>
            <div>
              <label htmlFor="hallName">Slot Time Range</label>
              <div className="flex flex-col  sm:flex-row lg:flex-col justify-between max-xl:items-center">
                <div>
                  <div className="mt-1 ">
                    <InputGroup className="max-sm:flex max-sm:flex-col">
                      <Controller
                        name="startTime"
                        control={control}
                        rules={{
                          required: "Start Time is Required ",
                        }}
                        render={({ field }) => (
                          <div className="rs-form-control-wrapper">
                            <DatePicker
                              placement="bottomStart"
                              format="hh:mm"
                              block
                              editable={false}
                              onChange={(value: Date | null): void => {
                                if (value) {
                                  const isoString = value.toISOString();
                                  field.onChange(isoString);
                                } else {
                                  field.onChange(null);
                                }
                              }}
                              size="lg"
                              placeholder="Slot Start"
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
                        rules={{
                          required: "End Time is Required ",
                        }}
                        render={({ field }) => (
                          <div className="rs-form-control-wrapper">
                            <DatePicker
                              editable={false}
                              format="hh:mm"
                              placement="bottomEnd"
                              block
                              name="Slot End"
                              size="lg"
                              appearance="default"
                              placeholder="Slot End"
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
                              show={!!errors?.endTime}
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
                <div className="mt-3">
                  <Button
                    type="submit"
                    size="lg"
                    className="!bg-primary !rounded-full !text-white !px-6"
                  >
                    Create New Slot
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
        {/* all slot list */}

        <div className="xl:col-span-4">
          <AllSlotListTable />
        </div>
      </div>
    </div>
  );
};

export default AddSlot;
