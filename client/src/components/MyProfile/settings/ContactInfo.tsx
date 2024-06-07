"use client";

import { Toggle } from "rsuite";

const ContactInfo = () => {
  return (
    <div className="mt-10">
      <div className="space-y-2 md:space-y-3">
        <h1 className="text-4xl font-bold text-pure_black">Contact Info</h1>
        <p className="text-[#898c90]">
          Your contact information will be displayed on all of your bands
          profiles.
        </p>
      </div>
      {/*   */}
      <div className="mt-10">
        {/* privacy control */}
        <div className="mt-3  border-t  border-b py-3 flex justify-between  items-center">
          <div>
            <h4 className="text-xl font-bold text-pure_black">
              Privacy Control
            </h4>
            <p className="text-[#898c90]">
              Only display Contact information when your kid is lost.
            </p>
          </div>
          <div>
            <Toggle
              size="lg"
              color="cyan"
              checkedChildren="Shown"
              unCheckedChildren="Hidden"
              defaultChecked
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
