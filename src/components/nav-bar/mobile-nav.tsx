"use client";

import { AnimatedMenuButton } from "@/components/ui/animated-menu-button";
import { Sheet, SheetContent } from "@/components/ui/sheet";

import type { NavLink } from "./config";
import type { useSheet } from "./hooks";
import { NavLinks } from "./nav-links";

interface MobileNavProps {
  links: readonly NavLink[];
  sheetState: ReturnType<typeof useSheet>;
}

export function MobileNav({ links, sheetState }: MobileNavProps) {
  const { isOpen, setIsOpen, toggle, close } = sheetState;

  return (
    <>
      <AnimatedMenuButton
        isOpen={isOpen}
        onClick={toggle}
        className="size-12 sm:hidden"
      />
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side="top"
          className="bg-primary-950/95 top-20 z-40 h-[calc(100dvh-5rem)] w-full border-none p-0"
          overlayClassName="z-40 top-20 bg-black/30"
          hideCloseButton
        >
          <div className="flex h-full flex-col overflow-y-auto">
            <nav className="flex flex-col gap-0.5 px-8 py-4 text-white">
              <NavLinks links={links} onLinkClick={close} mobile />
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
