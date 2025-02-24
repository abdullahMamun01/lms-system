import React from "react";
import Link from "next/link";
import AuthMenu from "../auth/AuthMenu";

export default function Navbar() {
  return (
    <header className="sticky top-0 w-full border-b bg-background/95 z- backdrop-blur supports-[backdrop-filter]:bg-background/60 z-[999] ">
      <nav className="container flex h-16 items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-[">
            <div className="h-full w-full rounded-lg bg-primary/10 p-2">
              <div className="h-full w-full rounded-md bg-primary" />
            </div>
          </div>
          <Link href="/">
            <span className="text-xl font-bold">Educare</span>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium hover:text-primary">
            Courses
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary">
            Teachers
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary">
            Resources
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary">
            Community
          </a>
        </div>
        <AuthMenu />
      </nav>
    </header>
  );
}
