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
  const baseStyles = "flex items-center transition-all duration-200 shrink-0";
  const desktopStyles =
    "h-full px-4 hover:bg-primary-800/30 hover:text-primary-50 relative group";
  const mobileStyles =
    "w-full border-b border-primary-800/30 py-4 text-2xl font-normal hover:text-primary-300 active:text-primary-400";

  return (
    <>
      {links.map((link, index) => (
        <Link
          key={link.href}
          href={link.href}
          className={`${baseStyles} ${mobile ? mobileStyles : desktopStyles} ${mobile && index === links.length - 1 ? "border-b-0" : ""}`}
          aria-label={link.ariaLabel}
          onClick={onLinkClick}
        >
          {link.label}
          {!mobile && (
            <span className="bg-primary-400 absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full" />
          )}
        </Link>
      ))}
    </>
  );
}
