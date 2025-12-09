// FILE: src/components/nav-bar/nav-links.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { NavLink } from "./config";

interface NavLinksProps {
  links: readonly NavLink[];
  onLinkClick?: () => void;
  mobile?: boolean;
}

export function NavLinks({
  links,
  onLinkClick,
  mobile = false,
}: NavLinksProps) {
  const pathname = usePathname();

  const baseStyles = "flex items-center transition-none shrink-0 font-mono text-xs uppercase tracking-tight";
  const desktopStyles =
    "h-full px-6 border-r border-[#d4d4d4] relative";
  const mobileStyles =
    "w-full border-b border-[#d4d4d4] py-4 text-sm";

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    // Don't mark hash links as active since they're anchors within the page
    if (href.startsWith("/#")) return false;
    return pathname.startsWith(href);
  };

  return (
    <>
      {links.map((link, index) => (
        <Link
          key={link.href}
          href={link.href}
          className={`${baseStyles} ${mobile ? mobileStyles : desktopStyles} ${mobile && index === links.length - 1 ? "border-b-0" : ""} ${isActive(link.href) ? "bg-[#1076eb] text-white hover:bg-[#0d5fc7] hover:text-white" : "text-black hover:bg-[#f5f5f5] hover:text-black"}`}
          aria-label={link.ariaLabel}
          onClick={onLinkClick}
        >
          {link.label}
        </Link>
      ))}
    </>
  );
}
