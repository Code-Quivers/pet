import AddSlot from "@/components/Events/AddSlot";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Delivery Slot | Dashboard",
  description: "This is Delivery Slot Page ",
};

const SlotPage = () => {
  return (
    <div>
      <AddSlot />
    </div>
  );
};

export default SlotPage;
