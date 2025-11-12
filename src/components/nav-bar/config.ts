export interface NavLink {
  label: string;
  href: string;
  ariaLabel: string;
}

export const NAV_LINKS: NavLink[] = [
  {
    label: "Home",
    href: "/",
    ariaLabel: "Go to home page",
  },
  {
    label: "Events",
    href: "/events",
    ariaLabel: "Go to events page",
  },
  {
    label: "Careers",
    href: "/careers",
    ariaLabel: "Go to careers page",
  },
  {
    label: "Team",
    href: "/team",
    ariaLabel: "Go to team page",
  },
  {
    label: "Sponsors",
    href: "/#sponsors",
    ariaLabel: "Go to sponsors page",
  },
  {
    label: "Contact Us",
    href: "/#contact",
    ariaLabel: "Go to contact us section",
  },
] as const;

export const NAVBAR_CONFIG = {
  logo: {
    src: "/logo.svg",
    alt: "RAMSOC Logo",
    width: 24,
    height: 24,
    ariaLabel: "Logo to go to home page",
  },
  scrollThreshold: 125,
  maxWidth: "3000px",
} as const;
