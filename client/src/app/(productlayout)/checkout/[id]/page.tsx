import Checkouts from "@/components/Checkout/Checkouts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "",
};

const CheckOutPage = ({ params }: any) => {
  return (
    <div>
      <Checkouts params={params} />
    </div>
  );
};

export default CheckOutPage;
