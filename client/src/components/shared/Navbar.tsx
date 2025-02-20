import React from "react";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full border-b bg-background/95 z- backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
      <nav className="container flex h-16 items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-[">
            <div className="h-full w-full rounded-lg bg-primary/10 p-2">
              <div className="h-full w-full rounded-md bg-primary" />
            </div>
          </div>
          <span className="text-xl font-bold">Educare</span>
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
          <Button  size="sm" className="bg-[#D7F4E6] text-secondary hover:bg:[#D7F4E6]">
            Sign in
          </Button>
          <Button size="sm">Get started</Button>
        </div>
      </nav>
    </header>
  );
}
