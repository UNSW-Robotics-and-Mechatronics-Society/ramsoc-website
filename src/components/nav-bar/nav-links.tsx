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
  const baseStyles = "flex items-center transition-all duration-200";
  const desktopStyles =
    "h-full px-4 hover:bg-primary-800/30 hover:text-primary-50 relative group";
  const mobileStyles =
    "w-full rounded-lg px-4 py-3 text-lg font-medium hover:bg-primary-800/50 hover:text-primary-50 active:bg-primary-700/50";

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`${baseStyles} ${mobile ? mobileStyles : desktopStyles}`}
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
