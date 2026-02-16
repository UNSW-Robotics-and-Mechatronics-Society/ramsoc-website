import Link from "next/link";

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
  if (mobile) {
    return (
      <>
        {links.map((link, index) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center py-4 text-lg font-medium tracking-[0.05em] text-white/80 transition-colors hover:text-primary-400 ${
              index !== links.length - 1 ? "border-b border-white/10" : ""
            }`}
            aria-label={link.ariaLabel}
            onClick={onLinkClick}
          >
            {link.label}
          </Link>
        ))}
      </>
    );
  }

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="group relative flex h-full shrink-0 items-center px-4 text-sm font-medium tracking-[0.05em] text-primary-950 transition-colors hover:text-primary-500"
          aria-label={link.ariaLabel}
          onClick={onLinkClick}
        >
          {link.label}
          <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary-500 transition-all duration-300 group-hover:w-full" />
        </Link>
      ))}
    </>
  );
}
