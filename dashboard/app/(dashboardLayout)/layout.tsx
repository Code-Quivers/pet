"use client";
import DashboardNavbar from "@/components/Header/DashboardNavbar";
import DashboardLayoutProvider from "@/components/Layouts/DashboardLayoutProvider";
import MakeSidebar from "@/components/Sidebar/Sidebar";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardLayoutProvider>
      <div className="flex h-screen divide-x divide-[#f2f2f2] ">
        <div className="max-md:hidden">
          <MakeSidebar />
        </div>

        <div className="relative bg-[#f9f9fb] flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <div className="px-3 2xl:px-5">
            <div>
              <DashboardNavbar />
            </div>
            <div className="my-5">{children}</div>
          </div>
        </div>
      </div>
    </DashboardLayoutProvider>
  );
};

export default LayoutProvider;
