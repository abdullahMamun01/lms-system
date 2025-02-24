import LectureSidebar from "@/components/lectures/LectureSidebar";
import React, { ReactNode } from "react";
interface Props {
  children: ReactNode;
  params : Promise<{id: string}>
}
export default async function layout({ children , params}: Props) {
  const {id} =await params
  return (
    <div className="min-h-screen bg-[#0A0B1A] text-white ">

      <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 py-6 ">
        {/* Video Section */}
        {children}
        <LectureSidebar courseId={id} />
      </main>
    </div>
  );
}
