import FirstStep from "@/components/MyProfile/CreatePetProfile/FirstStep";
import SecondStep from "@/components/MyProfile/CreatePetProfile/SecondStep";
import Link from "next/link";
import React from "react";

const MyProfileDashboard = () => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div className="text-center py-10">
        <h2 className="text-center text-4xl font-bold">Create New Pet</h2>
        <h5 className="text-gray-500 pt-2">
          {`Tap "Add pet" to create your first pet`}
        </h5>
        <Link
          href="/my-account/create-pet"
          className="border-primary border-2 rounded-full px-4 py-1.5 mt-4 inline-block hover:bg-primary hover:text-white"
        >
          Add pet
        </Link>
      </div>
    </div>
  );
};

export default MyProfileDashboard;
