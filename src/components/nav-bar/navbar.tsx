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
        "fixed top-0 left-0 z-50 w-full px-4 transition-all duration-500 ease-out md:px-8",
        isScrolled || sheetState.isOpen
          ? "border-primary-800/30 bg-primary-950/95 h-20 border-b shadow-lg backdrop-blur-md"
          : "h-24 bg-transparent",
        isScrollingDown ? "-translate-y-full" : "translate-y-0",
      )}
    >
      {/* Desktop Navigation */}
      <div
        className="text-primary-50 mx-auto hidden size-full items-center md:flex"
        style={{ maxWidth: NAVBAR_CONFIG.maxWidth }}
      >
        <Logo {...NAVBAR_CONFIG.logo} showText={showLogo} />
        <nav className="ml-auto flex h-full">
          <NavLinks links={NAV_LINKS} />
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className="z-50 flex size-full items-center justify-between md:hidden">
        <Logo {...NAVBAR_CONFIG.logo} showText={false} showLogo={showLogo} />
        <MobileNav links={NAV_LINKS} sheetState={sheetState} />
      </div>
    </nav>
  );
}
