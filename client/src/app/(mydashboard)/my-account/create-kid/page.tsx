import CreateKidAllStep from "@/components/MyProfile/CreateKidProfile/CreateKidAllStep";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Pet Details",
};

const CreateMyPet = () => {
  return (
    <>
      <CreateKidAllStep />
    </>
  );
};

export default CreateMyPet;
