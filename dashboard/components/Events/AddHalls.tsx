"use client";

import { Controller, useForm } from "react-hook-form";
import AllHalls from "./AllHalls";
import { Button, Form, Input, Message, useToaster } from "rsuite";
import { useCreateHallMutation } from "@/redux/features/productColorApi";
import { useEffect } from "react";

type ICreateHall = {
  hallName: string;
};

const AddHalls = () => {
  const toaster = useToaster();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm<ICreateHall>();
  const [createHall, { data, isLoading, isSuccess, isError, error }] =
    useCreateHallMutation();

  const handleCreateHall = async (hallDetails: ICreateHall) => {
    await createHall(hallDetails);
  };

  useEffect(() => {
    if (isSuccess && !isLoading && !isError && !error && data) {
      formReset({
        hallName: "",
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
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="grid grid-cols-1 xl:grid-cols-6 divide-x-2 divide-[#eeeeee] pb-5  justify-start items-start gap-3 relative">
        <div className="col-span-2  ">
          <form onSubmit={handleSubmit(handleCreateHall)}>
            <div>
              <label htmlFor="hallName">Add New Hall</label>

              <Controller
                name="hallName"
                control={control}
                rules={{
                  required: "Hall Name is Required ",
                }}
                render={({ field }) => (
                  <div className="mt-1 rs-form-control-wrapper">
                    <Input
                      id="hallName"
                      size="lg"
                      autoComplete="false"
                      autoSave="false"
                      {...field}
                      placeholder="Enter Hall Name..."
                      className="!w-full !py-3 "
                    />
                    <Form.ErrorMessage
                      show={
                        (!!errors?.hallName && !!errors?.hallName?.message) ||
                        false
                      }
                      placement="topEnd"
                    >
                      <span className="font-semibold">
                        {errors?.hallName?.message}
                      </span>
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>
            <div className="mt-3">
              <Button
                loading={isLoading}
                type="submit"
                size="lg"
                className="!bg-primary !text-white !px-6 w-full"
              >
                Create Hall
              </Button>
            </div>
          </form>
        </div>
        <div className="col-span-4">
          <h2 className="font-semibold pb-2">All Halls Name</h2>
          <div className="">
            <AllHalls />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHalls;
