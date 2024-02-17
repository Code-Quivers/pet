import HeroSection from "@/components/HomePage/HeroSection";
import OurFeatures from "@/components/HomePage/OurFeatures";
import ProductsSection from "@/components/HomePage/ProductsSection";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ProductsSection />
      <OurFeatures />
    </div>
  );
}
