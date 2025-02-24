"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function MobileNav() {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <Sheet onOpenChange={setOpenMenu} open={openMenu}>
      <SheetTrigger className="overflow-hidden z-[999]">
        <button onClick={() => setOpenMenu(!openMenu)}>{openMenu ? <X /> : <Menu />}</button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
