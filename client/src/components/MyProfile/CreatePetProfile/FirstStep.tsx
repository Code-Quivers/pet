import React from "react";

const FirstStep = () => {
  return (
    <div>
      <h2 className="text-center text-4xl font-bold">Create New Pet</h2>
      <p className="pt-2 px-4 text-base text-center text-gray-500">
        Step one: Enter the code on the back of your ETPhoneHome. For example,
        <br /> if the link on your ETPhoneHome is etphonehome.co/tag/aBc123,
        your code is aBc123.
      </p>
      <form action="#">
        <div className="mt-5">
          <label className="text-base mb-2 block px-5 font-semibold">
            Type product code
          </label>
          <div className="relative flex items-center px-5">
            <input
              name="email"
              type="text"
              required
              className="w-full bg-transparent font-bold text-sm border-2 rounded-lg focus:border-cyan-400 px-3 py-3 outline-none"
              placeholder="Enter code"
            />
          </div>
        </div>
      </form>
      <p className="pt-8 text-sm px-5 text-gray-500 ">
        {`Note: if you're having trouble, simply scan the QR code on the back of
        your E.T.Phone home with your phone's camera (please use your phone's native
        camera app), and follow the link!`}
      </p>
    </div>
  );
};

export default FirstStep;
