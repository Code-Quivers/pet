"use client";
import DashboardLayoutProvider from "@/components/Layouts/DashboardLayoutProvider";
import MakeSidebar from "@/components/Sidebar/Sidebar";

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <DashboardLayoutProvider>
      <div className="flex h-screen divide-x divide-[#f2f2f2] ">
        <div className="max-md:hidden">
          <MakeSidebar />
        </div>

        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <main className="">
            <div className="mx-auto p-4 md:p-6 2xl:p-10">{children}</div>
          </main>
        </div>
      </div>
    </DashboardLayoutProvider>
  );
};

export default LayoutProvider;
