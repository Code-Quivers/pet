import Link from "next/link";
import React from "react";

const SignInPage = () => {
  return (
    <div className="font-[sans-serif] bg-white text-[#333] md:h-screen">
      <div className="grid md:grid-cols-2 items-center gap-8 h-full">
        <div className="max-md:order-1 p-4 bg-gray-50 h-full">
          <img
            src="https://readymadeui.com/signin-image.webp"
            className="lg:max-w-[90%] w-full h-full object-contain block mx-auto"
            alt="login-image"
          />
        </div>
        <div className="flex items-center p-6 h-full w-full">
          <form className="max-w-lg w-full mx-auto">
            <div className="mb-12">
              <h3 className="text-black md:text-3xl text-2xl font-extrabold max-md:text-center">
                Sign in
              </h3>
            </div>

            <div className="mt-10">
              <label className="text-xs block mb-2">Email</label>
              <div className="relative flex items-center">
                <input
                  name="email"
                  type="text"
                  required
                  className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                  placeholder="Enter email"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-2"
                  viewBox="0 0 682.667 682.667"
                >
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g
                    clip-path="url(#a)"
                    transform="matrix(1.33 0 0 -1.33 0 682.667)"
                  >
                    <path
                      fill="none"
                      stroke-miterlimit="10"
                      stroke-width="40"
                      d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                      data-original="#000000"
                    ></path>
                    <path
                      d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                      data-original="#000000"
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
            <div className="mt-10">
              <label className="text-xs block mb-2">Password</label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full bg-transparent text-sm border-b border-gray-300 focus:border-blue-500 px-2 py-3 outline-none"
                  placeholder="Enter password"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                  viewBox="0 0 128 128"
                >
                  <path
                    d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="flex items-center mt-8">
              <a
                href="javascript:void(0);"
                className="text-blue-500 font-semibold hover:underline ml-1"
              >
                Forgot your password?
              </a>
            </div>
            <div className="mt-12">
              <button
                type="button"
                className="w-full py-2.5 px-8 text-sm font-semibold rounded bg-primary hover:bg-blue-600 text-white border focus:outline-none"
              >
                Sign In
              </button>
              <p className="text-sm mt-8">
                Don't have an account?{" "}
                <Link
                  href="/sign-up"
                  className="text-blue-500 font-semibold hover:underline ml-1"
                >
                  Register here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>

    // <div className="h-full ">
    //   {/* <!-- Container --> */}
    //   <div className="mx-auto">
    //     <div className="flex justify-center px-6 py-12">
    //       {/* <!-- Row --> */}
    //       <div className="w-full xl:w-3/4 lg:w-11/12 flex">
    //         {/* <!-- Col --> */}
    //         <div
    //           className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
    //           style={{
    //             backgroundImage:
    //               "url('https://source.unsplash.com/Mv9hjnEUHR4/600x800')",
    //           }}
    //         ></div>
    //         {/* <!-- Col --> */}
    //         <div className="w-full lg:w-7/12  p-5 rounded-lg lg:rounded-l-none bg-primary">
    //           <h3 className="py-4 text-2xl text-center text-gray-800 ">
    //             Create an Account!
    //           </h3>
    //           <form className="px-8 pt-6 pb-8 mb-4 bg-white  rounded">
    //             <div className="mb-4 md:flex md:justify-between">
    //               <div className="mb-4 md:mr-2 md:mb-0">
    //                 <label
    //                   className="block mb-2 text-sm font-bold text-gray-700 "
    //                   for="firstName"
    //                 >
    //                   First Name
    //                 </label>
    //                 <input
    //                   className="w-full px-3 py-2 text-sm leading-tight text-gray-700  border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
    //                   id="firstName"
    //                   type="text"
    //                   placeholder="First Name"
    //                 />
    //               </div>
    //               <div className="md:ml-2">
    //                 <label
    //                   className="block mb-2 text-sm font-bold text-gray-700 "
    //                   for="lastName"
    //                 >
    //                   Last Name
    //                 </label>
    //                 <input
    //                   className="w-full px-3 py-2 text-sm leading-tight text-gray-700  border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
    //                   id="lastName"
    //                   type="text"
    //                   placeholder="Last Name"
    //                 />
    //               </div>
    //             </div>
    //             <div className="mb-4">
    //               <label
    //                 className="block mb-2 text-sm font-bold text-gray-700 "
    //                 for="email"
    //               >
    //                 Email
    //               </label>
    //               <input
    //                 className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700  border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
    //                 id="email"
    //                 type="email"
    //                 placeholder="Email"
    //               />
    //             </div>
    //             <div className="mb-4 md:flex md:justify-between">
    //               <div className="mb-4 md:mr-2 md:mb-0">
    //                 <label
    //                   className="block mb-2 text-sm font-bold text-gray-700 "
    //                   for="password"
    //                 >
    //                   Password
    //                 </label>
    //                 <input
    //                   className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700  border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
    //                   id="password"
    //                   type="password"
    //                   placeholder="******************"
    //                 />
    //                 <p className="text-xs italic text-red-500">
    //                   Please choose a password.
    //                 </p>
    //               </div>
    //               <div className="md:ml-2">
    //                 <label
    //                   className="block mb-2 text-sm font-bold text-gray-700 "
    //                   for="c_password"
    //                 >
    //                   Confirm Password
    //                 </label>
    //                 <input
    //                   className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700  border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
    //                   id="c_password"
    //                   type="password"
    //                   placeholder="******************"
    //                 />
    //               </div>
    //             </div>
    //             <div className="mb-6 text-center">
    //               <button
    //                 className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700    focus:outline-none focus:shadow-outline"
    //                 type="button"
    //               >
    //                 Register Account
    //               </button>
    //             </div>
    //             <hr className="mb-6 border-t" />
    //             <div className="text-center">
    //               <a
    //                 className="inline-block text-sm text-blue-500  align-baseline hover:text-blue-800"
    //                 href="#"
    //               >
    //                 Forgot Password?
    //               </a>
    //             </div>
    //             <div className="text-center">
    //               <a
    //                 className="inline-block text-sm text-blue-500  align-baseline hover:text-blue-800"
    //                 href="./index.html"
    //               >
    //                 Already have an account? Login!
    //               </a>
    //             </div>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default SignInPage;
