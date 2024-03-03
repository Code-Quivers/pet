"use client";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Loader from "@/components/common/Loader";
import { isLoggedIn } from "@/helpers/hooks/auth.helpers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import "rsuite/dist/rsuite-no-reset.min.css";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/auth/signin");
    }
    setLoading(false);
  }, [router, userLoggedIn]);
  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div className="flex h-screen overflow-hidden">
          {/* <!-- ===== Sidebar Start ===== --> */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Sidebar End ===== --> */}

          {/* <!-- ===== Content Area Start ===== --> */}
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {/* <!-- ===== Header Start ===== --> */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* <!-- ===== Header End ===== --> */}

            {/* <!-- ===== Main Content Start ===== --> */}
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                {children}
              </div>
            </main>
            {/* <!-- ===== Main Content End ===== --> */}
          </div>
          {/* <!-- ===== Content Area End ===== --> */}
        </div>
      )}
    </div>
  );
};

export default LayoutProvider;
