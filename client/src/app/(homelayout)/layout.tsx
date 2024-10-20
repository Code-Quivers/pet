"use client";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import PromoBanner from "@/components/PromoBanner/PromoBanner";

const layout = ({ children }: any) => {
  return (
    <div>
      <div>
        <div className="sticky top-0 z-50">
          <PromoBanner />
          <Navbar />
        </div>
        <div className="max-w-screen-2xl mx-auto max-md:px-2 max-2xl:px-10">
          {children}
        </div>
        <div className="bg-primary">
          <div className="mx-auto max-w-screen-2xl max-md:px-2 max-2xl:px-10">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout;
