"use client";
import { usePathname } from "next/navigation";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import Sidebar from "@/components/shared/sidebar";
import { useState } from "react";

export const LayoutProvider = ({ children }) => {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {pathname !== "/login" ? (
        <>
          <Header
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="pt-14 md:ml-[220px] lg:ml-[300px] bg-gray-50">
            <div className="p-3 md:p-5 lg:p-6 min-h-svh">
              {children}
            </div>
            <Footer />
          </div>
        </>
      ) : (
        children
      )}
    </>
  );
};
