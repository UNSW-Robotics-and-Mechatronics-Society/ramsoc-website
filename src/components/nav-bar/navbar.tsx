// FILE: src/components/nav-bar/navbar.tsx
"use client";

import { cn } from "@/lib/utils";

import { NAVBAR_CONFIG, NAV_LINKS } from "./config";
import {
  useHeroSubtitleVisibility,
  useScrollBehavior,
  useSheet,
} from "./hooks";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { NavLinks } from "./nav-links";

export default function Navbar() {
  const { isScrolled, isScrollingDown } = useScrollBehavior(
    NAVBAR_CONFIG.scrollThreshold,
  );
  const sheetState = useSheet();
  const isHeroSubtitleVisible = useHeroSubtitleVisibility();

  const showLogo = !isHeroSubtitleVisible;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 z-50 w-full px-0 transition-none",
        isScrolled || sheetState.isOpen
          ? "bg-white h-16 border-b border-[#d4d4d4]"
          : "h-16 bg-white border-b border-[#d4d4d4]",
        isScrollingDown ? "-translate-y-full" : "translate-y-0",
      )}
    >
      {/* Desktop Navigation - Left aligned narrow column */}
      <div className="flex h-full items-center pl-6 md:pl-12">
        <Logo {...NAVBAR_CONFIG.logo} showText={showLogo} />
        <nav className="ml-12 flex h-full gap-0">
          <NavLinks links={NAV_LINKS} />
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className="z-50 flex size-full items-center justify-between px-6 md:hidden">
        <Logo {...NAVBAR_CONFIG.logo} showText={false} showLogo={showLogo} />
        <MobileNav links={NAV_LINKS} sheetState={sheetState} />
      </div>
    </nav>
  );
}
