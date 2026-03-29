import Image from "next/image";
import Link from "next/link";
import {
  FaDiscord,
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { SiLinktree } from "react-icons/si";

import {
  DISCORD_URL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  LINKTREE_URL,
} from "@/lib/constants/urls";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Events", href: "/events" },
  { label: "Careers", href: "/careers" },
  { label: "Team", href: "/team" },
  { label: "Sponsors", href: "/sponsors" },
];

const resourceLinks = [
  { label: "Join on Rubric", href: "https://campus.hellorubric.com/?s=12676" },
  { label: "Sumobots", href: "https://sumobots.ramsocunsw.org" },
  {
    label: "Subcommittee Applications",
    href: process.env.NEXT_PUBLIC_SUBCOMMITTEE_APPLICATION_FORM_URL ?? "#",
  },
];

const socialLinks = [
  { name: "LinkedIn", url: LINKEDIN_URL, icon: FaLinkedin },
  { name: "Facebook", url: FACEBOOK_URL, icon: FaFacebookSquare },
  { name: "Instagram", url: INSTAGRAM_URL, icon: FaInstagram },
  { name: "Discord", url: DISCORD_URL, icon: FaDiscord },
  { name: "Linktree", url: LINKTREE_URL, icon: SiLinktree },
];

export default function Footer() {
  return (
    <footer className="bg-[#030a18] text-white">
      {/* Decorative top border */}
      <div className="h-px bg-white/10" />

      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-12 lg:px-20">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="mb-6 flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="RAMSoc Logo"
                width={40}
                height={40}
                className="size-10"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-xs font-bold tracking-[0.15em] text-white uppercase">
                  RAMSoc
                </span>
                <span className="text-[0.6rem] tracking-[0.1em] text-white/30 uppercase">
                  UNSW Robotics & Mechatronics Society
                </span>
              </div>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/40">
              UNSW&apos;s largest mechatronics society. Hands-on learning,
              industry connections, and a passionate community.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-5 text-xs font-bold tracking-[0.2em] text-white/30 uppercase">
              Navigate
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-primary-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-5 text-xs font-bold tracking-[0.2em] text-white/30 uppercase">
              Resources
            </h4>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/50 transition-colors hover:text-primary-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h4 className="mb-5 text-xs font-bold tracking-[0.2em] text-white/30 uppercase">
              Contact
            </h4>
            <a
              href="mailto:info@ramsocunsw.org"
              className="mb-3 block text-sm text-white/50 transition-colors hover:text-primary-400"
            >
              info@ramsocunsw.org
            </a>
            <a
              href="mailto:industry@ramsocunsw.org"
              className="mb-6 block text-sm text-white/50 transition-colors hover:text-primary-400"
            >
              industry@ramsocunsw.org
            </a>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.name}
                  aria-label={social.name}
                  className="text-white/30 transition-colors hover:text-primary-400"
                >
                  <social.icon size={18} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 border-t border-white/10 pt-6">
          <p className="text-center text-[0.65rem] tracking-[0.2em] text-white/20 uppercase">
            &copy; {new Date().getFullYear()} UNSW Robotics and Mechatronics
            Society. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
