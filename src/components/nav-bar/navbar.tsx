"use client";

import { cn } from "@/lib/utils";

import { NAVBAR_CONFIG, NAV_LINKS } from "./config";
import {
  useScrollBehavior,
  useSheet,
} from "./hooks";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { NavLinks } from "./nav-links";

export default function Navbar() {
  const { isScrolled } = useScrollBehavior(
    NAVBAR_CONFIG.scrollThreshold,
  );
  const sheetState = useSheet();

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 z-50 w-full px-4 transition-all duration-500 ease-out md:px-8",
        isScrolled || sheetState.isOpen
          ? "h-16 border-b border-neutral-200 bg-white/95 backdrop-blur-sm"
          : "h-20 bg-white",
      )}
    >
      {/* Desktop Navigation */}
      <div
        className="mx-auto hidden size-full items-center text-primary-950 md:flex"
        style={{ maxWidth: NAVBAR_CONFIG.maxWidth }}
      >
        <Logo {...NAVBAR_CONFIG.logo} />
        <nav className="ml-auto flex h-full">
          <NavLinks links={NAV_LINKS} />
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className="z-50 flex size-full items-center justify-between text-primary-950 md:hidden">
        <Logo {...NAVBAR_CONFIG.logo} />
        <MobileNav links={NAV_LINKS} sheetState={sheetState} />
      </div>
    </nav>
  );
}
