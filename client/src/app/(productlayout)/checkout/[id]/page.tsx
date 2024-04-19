import Checkouts from "@/components/Checkout/Checkouts";

const CheckOutPage = ({ params }: any) => {
  return (
    <div>
      <Checkouts params={params} />
    </div>
  );
};

export default CheckOutPage;
