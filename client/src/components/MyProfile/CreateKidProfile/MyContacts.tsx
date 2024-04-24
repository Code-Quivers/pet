"use client";

import { HiPlus } from "react-icons/hi";
import { Form } from "rsuite";
import { Controller, useFieldArray } from "react-hook-form";

const MyContacts = ({
  control,
  errors, 
}: {
  control: any;
  errors: any; 
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "relations",
  });

  return (
    <div>
      {fields?.map((fieldName, index) => (
        <div
          key={fieldName?.id}
          className={`${
            index === fields.length - 1
              ? ""
              : "border-b-[#d1d5db] pb-5 border-b "
          }   my-3`}
        >
          <div className="mb-3 flex justify-between">
            <h1 className="text-xl">Contact {index + 1}</h1>
            <span
              onClick={() => {
                remove(index);
              }}
              className="cursor-pointer hover:text-[#ef4444]"
            >
              Remove
            </span>
          </div>
          <div className="grid md:grid-cols-3 text-start  gap-3">
            {/* input form  */}

            {/*   name */}
            <div className="w-full">
              <label htmlFor="color" className="font-medium text-sm">
                Name
              </label>
              <Controller
                name={`relations[${index}].name`}
                control={control}
                rules={{ required: "Name is Required !!" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper ">
                    <input
                      {...field}
                      type="text"
                      placeholder="Contact person name"
                      className="w-full bg-transparent text-sm shadow-sm border border-gray-400 focus:border-cyan-400 px-2 py-3 outline-none rounded-lg"
                    />
                    <Form.ErrorMessage
                      show={
                        errors?.relations?.length &&
                        !!errors?.relations[index]?.name
                      }
                      placement="topEnd"
                    >
                      <span>
                        {errors?.relations?.length &&
                          ((errors?.relations[index]?.name
                            ?.message as string) ||
                            "Required")}
                      </span>
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>

            {/* relation */}
            <div className="w-full">
              <label htmlFor="color" className="font-medium text-sm">
                Relation
              </label>
              <Controller
                name={`relations[${index}].relation`}
                control={control}
                rules={{ required: "Relation is Required !!" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper ">
                    <input
                      {...field}
                      type="text"
                      placeholder="Contact person name"
                      className="w-full bg-transparent text-sm shadow-sm border border-gray-400 focus:border-cyan-400 px-2 py-3 outline-none rounded-lg"
                    />
                    <Form.ErrorMessage
                      show={
                        errors?.relations?.length &&
                        !!errors?.relations[index]?.relation
                      }
                      placement="topEnd"
                    >
                      <span>
                        {errors?.relations?.length &&
                          ((errors?.relations[index]?.relation
                            ?.message as string) ||
                            "Required")}
                      </span>
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>

            {/* cell number */}

            <div className="w-full">
              <label htmlFor="color" className="font-medium text-sm">
                Cell Number
              </label>
              <Controller
                name={`relations[${index}].phoneNo`}
                control={control}
                rules={{ required: "Number is Required !!" }}
                render={({ field }) => (
                  <div className="rs-form-control-wrapper ">
                    <input
                      {...field}
                      type="text"
                      placeholder="Cell Number"
                      className="w-full bg-transparent text-sm shadow-sm border border-gray-400 focus:border-cyan-400 px-2 py-3 outline-none rounded-lg"
                    />
                    <Form.ErrorMessage
                      show={
                        errors?.relations?.length &&
                        !!errors?.relations[index]?.phoneNo
                      }
                      placement="topEnd"
                    >
                      <span>
                        {errors?.relations?.length &&
                          ((errors?.relations[index]?.phoneNo
                            ?.message as string) ||
                            "Required")}
                      </span>
                    </Form.ErrorMessage>
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-start">
        <button
          type="button"
          onClick={() => {
            append({
              name: "",
              relation: "",
              phoneNo: "",
            });
          }}
          className="text-start  py-2   text-md
          text-[#3f84de]  hover:underline cursor-pointer  flex items-center gap-2 
          "
        >
          <HiPlus className="inline-block" />
          Add new contact
        </button>
      </div>
    </div>
  );
};

export default MyContacts;
