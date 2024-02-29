import AllEvents from "@/components/Events/AllEvents";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Events | Catering",
  description: "Developed by CodeQuivers",
};

const EventsPage = () => {
  return (
    <div>
      <AllEvents />
    </div>
  );
};

export default EventsPage;
