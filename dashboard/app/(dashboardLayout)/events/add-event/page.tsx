import AddEvents from "@/components/Events/AddEvents";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Add Event | Dashboard",
  description: "Event Add with Date and Event title",
  creator: "CodeQuivers",
};
const AddEventPage = () => {
  return (
    <div>
      <AddEvents />
    </div>
  );
};

export default AddEventPage;
