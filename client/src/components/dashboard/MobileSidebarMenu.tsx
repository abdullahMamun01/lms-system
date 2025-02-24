"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { BookOpen, LayoutGrid, Menu, MessageSquare, Plus, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import AuthMenu from "../auth/AuthMenu";
const sidebarLinks = [
  {
    text: "Courses",
    href: "/dashboard",
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    text: "Add Course",
    href: "/dashboard/courses/add-course",
    icon: <Plus className="w-4 h-4" />,
  },
  { text: "Moduels", href: "#", icon: <MessageSquare className="w-4 h-4" /> },
  { text: "Lectures", href: "#", icon: <LayoutGrid className="w-4 h-4" /> },
];
export function MobileSidebarMenu() {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <Sheet onOpenChange={setOpenMenu} open={openMenu}>
      <SheetTrigger className="overflow-hidden z-[999]">
        <button onClick={() => setOpenMenu(!openMenu)}>
          {openMenu ? <X /> : <Menu />}
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <nav className="space-y-2 flex flex-col">
          {sidebarLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground px-3 py-2"
            >
              {link.icon}
              {link.text}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
