import LectureSidebar from "@/components/lectures/LectureSidebar";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0A0B1A] text-white ">
      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 py-6 ">
        {/* Video Section */}
        {children}
        <LectureSidebar/>
      </main>
    </div>
  );
}
