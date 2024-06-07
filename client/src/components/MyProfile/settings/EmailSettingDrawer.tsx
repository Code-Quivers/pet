"use client";

import { Controller, useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { Button, Checkbox, Drawer, Form } from "rsuite";

const EmailSettingDrawer = ({
  isOpen,
  handleClose,
}: {
  isOpen: boolean;
  handleClose: any;
}) => {
  // !
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm<{
    email: string;
    isSubscribeToGetEmail: string;
  }>();
  // submit
  // const [userLogin, { data, isLoading, isSuccess, isError, error }] =
  //   useUserLoginMutation();

  const handleUpdateEmail = async (updatedEmail: any) => {
    console.log("updatedEmail", updatedEmail);
  };
  return (
    <div>
      <Drawer
        placement="bottom"
        open={isOpen}
        onClose={handleClose}
        closeButton={false}
      >
        <Drawer.Body>
          <div className="max-w-2xl   mx-auto ">
            {/* header */}
            <div className="flex justify-between items-center px-4 py-2">
              <div></div>
              <div className="flex-grow text-center">
                <h2 className="text-2xl font-bold text-pure_black">
                  Edit Email
                </h2>
              </div>
              <div className="ml-auto">
                <button
                  type="button"
                  onClick={handleClose}
                  className="p-1.5 rounded-full duration-300 transition-all
                hover:text-red-600 hover:bg-gray-200"
                >
                  <IoClose size={25} />
                </button>
              </div>
            </div>
            {/* content */}
            <div>
              <form onSubmit={handleSubmit(handleUpdateEmail)}>
                <div className="space-y-5">
                  {/* email */}
                  <div>
                    <label className="text-md font-medium text-gray-600 block mb-2">
                      Email
                    </label>
                    <div className="w-full">
                      <Controller
                        name="email"
                        control={control}
                        rules={{
                          required: "Email is Required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        }}
                        render={({ field }) => (
                          <div className="rs-form-control-wrapper">
                            <input
                              {...field}
                              name="email"
                              type="text"
                              className="w-full bg-transparent rounded-md text-sm border-2 border-gray-300 focus:border-primary  px-2 py-3 outline-none"
                              placeholder="Enter Email..."
                            />
                            <Form.ErrorMessage
                              show={
                                (!!errors?.email && !!errors?.email?.message) ||
                                false
                              }
                              placement="topEnd"
                            >
                              <span className="font-semibold">
                                {errors?.email?.message}
                              </span>
                            </Form.ErrorMessage>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                  {/* subscribe */}
                  <div>
                    <div className="w-full">
                      <Controller
                        disabled
                        name="isSubscribeToGetEmail"
                        control={control}
                        render={({ field }) => (
                          <div className="rs-form-control-wrapper">
                            <Checkbox {...field} defaultChecked>
                              Allow to send you email alerts when your kids tag
                              is scanned.
                            </Checkbox>

                            <Form.ErrorMessage
                              show={
                                (!!errors?.isSubscribeToGetEmail &&
                                  !!errors?.isSubscribeToGetEmail?.message) ||
                                false
                              }
                              placement="topEnd"
                            >
                              <span className="font-semibold">
                                {errors?.isSubscribeToGetEmail?.message}
                              </span>
                            </Form.ErrorMessage>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </div>
                {/* submit handler */}
                <div className="mt-12">
                  <Button
                    type="submit"
                    size="lg"
                    className="!bg-primary/90 duration-300 transition-all hover:!bg-primary !text-white  !font-bold !rounded-lg"
                    block
                  >
                    Update Email
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </Drawer.Body>
      </Drawer>
    </div>
  );
};

export default EmailSettingDrawer;
