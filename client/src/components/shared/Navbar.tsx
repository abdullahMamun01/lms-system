import React from "react";
import { Button } from "../ui/button";
import { Key, User } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 w-full border-b bg-background/95 z- backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
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
        <div className="flex items-center gap-4">
          <Button
            size="sm"
            className="bg-[#D7F4E6] text-secondary hover:text-gray-50 hover:bg:[#D7F4E6]"
          >
            Sign in
            <Key className="h-4 w-4 mr-1" />
          </Button>
          <Button size="sm" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Signup Free
          </Button>
        </div>
      </nav>
    </header>
  );
}
