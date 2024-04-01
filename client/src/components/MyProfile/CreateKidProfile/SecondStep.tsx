"use client";

import { Button, Form, Message, useToaster } from "rsuite";
import { Controller, useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";
import MyContacts from "./MyContacts";
import { FileType } from "rsuite/esm/Uploader";
import UploadKidPhoto from "./UploadKidPhoto";
import { useAddKidMutation } from "@/redux/api/features/kids/kidApi";
import { useRouter } from "next/navigation";

type IRelations = {
  name: string;
  relation: string;
  phoneNo: string;
};

type ICreateKid = {
  name: string;
  age: string;
  kidImage: FileType;
  relations: IRelations[];
};

const SecondStep = ({
  setStep,
  barCode,
}: {
  setStep: Dispatch<SetStateAction<number>>;
  barCode: string;
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<ICreateKid>({
    defaultValues: {
      relations: [
        {
          name: "",
          relation: "",
          phoneNo: "",
        },
      ],
    },
  });

  const { relations } = watch();

  // submit
  const [
    addKid,
    { data, isLoading, isSuccess, isError, error, reset: resetReq },
  ] = useAddKidMutation();

  const handleCreateKid = async (kidInfo: ICreateKid) => {
    // creating form data
    const formData = new FormData();

    // Construct the  object
    const kidData = {
      code: barCode,
      name: kidInfo?.name,
      age: parseInt(kidInfo?.age),
      relations: kidInfo?.relations,
    };

    // Convert kid object to JSON string
    const kidJSON = JSON.stringify(kidData);
    // Append image to formData
    if (kidInfo?.kidImage && kidInfo?.kidImage?.blobFile) {
      formData.append("file", kidInfo?.kidImage?.blobFile as Blob);
    }

    // appending all data to formData
    formData.append("data", kidJSON);
    console.log(kidData);
    // await addKid(formData);
  };
  // ! side effect
  const toaster = useToaster();
  const router = useRouter();

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
      router.push("/products");
      resetReq();
    }
    if (!isSuccess && isError && !isLoading && error) {
      toaster.push(
        <Message bordered showIcon type="error" closable>
          <h4 className="font-semibold ">
            {
              // @ts-ignore
              error?.message || "Failed to Create"
            }
          </h4>
        </Message>,
        { placement: "topEnd", duration: 2000 }
      );
    }
  }, [
    data?.message,
    error,
    isError,
    isLoading,
    isSuccess,
    resetReq,
    router,
    toaster,
  ]);

  return (
    <div className="text-center py-10">
      <h2 className="text-center text-4xl font-bold">Create New Kid</h2>
      <p className="pt-2 text-lg text-gray-500 w-3/4 md:w-3/6 mx-auto">
        Step two: Enter information about your kid.
      </p>
      <form
        onSubmit={handleSubmit(handleCreateKid)}
        className="mt-10 max-w-4xl mx-auto px-5"
      >
        {/* kid name and pet age */}
        <div className="w-full flex justify-center  my-10">
          {/* product featured image */}
          <div className="space-y-4">
            <h1 className="text-xl mb-1 font-medium max-md:my-2">
              Upload Kid Photo
            </h1>
            <div>
              <Controller
                control={control}
                name="kidImage"
                rules={{
                  required: "Image is Required !!",
                }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper  w-full">
                    <UploadKidPhoto field={field} />
                    <Form.ErrorMessage
                      show={
                        (!!errors?.kidImage && !!errors?.kidImage?.message) ||
                        false
                      }
                      placement="topEnd"
                    >
                      <span>{errors?.kidImage?.message as string}</span>
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>
          </div>
        </div>
        {/* name and age */}
        <div className="grid md:grid-cols-2 gap-3  ">
          {/* name */}
          <div className="flex flex-col w-full gap-2">
            <label className="text-start block ">Enter name</label>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Kid Name is Required !!" }}
              render={({ field }) => (
                <div className="rs-form-control-wrapper ">
                  <input
                    {...field}
                    name="name"
                    type="text"
                    className="w-full bg-transparent text-sm border shadow-sm border-gray-400 focus:border-cyan-400 px-2 py-3 outline-none rounded-lg "
                    placeholder="Enter kid name"
                  />
                  <Form.ErrorMessage
                    show={(!!errors?.name && !!errors?.name?.message) || false}
                    placement="topEnd"
                  >
                    <span>{errors?.name?.message as string}</span>
                  </Form.ErrorMessage>
                </div>
              )}
            />
          </div>

          {/* Kid Age */}
          <div className="flex flex-col w-full gap-2">
            <label className="text-base text-start block ">Kid Age</label>
            <Controller
              name="age"
              control={control}
              rules={{
                required: "Kid Age is Required !!",
                validate: (value) =>
                  (parseInt(value) >= 0 && value !== "-0") ||
                  "Age must be greater than or equal to 0",
              }}
              render={({ field }) => (
                <div className="rs-form-control-wrapper ">
                  <input
                    {...field}
                    name="name"
                    type="number"
                    className="w-full bg-transparent text-sm border shadow-sm border-gray-400 focus:border-cyan-400 px-2 py-3 outline-none rounded-lg "
                    placeholder="Kid Age"
                  />
                  <Form.ErrorMessage
                    show={(!!errors?.age && !!errors?.age?.message) || false}
                    placement="topEnd"
                  >
                    <span>{errors?.age?.message as string}</span>
                  </Form.ErrorMessage>
                </div>
              )}
            />
          </div>
        </div>
        {/* Contact person Information */}
        <div className="text-center py-10">
          <h2 className="text-xl font-semibold pb-2">My Contacts</h2>
          <p className="text-sm text-gray-500">
            Add your contact Information as much as you want
          </p>
        </div>
        {/* contacts */}
        <div>
          <MyContacts errors={errors} control={control} />
        </div>

        {/*  */}

        <div className="flex justify-end">
          <button
            type="button"
            className="
          hover:text-cyan-600 hover:underline px-4 py-2 font-bold text-gray-700 transition-all duration-300 ease-in-out delay-0`}
          "
            onClick={() => setStep(0)}
          >
            Previous
          </button>
          <Button
            disabled={!relations?.length}
            type="submit"
            className="!bg-primary !text-white
          px-4 py-2 font-bold transition-all duration-300 ease-in-out delay-0`}
          "
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SecondStep;
