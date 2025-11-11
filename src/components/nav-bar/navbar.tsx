"use client";

import { cn } from "@/lib/utils";

import { NAVBAR_CONFIG, NAV_LINKS } from "./config";
import { useScrollBehavior } from "./hooks";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { NavLinks } from "./nav-links";

export default function Navbar() {
  const { isScrolled, isScrollingDown } = useScrollBehavior(
    NAVBAR_CONFIG.scrollThreshold,
  );

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 z-50 h-24 w-full px-8 transition-all duration-500 ease-out",
        isScrolled
          ? "border-primary-800/30 bg-primary-950/95 h-20 border-b shadow-lg backdrop-blur-md"
          : "bg-transparent",
        isScrollingDown ? "-translate-y-full" : "translate-y-0",
      )}
    >
      {/* Desktop Navigation */}
      <div
        className="text-primary-50 mx-auto hidden size-full items-center sm:flex"
        style={{ maxWidth: NAVBAR_CONFIG.maxWidth }}
      >
        <Logo {...NAVBAR_CONFIG.logo} />
        <nav className="ml-auto flex h-full">
          <NavLinks links={NAV_LINKS} />
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className="flex size-full items-center sm:hidden">
        <Logo {...NAVBAR_CONFIG.logo} />
        <MobileNav links={NAV_LINKS} />
      </div>
    </nav>
  );
}
