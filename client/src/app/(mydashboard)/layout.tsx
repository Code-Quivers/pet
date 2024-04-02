"use client";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/MyProfile/Header/Header";
import { isLoggedIn } from "@/hooks/services/auth.service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Loader, Placeholder } from "rsuite";

const AuthLayout = ({ children }: any) => {
  const userLoggedIn = isLoggedIn();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/sign-in");
    }

    setIsLoading(false);
  }, [router, userLoggedIn]);
  if (isLoading) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <Placeholder.Paragraph rows={8} />
        <Loader size="lg" content="Checking Authentication..." vertical />
      </div>
    );
  }

  if (!!userLoggedIn && !isLoading)
    return (
      <div>
        <div className="sticky top-0 z-50">
          <Header />
        </div>
        <div>{children}</div>
        <div className="bg-primary">
          <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
            <Footer />
          </div>
        </div>
      </div>
    );
};

export default AuthLayout;
