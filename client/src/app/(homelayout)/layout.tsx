import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";

const layout = ({ children }: any) => {
  return (
    <div>
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
      <div className="bg-primary">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default layout;
