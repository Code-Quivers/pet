import MyAllKids from "@/components/MyProfile/my-kids/MyAllKids";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My All Kids | E.T.Phone Home",
};

const MyKidsPage = () => {
  return (
    <section className=" max-w-7xl mx-auto my-10">
      <div>
        <h2 className="text-2xl font-semibold">My All Kids</h2>
      </div>
      <div>
        <MyAllKids />
      </div>
    </section>
  );
};

export default MyKidsPage;
