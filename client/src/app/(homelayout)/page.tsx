import TotalControl from "@/components/HomePage/TotalControl";
import DualFunctionality from "@/components/HomePage/DualFunctionality";
import HeroSection from "@/components/HomePage/HeroSection";
import OurFeatures from "@/components/HomePage/OurFeatures";
import ConnectYourWay from "@/components/HomePage/ConnectYourWay";
import OurRange from "@/components/HomePage/OurRange";
import ProductsSection from "@/components/HomePage/ProductsSection";
import ReviewsSlider from "@/components/HomePage/ReviewsSlider";
import Image from "next/image";
import Faq from "@/components/HomePage/Faq";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ProductsSection />
      <DualFunctionality />
      <TotalControl />
      <OurRange />
      <ConnectYourWay />
      <OurFeatures />
      <ReviewsSlider />
      <Faq />
    </div>
  );
}
