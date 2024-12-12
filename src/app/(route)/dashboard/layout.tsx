import { TChildren } from "@/types";
import React from "react";
import { Sidebar } from "./(share)/sidebar";

const DashboardLayout = ({ children }: TChildren) => {
  return (
    <div className="flex bg-[#F5F7FD]">
      <Sidebar />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default DashboardLayout;
