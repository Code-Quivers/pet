import MyAllKids from "@/components/MyProfile/my-kids/MyAllKids";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My All Kids | E.T.Phone Home",
};

const MyKidsPage = () => {
  return (
    <section className="mx-auto max-md:my-2 ">
      <div className="text-center">
        <h2 className="text-lg font-semibold">My All Bands | 5</h2>
      </div>
      <div>
        <MyAllKids />
      </div>
    </section>
  );
};

export default MyKidsPage;
