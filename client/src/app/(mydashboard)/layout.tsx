"use client";
import KidLayoutNavbar from "@/components/Navbar/KidLayoutNavbar";
import { isLoggedIn } from "@/hooks/services/auth.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader } from "rsuite";

const MyAccountLayout = ({ children }: any) => {
  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // !

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/sign-in");
    }

    setIsLoading(false);
  }, [router, userLoggedIn]);
  if (isLoading) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <Loader size="lg" content="Checking Authentication..." vertical />
      </div>
    );
  }

  if (!!userLoggedIn && !isLoading)
    return (
      <div className="max-xl:px-2  max-w-3xl mx-auto">
        <div>
          <KidLayoutNavbar />
        </div>
        <div>{children}</div>
      </div>
    );
};

export default MyAccountLayout;
