"use client";
import { useGetAllHallsQuery } from "@/redux/features/hallApi";
import { ICreateEvent } from "@/types/forms/event.types";
import { useEffect, useState } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import {
  Button,
  DatePicker,
  Form,
  InputPicker,
  Message,
  SelectPicker,
  TagPicker,
  useToaster,
} from "rsuite";
import { renderLoading } from "../animation/form/SelectPicker/renderLoading";
import { useAddSubEventMutation } from "@/redux/features/subEventApi";
import { useGetAllEventsQuery } from "@/redux/features/eventApi";
import { useRouter } from "next/navigation";

const eventDateTitles = ["Set", "Event", "Break Down"].map((item) => ({
  label: item,
  value: item,
}));

const AddEventPage = () => {
  const hallQuery: Record<string, any> = {};
  const eventQuery: Record<string, any> = {};
  const [hallSearch, setHallSearch] = useState("");
  hallQuery["searchTerm"] = hallSearch;
  const [eventSearch, setEventSearch] = useState("");
  eventQuery["searchTerm"] = eventSearch;
  const { data: allHalls, isLoading: isLoadingAllHalls } = useGetAllHallsQuery({
    ...hallQuery,
  });
  const { data: allEvents, isLoading: isLoadingAllEvents } =
    useGetAllEventsQuery({
      ...eventQuery,
    });

  const toaster = useToaster();
  const router = useRouter();

  const [addSubEvent, { data, isLoading, isSuccess, isError, error }] =
    useAddSubEventMutation();

  // Form handling
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm<any>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "eventDates",
  });

  const handleAddEventDates = () => {
    append({}); // Append an empty event date object
  };

  const handleRemoveEventDates = (index: number) => {
    remove(index); // Remove the event date at the specified index
  };

  const handleCreateNewEventDate: SubmitHandler<any> = async (data) => {
    // Extracting necessary fields from the form data
    const { eventDate, title, eventId, hallId } = data;

    // Mapping over event dates to format them properly
    data.eventDates = data.eventDates.map((subEvent: any) => ({
      ...subEvent, // Assuming eventDate is a Date object
      eventId: data.eventId,
      hallId: data.hallId,
    }));

    const currentDate = data.eventDates || [];

    const newObj = {
      eventDate,
      title,
      eventId,
      hallId,
    };

    //push in first array
    currentDate.unshift(newObj);

    console.log("currentDate", currentDate);

    await addSubEvent(currentDate);
  };

  useEffect(() => {
    if (isSuccess && !isLoading && !isError && !error && data) {
      formReset({
        eventId: "",
        hallId: "",
        eventDate: "",
        title: "",
      });
      toaster.push(
        <Message bordered showIcon type="success" closable>
          <h4 className="font-semibold text-2xl">
            {data?.message || "Successfully added event"}
          </h4>
        </Message>,
        { placement: "topEnd", duration: 2000 }
      );
      router.push("/events");
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
  }, [isSuccess, isLoading, isError, data, toaster, formReset, error, router]);

  return (
    <div>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Add Event Form
          </h3>
        </div>
        <form onSubmit={handleSubmit(handleCreateNewEventDate)}>
          <div className="p-6.5">
            {/* event and hall select */}
            <div className="mb-4.5 grid grid-cols-2 gap-6 xl:flex-row">
              <div className="w-full col-span-1">
                <label className="mb-2.5 block text-black dark:text-white">
                  Event Name
                </label>
                <Controller
                  name="eventId"
                  control={control}
                  rules={{ required: "Event is Required" }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <SelectPicker
                        placement="auto"
                        size="lg"
                        data={
                          allEvents?.data?.map((single: any) => {
                            return {
                              label: single?.name,
                              value: single?.eventId,
                            };
                          }) || []
                        }
                        value={field.value}
                        onChange={(value: string | null) =>
                          field.onChange(value)
                        }
                        onSearch={(value: string) => {
                          setHallSearch(value as string);
                        }}
                        style={{
                          width: "100%",
                        }}
                        placeholder="Select Event"
                        renderMenu={(menu) =>
                          renderLoading(menu, isLoadingAllEvents)
                        }
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.eventId && !!errors?.eventId?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.eventId?.message as string}
                        </span>
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>

              <div className="w-full col-span-1 over">
                <label className="mb-2.5 block text-black dark:text-white">
                  Hall Name
                </label>

                <Controller
                  name="hallId"
                  control={control}
                  rules={{ required: "Hall is Required" }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <TagPicker
                        placement="auto"
                        searchable
                        size="lg"
                        data={
                          allHalls?.data?.map((single: any) => {
                            return {
                              label: single?.hallName,
                              value: single?.hallId,
                            };
                          }) || []
                        }
                        onChange={(value: string | null) =>
                          field.onChange(value)
                        }
                        onSearch={(value: string) => {
                          setHallSearch(value as string);
                        }}
                        value={field.value}
                        placeholder="Select Hall"
                        renderMenu={(menu) =>
                          renderLoading(menu, isLoadingAllHalls)
                        }
                        className="!w-full"
                      />

                      <Form.ErrorMessage
                        show={
                          (!!errors?.hallId && !!errors?.hallId?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.hallId?.message as string}
                        </span>
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
            </div>

            {/* event date and title */}
            <div className="mb-4.5 grid grid-cols-2 gap-6 xl:flex-row">
              <div className="w-full  ">
                <label
                  htmlFor="eventDate"
                  className="mb-2.5 block text-black dark:text-white"
                >
                  Event Date
                </label>
                <Controller
                  name="eventDate"
                  control={control}
                  rules={{ required: "Event Date is required" }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
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
                          (!!errors?.eventDate &&
                            !!errors?.eventDate?.message) ||
                          false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.eventDate?.message as string}
                        </span>
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
                {/* Display error message */}
              </div>

              <div className="w-full   over">
                <label
                  htmlFor="title"
                  className="mb-2.5 block text-black dark:text-white"
                >
                  Date Title
                </label>
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: "Date Title is Required" }}
                  render={({ field }) => (
                    <div className="rs-form-control-wrapper">
                      <SelectPicker
                        data={eventDateTitles}
                        block
                        size="lg"
                        placement="auto"
                        onChange={(value) => field.onChange(value)} // Assuming SelectPicker has onChange prop
                        onBlur={field.onBlur} // Assuming SelectPicker has onBlur prop
                        value={field.value} // Assuming SelectPicker has value prop
                      />
                      <Form.ErrorMessage
                        show={
                          (!!errors?.title && !!errors?.title?.message) || false
                        }
                        placement="topEnd"
                      >
                        <span className="font-semibold">
                          {errors?.title?.message as string}
                        </span>
                      </Form.ErrorMessage>
                    </div>
                  )}
                />
              </div>
            </div>

            {/* event dates array */}
            <div className="flex flex-col gap-3">
              {fields?.map((field, index) => {
                return (
                  <div key={field.id} className="border-b py-5 px-2">
                    <div className="">
                      <div className="flex justify-between  ">
                        <div>
                          <h3 className="border border-black px-5">
                            Date {index + 2}
                          </h3>
                        </div>
                        <div>
                          {/* Conditionally render the "Remove" button */}
                          {fields.length > 0 && (
                            <button
                              type="button"
                              className="border px-3"
                              onClick={() => handleRemoveEventDates(index)}
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="mb-4.5 grid grid-cols-2 gap-6 ">
                        <div className="w-full xl:w-1/2">
                          <label
                            htmlFor={`eventDate-${index}`}
                            className="mb-2.5 block text-black dark:text-white"
                          >
                            Event Date
                          </label>
                          <Controller
                            name={
                              `eventDates[${index}].eventDate` as `eventDate.${string}`
                            }
                            control={control}
                            // rules={{ required: "Event Date is required" }}
                            render={({ field }) => (
                              <div className="rs-form-control-wrapper">
                                <DatePicker
                                  block
                                  size="lg"
                                  editable={false}
                                  value={
                                    field.value ? new Date(field.value) : null
                                  }
                                  onChange={(value: Date | null): void => {
                                    if (value) {
                                      const isoString = value.toISOString();
                                      field.onChange(isoString);
                                    } else {
                                      field.onChange(null);
                                    }
                                  }}
                                />

                                {/* <Form.ErrorMessage placement="topEnd">
                                  <span className="font-semibold">
                                    eventDate is required
                                  </span>
                                </Form.ErrorMessage> */}
                              </div>
                            )}
                          />
                          {/* Display error message */}
                        </div>

                        <div className="w-full xl:w-1/2 over">
                          <label
                            htmlFor={`title-${index}`}
                            className="mb-2.5 block text-black dark:text-white"
                          >
                            Date Title
                          </label>
                          <Controller
                            defaultValue=""
                            name={
                              `eventDates[${index}].title` as `title.${string}`
                            }
                            control={control}
                            // rules={{ required: "Date Title is Required" }}
                            render={({ field }) => (
                              <div className="rs-form-control-wrapper">
                                <InputPicker
                                  creatable
                                  data={eventDateTitles}
                                  block
                                  size="lg"
                                  {...field}
                                />

                                {/* <Form.ErrorMessage
                                  show={!!errors?.event?.[index]?.title}
                                  placement="topEnd"
                                >
                                  <span className="font-semibold">
                                    {errors?.event?.[index]?.title?.message}
                                  </span>
                                </Form.ErrorMessage> */}
                              </div>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="">
              <button
                type="button"
                onClick={handleAddEventDates}
                className="flex justify-center rounded hover:underline font-medium text-primary mb-4 cursor-pointer"
              >
                Add a new Date and Title
              </button>
            </div>

            {/* submit button */}
            <div className="flex justify-end">
              <Button
                loading={isLoading}
                type="submit"
                className=" !bg-primary !p-3 !font-medium !text-gray"
              >
                Create Event
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventPage;
