import type { Metadata } from "next";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "react-hot-toast";


export const metadata: Metadata = {
  title: "Educare",
  description: "learn anything from anywhere",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
      <Toaster />
      <Footer />
    </div>
  );
}
