import Navbar from "@/components/Navbar/Navbar";
import React from "react";

const layout = ({ children }: any) => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">Footer</div>
    </div>
  );
};

export default layout;
