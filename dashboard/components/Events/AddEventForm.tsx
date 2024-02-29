"use client";

import { useAddEventMutation } from "@/redux/features/eventApi";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Form, Input, Message, Modal, useToaster } from "rsuite";

type ICreateEvent = {
  name: string;
  description: string;
};

const AddEventForm = () => {
  const toaster = useToaster();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm<ICreateEvent>();
  const [
    addEvent,
    { data, isLoading, isSuccess, isError, error, reset: resetReq },
  ] = useAddEventMutation();

  const handleCreateHall = async (eventDetails: ICreateEvent) => {
    await addEvent(eventDetails);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isSuccess && !isLoading && !isError && !error && data) {
      formReset({
        name: "",
        description: "",
      });
      handleClose();
      resetReq();
      toaster.push(
        <Message bordered showIcon type="success" closable>
          <h4 className="font-semibold text-2xl">
            {data?.message || "Successfully added event"}
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
              error?.message ?? "Event add Failed !"
            }
          </h4>
        </Message>,
        { placement: "topEnd", duration: 2000 }
      );
    }
  }, [
    isSuccess,
    isLoading,
    isError,
    data,
    toaster,
    formReset,
    error,
    resetReq,
  ]);

  return (
    <div>
      <div>
        <Button
          onClick={handleOpen}
          className="!bg-primary !px-5 !rounded-full !text-white"
        >
          Add Event
        </Button>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Add a new Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="px-2 ">
            <form onSubmit={handleSubmit(handleCreateHall)}>
              <div>
                <label htmlFor="name">Event Name</label>

                <Controller
                  name="name"
                  control={control}
                  rules={{
                    required: "Event Name is Required ",
                  }}
                  render={({ field }) => (
                    <div className="mt-1 rs-form-control-wrapper">
                      <Input
                        id="name"
                        size="lg"
                        autoComplete="false"
                        autoSave="false"
                        {...field}
                        placeholder="Enter Event Name..."
                        className="!w-full !py-3 "
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.name && !!errors?.name?.message) || false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.name?.message}
                        </span>
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
              <div className="mt-1">
                <label htmlFor="hallName">Event Description</label>

                <Controller
                  name="description"
                  control={control}
                  rules={{
                    required: "Event Description is Required ",
                  }}
                  render={({ field }) => (
                    <div className="mt-1 rs-form-control-wrapper">
                      <Input
                        id="description"
                        as="textarea"
                        size="lg"
                        rows={5}
                        autoComplete="false"
                        autoSave="false"
                        {...field}
                        placeholder="Enter Event Description..."
                        className="!w-full !py-3 "
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.description &&
                            !!errors?.description?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.description?.message}
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
                  className="!bg-primary !text-white !px-6"
                >
                  Create Event
                </Button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddEventForm;
