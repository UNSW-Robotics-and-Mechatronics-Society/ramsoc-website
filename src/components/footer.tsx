// FILE: src/components/footer.tsx
import Link from "next/link";
import { FaLinkedin, FaFacebook, FaInstagram, FaDiscord } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/ramsocunsw/",
      icon: FaLinkedin,
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/ramsocunsw",
      icon: FaFacebook,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/ramsocunsw/",
      icon: FaInstagram,
    },
    {
      name: "Discord",
      href: "https://discord.gg/ramsoc",
      icon: FaDiscord,
    },
  ];

  return (
    <footer className="bg-white border-t-2 border-[#d4d4d4]">
      <div className="mx-auto max-w-7xl px-6 md:px-12 py-8">
        {/* Main Footer Content - Horizontal Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-6 border-b border-[#d4d4d4]">
          {/* About Section */}
          <div className="md:col-span-2">
            <h3 className="text-black mb-2 text-sm font-normal font-mono uppercase tracking-tight">
              UNSW RAMSoc
            </h3>
            <p className="text-[#999999] text-xs leading-relaxed font-mono">
              UNSW Robotics and Mechatronics Society - Building the future
              through innovation, hands-on learning, and community.
            </p>
          </div>

          {/* Quick Links - Horizontal */}
          <div>
            <h3 className="text-black mb-2 text-sm font-normal font-mono uppercase tracking-tight">
              Quick Links
            </h3>
            <ul className="space-y-1">
              {[
                { label: "Events", href: "/events" },
                { label: "Careers", href: "/careers" },
                { label: "Team", href: "/team" },
                { label: "Sponsors", href: "/#sponsors" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#999999] hover:text-[#1076eb] text-xs font-mono uppercase tracking-tight transition-none inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h3 className="text-black mb-2 text-sm font-normal font-mono uppercase tracking-tight">
              Contact
            </h3>
            <a
              href="mailto:info@ramsocunsw.org"
              className="text-[#1076eb] hover:text-[#0d5fc7] mb-3 flex items-center gap-2 text-xs font-mono transition-none"
            >
              <MdEmail className="size-3" />
              <span className="text-[10px]">info@ramsocunsw.org</span>
            </a>
            <div className="flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-[#1076eb] transition-none border border-[#d4d4d4] p-1.5"
                  aria-label={social.name}
                >
                  <social.icon className="size-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright - Compact */}
        <div className="pt-4 text-[#999999] text-[10px] font-mono uppercase tracking-tight text-center">
          © 2025 UNSW RAMSoc Society. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
