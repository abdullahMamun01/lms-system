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
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import AuthMenu from "../auth/AuthMenu";
const navItems = [
  { href: "/courses", label: "Courses" },
  { href: "#", label: "Teachers" },
  { href: "#", label: "Resources" },
  { href: "#", label: "Community" },
];

export function MobileNav() {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <Sheet onOpenChange={setOpenMenu} open={openMenu}>
      <SheetTrigger className="overflow-hidden z-[999]">
        <button onClick={() => setOpenMenu(!openMenu)}>
          {openMenu ? <X /> : <Menu />}
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col gap-4 py-4">
          {navItems.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                index === 0 && "text-primary"
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-4 border-t pt-4">
            <AuthMenu />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
