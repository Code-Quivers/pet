import React from "react";
import { SelectPicker } from "rsuite";

const SecondStep = () => {
  const data = ["Boy", "Girl"].map((item) => ({ label: item, value: item }));

  return (
    <div className="text-center py-10">
      <h2 className="text-center text-4xl font-bold">Create New Pet</h2>
      <p className="pt-2 text-lg text-gray-500 w-3/4 md:w-3/6 mx-auto">
        Step two: Enter information about your pet.
      </p>
      <form action="#" className="mt-10 max-w-4xl mx-auto px-5">
        {/* pet name and pet age */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 pb-4">
          {/* pet name */}
          <div className="w-full text-start">
            <label className="text-base block mb-2">Enter pet name</label>
            <div className="relative flex items-center mx-auto ">
              <input
                name="email"
                type="text"
                required
                className="w-full bg-transparent text-sm border shadow-sm border-gray-400 focus:border-cyan-400 px-2 py-3 outline-none rounded-lg"
                placeholder="Enter pet name"
              />
            </div>
          </div>

          {/* pet age */}
          <div className="w-full text-start">
            <label className="text-base block mb-2">Pet age</label>
            <div className="relative flex items-center mx-auto ">
              <input
                name="age"
                type="date"
                required
                className="w-full removeDownIcon bg-transparent text-sm shadow-sm border border-gray-400 focus:border-cyan-400 px-2 py-3 outline-none rounded-lg"
                placeholder="Date of birth"
              />
              <div className="absolute inset-y-0 sm:hidden right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400 transform rotate-90"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 5l7 7-7 7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        {/* breed and pet owner */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 pb-4">
          {/* pet breed */}
          <div className="w-full text-start">
            <label className="text-base block mb-2">
              Breed of the pet? (Optional)
            </label>
            <div className="relative flex items-center mx-auto ">
              <input
                name="breed"
                type="text"
                required
                className="w-full bg-transparent text-sm shadow-sm border border-gray-400 focus:border-cyan-400 px-2 py-3 outline-none rounded-lg"
                placeholder="Write breed"
              />
            </div>
          </div>

          {/* pet owner */}
          <div className="w-full text-start">
            <label className="text-base block mb-2">
              Name of the Pet owner?
            </label>
            <div className="relative flex items-center mx-auto ">
              <input
                name="owner"
                type="text"
                required
                className="w-full bg-transparent text-sm shadow-sm border border-gray-400 focus:border-cyan-400 px-2 py-3 outline-none rounded-lg"
                placeholder="Write owner name"
              />
            </div>
          </div>
        </div>
        {/* number and alt number */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 pb-4">
          {/* pet breed */}
          <div className="w-full text-start">
            <label className="text-base block mb-2">Phone Number</label>
            <div className="relative flex items-center mx-auto ">
              <input
                name="number"
                type="tel"
                required
                className="w-full bg-transparent text-sm shadow-sm border border-gray-400 focus:border-cyan-400 px-2 py-3 outline-none rounded-lg"
                placeholder="Write phone number"
              />
            </div>
          </div>

          {/* pet owner */}
          <div className="w-full text-start">
            <label className="text-base block mb-2">
              Alternate Phone Number
            </label>
            <div className="relative flex items-center mx-auto ">
              <input
                name="altNumber"
                type="text"
                required
                className="w-full bg-transparent text-sm shadow-sm border border-gray-400 focus:border-cyan-400 px-2 py-3 outline-none rounded-lg"
                placeholder="Write alt. phone number"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 pb-4">
          {/* pet weight */}
          <div className="w-full text-start">
            <label className="text-base block mb-2">Pet weight</label>
            <div className="relative flex items-center mx-auto ">
              <input
                name="weight"
                type="tel"
                required
                className="w-full bg-transparent text-sm shadow-sm border border-gray-400 focus:border-cyan-400 px-2 py-3 outline-none rounded-lg"
                placeholder="Write as Ibs"
              />
            </div>
          </div>

          {/* pet gender */}
          <div className="w-full text-start">
            <label className="text-base block mb-2">Pet Gender</label>
            <div className="relative flex items-center mx-auto ">
              <select
                name="kids"
                className="w-full bg-transparent text-sm shadow-sm border border-gray-400 focus:border-cyan-400 px-2 py-3 outline-none rounded-lg"
              >
                <option value="volvo">Boy</option>
                <option value="saab">Girl</option>
              </select>
            </div>
          </div>
        </div>
        {/* pet address */}
        <div className="pt-4 pb-2 text-start">
          <h2 className="text-xl font-semibold pb-2">Address</h2>
          <p className="text-sm text-gray-500">
            This address is used to link to a map, so that the owner can be
            traced to a physical address.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 pb-4">
          {/* pet Address */}
          <div className="w-full text-start">
            <label className="text-base block mb-2">Street Address</label>
            <div className="relative flex items-center mx-auto ">
              <input
                name="streetAddress"
                type="text"
                required
                className="w-full bg-transparent text-sm shadow-sm border border-gray-400 focus:border-cyan-400 px-2 py-3 outline-none rounded-lg"
              />
            </div>
          </div>

          {/* pet gender */}
          <div className="w-full text-start">
            <label className="text-base block mb-2">City</label>
            <div className="relative flex items-center mx-auto ">
              <input
                name="city"
                type="text"
                required
                className="w-full bg-transparent text-sm shadow-sm border border-gray-400 focus:border-cyan-400 px-2 py-3 outline-none rounded-lg"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 pb-4">
          {/* pet Address */}
          <div className="w-full text-start">
            <label className="text-base block mb-2">Postcode</label>
            <div className="relative flex items-center mx-auto">
              <input
                name="postcode"
                type="text"
                required
                className="w-full bg-transparent text-sm shadow-sm border border-gray-400 focus:border-cyan-400 px-2 py-3 outline-none rounded-lg"
              />
            </div>
          </div>

          {/* pet gender */}
          <div className="w-full text-start">
            <label className="text-base block mb-2">Country</label>
            <div className="relative flex items-center mx-auto ">
              <input
                name="country"
                type="text"
                required
                className="w-full bg-transparent text-sm shadow-sm border border-gray-400 focus:border-cyan-400 px-2 py-3 outline-none rounded-lg"
              />
            </div>
          </div>
        </div>
        {/* behivior section  */}
        <div className="pt-4 pb-2 text-start">
          <h2 className="text-xl font-semibold pb-2">Behavior</h2>
          <p className="text-sm text-gray-500">Good with...</p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 pb-4">
          {/* pet behavior */}
          <div className="w-full text-start">
            <label className="text-base block mb-2">Kids</label>
            <div className="relative flex items-center mx-auto ">
              <select
                name="kids"
                className="w-full bg-transparent text-sm shadow-sm border border-gray-400 focus:border-cyan-400 px-2 py-3 outline-none rounded-lg"
              >
                <option value="volvo">Yes</option>
                <option value="saab">No</option>
              </select>
            </div>
          </div>
          <div className="w-full text-start">
            <label className="text-base block mb-2">Dogs</label>
            <div className="relative flex items-center mx-auto ">
              <select
                name="dogs"
                className="w-full bg-transparent text-sm shadow-sm border border-gray-400 focus:border-cyan-400 px-2 py-3 outline-none rounded-lg"
              >
                <option value="volvo">Yes</option>
                <option value="saab">No</option>
              </select>
            </div>
          </div>
          <div className="w-full text-start">
            <label className="text-base block mb-2">Cats</label>
            <div className="relative flex items-center mx-auto ">
              <select
                name="cats"
                className="w-full bg-transparent text-sm shadow-sm border border-gray-400 focus:border-cyan-400 px-2 py-3 outline-none rounded-lg"
              >
                <option value="volvo">Yes</option>
                <option value="saab">No</option>
              </select>
            </div>
          </div>
        </div>
        {/* health section */}
        <div className="pt-4 pb-2 text-start">
          <h2 className="text-xl font-semibold pb-2">Health</h2>
          <p className="text-sm text-gray-500">Any health disease?</p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-3 pb-4">
          {/* pet health */}
          <div className="w-full text-start">
            <label className="text-base block mb-2">Allergies</label>
            <div className="relative flex items-center mx-auto ">
              <input
                name="allergies"
                type="text"
                required
                className="w-full bg-transparent text-sm shadow-sm border border-gray-400 focus:border-cyan-400 px-2 py-3 outline-none rounded-lg"
              />
            </div>
          </div>
          <div className="w-full text-start">
            <label className="text-base block mb-2">Medicine</label>
            <div className="relative flex items-center mx-auto ">
              <input
                name="medicine"
                type="text"
                required
                className="w-full bg-transparent text-sm shadow-sm border border-gray-400 focus:border-cyan-400 px-2 py-3 outline-none rounded-lg"
              />
            </div>
          </div>
          <div className="w-full text-start">
            <label className="text-base block mb-2">Neutered/spayed</label>
            <div className="relative flex items-center mx-auto ">
              <select
                name="cats"
                className="w-full bg-transparent text-sm shadow-sm border border-gray-400 focus:border-cyan-400 px-2 py-3 outline-none rounded-lg"
              >
                <option value="volvo">Yes</option>
                <option value="saab">No</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SecondStep;
