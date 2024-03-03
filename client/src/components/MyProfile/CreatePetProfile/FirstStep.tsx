import React from "react";

const FirstStep = () => {
  return (
    <div className="text-center py-10">
      <h2 className="text-center text-4xl font-bold">Create New Pet</h2>
      <p className="pt-2 text-lg text-gray-500 w-3/4 md:w-3/6 mx-auto">
        Step one: Enter the code on the back of your etphonehome. For example,
        if the link on your etphonehome is etphonehome.co/tag/aBc123, your code
        is aBc123.
      </p>
      <form action="#">
        <div className="mt-10">
          <label className="text-base block mb-2">Type product code</label>
          <div className="relative flex items-center w-1/2 mx-auto">
            <input
              name="email"
              type="text"
              required
              className="w-full bg-transparent text-sm border border-primary focus:border-blue-500 px-2 py-3 outline-none"
              placeholder="Enter code"
            />
          </div>
        </div>
      </form>
      <p className="pt-2 text-lg text-gray-500 mt-8 w-3/4 md:w-3/6 mx-auto">
        {`Note: if you're having trouble, simply scan the QR code on the back of
        your E.T.Phone home with your phone's camera (please use your phone's native
        camera app), and follow the link!`}
      </p>
    </div>
  );
};

export default FirstStep;
