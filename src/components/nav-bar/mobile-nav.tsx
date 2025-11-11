"use client";

import { useState } from "react";
import { LuMenu } from "react-icons/lu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import type { NavLink } from "./config";
import { NavLinks } from "./nav-links";

interface MobileNavProps {
  links: readonly NavLink[];
}

export function MobileNav({ links }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger
        className="ml-auto flex h-full items-center gap-2 text-white transition-opacity duration-200 hover:opacity-80 sm:hidden"
        aria-label="Open navigation menu"
      >
        <LuMenu size={32} />
      </SheetTrigger>
      <SheetContent
        className="border-primary-800 bg-primary-950 w-[280px] p-0 sm:w-[320px]"
        hideCloseButton
      >
        <SheetHeader className="border-primary-800 border-b p-6 pb-4">
          <SheetTitle className="text-primary-200 text-left text-sm">
            Robotics And Mechatronics Society
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 p-4 text-white">
          <NavLinks links={links} onLinkClick={() => setIsOpen(false)} mobile />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
