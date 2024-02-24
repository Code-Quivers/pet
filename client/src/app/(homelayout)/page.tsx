import EasilyAccessible from "@/components/HomePage/EasilyAccessible";
import HeroSection from "@/components/HomePage/HeroSection";
import OurFeatures from "@/components/HomePage/OurFeatures";
import OurInspiration from "@/components/HomePage/OurInspiration";
import ProductsSection from "@/components/HomePage/ProductsSection";
import ReviewsSlider from "@/components/HomePage/ReviewsSlider";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ProductsSection />
      <EasilyAccessible />
      <OurFeatures />
      <OurInspiration />
      <ReviewsSlider />
    </div>
  );
}
