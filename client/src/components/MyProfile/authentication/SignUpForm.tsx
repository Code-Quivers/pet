"use client";

import { storeUserInfo } from "@/hooks/services/auth.service";
import { useRegistrationMutation } from "@/redux/api/authApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Form, Message, useToaster } from "rsuite";

type ISignUp = {
  fullName: string;
  email: string;
  password: string;
};

const SignUpForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset: formReset,
  } = useForm<ISignUp>();
  // submit and register
  const [registration, { data, isLoading, isSuccess, isError, error }] =
    useRegistrationMutation();

  const handleSignUp = async (registerData: any) => {
    const res: any = await registration({ data: registerData }).unwrap();

    if (res?.data?.accessToken) {
      storeUserInfo({ accessToken: res?.data?.accessToken });
    }
  };

  // ! side effect
  const toaster = useToaster();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess && !isError && !isLoading) {
      toaster.push(
        <Message bordered showIcon type="success" closable>
          <h4 className="font-semibold ">
            {data?.message || "Successfully Signed Up"}
          </h4>
        </Message>,
        { placement: "topEnd", duration: 2000 }
      );
      router.push("/my-account");
    }
    if (!isSuccess && isError && !isLoading && error) {
      toaster.push(
        <Message bordered showIcon type="error" closable>
          <h4 className="font-semibold ">
            {
              // @ts-ignore
              error?.message || "Failed to Register"
            }
          </h4>
        </Message>,
        { placement: "topEnd", duration: 2000 }
      );
    }
  }, [data?.message, error, isError, isLoading, isSuccess, router, toaster]);

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleSignUp)}
        className="max-w-lg w-full mx-auto"
      >
        <div className="mb-12 text-center">
          <h3 className="text-black md:text-3xl text-2xl font-extrabold text-center">
            Register
          </h3>
          <p className="text-slate-500 pt-2">
            Create you E.T Phone Home Account
          </p>
        </div>

        {/* Full Name */}
        <div className="mt-10">
          <label className="text-xs block mb-2">Full Name</label>
          <div className="w-full">
            <Controller
              name="fullName"
              control={control}
              rules={{
                required: "Name is Required",
              }}
              render={({ field }) => (
                <div className="rs-form-control-wrapper">
                  <input
                    {...field}
                    name="fullName"
                    type="text"
                    className="w-full bg-transparent rounded-md text-sm border border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                    placeholder="Enter Full Name..."
                  />
                  <Form.ErrorMessage
                    show={
                      (!!errors?.fullName && !!errors?.fullName?.message) ||
                      false
                    }
                    placement="topEnd"
                  >
                    <span className="font-semibold">
                      {errors?.fullName?.message}
                    </span>
                  </Form.ErrorMessage>
                </div>
              )}
            />
          </div>
        </div>

        {/* Email */}

        <div className="mt-10">
          <label className="text-xs block mb-2">Email</label>
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
                    className="w-full bg-transparent rounded-md text-sm border border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                    placeholder="Enter Email..."
                  />
                  <Form.ErrorMessage
                    show={
                      (!!errors?.email && !!errors?.email?.message) || false
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

        {/* Password */}
        <div className="mt-10">
          <label className="text-xs block mb-2">Password</label>
          <div className="w-full">
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is Required !!",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              }}
              render={({ field }) => (
                <div className="rs-form-control-wrapper">
                  <input
                    {...field}
                    name="password"
                    type="password"
                    className="w-full bg-transparent rounded-md text-sm border border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                    placeholder="Enter password"
                  />
                  <Form.ErrorMessage
                    show={
                      (!!errors?.password && !!errors?.password?.message) ||
                      false
                    }
                    placement="topEnd"
                  >
                    <span className="font-semibold">
                      {errors?.password?.message}
                    </span>
                  </Form.ErrorMessage>
                </div>
              )}
            />
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button
            loading={isLoading}
            block
            type="submit"
            className="w-full !py-2.5 !px-8 !text-sm !font-semibold !rounded !bg-primary hover:!bg-blue-600 !text-white  !shadow-lg focus:!outline-none"
          >
            Sign Up
          </Button>
          <p className="text-sm md:text-xl my-8 md:hidden block">
            Have an account already?{" "}
            <Link
              href="/sign-in"
              className="text-sm md:text-xl hover:underline ml-1 w-full py-2.5 px-8 border-primary font-semibold rounded-full text-black hover:bg-primary hover:text-white border focus:outline-none"
            >
              Login Here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
