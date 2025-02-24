"use client";

import Image from "next/image";

import LoginImage from "../../../../public/assets/signin-auth.png";

import LoginForm from "@/components/auth/LoginForm";
export default function SigninPage() {
  return (
    <div className=" min-h-screen grid lg:grid-cols-2 ">
      {/* Left side with illustration */}
      <div className="px-20 mx-auto lg:flex flex-col h-full max-sm:hidden  p-8 bg-primary/5 ">
        <Image
          src={LoginImage}
          alt="Decorative bird illustration"
          width={0} // Let the image size adjust automatically
          height={0} // Let the image size adjust automatically
          className="w-auto h-[500px] max-w-full max-h-full mx-auto object-contain"
        />
      </div>

      {/* Right side with login form */}
      <div className="flex flex-col items-center justify-center p-8 bg-[#F9FAFB]">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-script mb-6">Educare</h1>
            <h2 className="text-xl text-secondary/80">Welcome to Educare</h2>
          </div>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
