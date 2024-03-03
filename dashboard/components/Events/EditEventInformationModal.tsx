"use client";

import { useUpdateEventMutation } from "@/redux/features/eventApi";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Form, Input, Message, Modal, useToaster } from "rsuite";

type IUpdateEvent = {
  name?: string;
  description?: string;
};

const EditInformationModal = ({
  handleClose,
  editData,
  isOpenEdit,
}: {
  handleClose: any;
  editData: any;
  isOpenEdit: boolean;
}) => {
  const toaster = useToaster();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUpdateEvent>();
  const [
    updateEvent,
    { data, isLoading, isSuccess, isError, error, reset: resetReq },
  ] = useUpdateEventMutation();

  const handleCreateHall = async (eventDetails: IUpdateEvent) => {
    await updateEvent({
      data: eventDetails,
      eventId: editData?.eventId,
    });
  };

  useEffect(() => {
    if (isSuccess && !isLoading && !isError && !error && data) {
      handleClose();
      resetReq();
      toaster.push(
        <Message bordered showIcon type="success" closable>
          <h4 className="font-semibold text-2xl">
            {data?.message || "Successfully Updated"}
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
              error?.message ?? "Event Update Failed !"
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

    error,
    resetReq,
    handleClose,
  ]);

  return (
    <div>
      <Modal open={isOpenEdit} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Add a new Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="px-2">
            <form onSubmit={handleSubmit(handleCreateHall)}>
              <div>
                <label htmlFor="name">Event Name</label>

                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <div className="mt-1 rs-form-control-wrapper">
                      <Input
                        id="name"
                        size="lg"
                        defaultValue={editData?.name}
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
                  render={({ field }) => (
                    <div className="mt-1 rs-form-control-wrapper">
                      <Input
                        defaultValue={editData?.description}
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

export default EditInformationModal;
