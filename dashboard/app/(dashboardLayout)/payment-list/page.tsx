import PaymentListTable from "@/components/Payment/PaymentList";
import { Metadata } from "next";
export const metadata:Metadata={
  title:"Payment Lists"
}

const PaymentList = () => {
  return (
    <div>
      <PaymentListTable />
    </div>
  );
};

export default PaymentList;
