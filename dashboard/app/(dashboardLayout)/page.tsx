import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Party Couture",
  description: "Dashboard , For Management",
  creator: "Developed by CodeQuivers",
};

export default function Home() {
  return (
    <>
      <ECommerce />
    </>
  );
}
