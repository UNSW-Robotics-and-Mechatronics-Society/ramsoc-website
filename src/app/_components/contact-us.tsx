"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaDiscord,
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

import {
  DISCORD_URL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
} from "@/lib/constants/urls";

export default function ContactUs() {
  const socialLinks = [
    { name: "LinkedIn", url: LINKEDIN_URL, icon: FaLinkedin },
    { name: "Facebook", url: FACEBOOK_URL, icon: FaFacebookSquare },
    { name: "Instagram", url: INSTAGRAM_URL, icon: FaInstagram },
    { name: "Discord", url: DISCORD_URL, icon: FaDiscord },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-32">
      {/* Giant decorative text */}
      <motion.span
        className="pointer-events-none absolute -right-8 top-1/2 hidden -translate-y-1/2 select-none text-[14rem] font-black leading-none tracking-tighter text-transparent lg:block"
        style={{
          WebkitTextStroke: "1px rgba(51, 102, 255, 0.08)",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      >
        HELLO
      </motion.span>

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          <span className="mb-4 block text-xs font-bold tracking-[0.3em] text-primary-500 uppercase">
            // 06 — Connect
          </span>

          <h2
            id="contact"
            className="mb-8 text-5xl font-bold text-primary-950 md:text-6xl lg:text-7xl"
          >
            Get In Touch
          </h2>

          {/* Email — large, underlined */}
          <motion.a
            href="mailto:info@ramsocunsw.org"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-16 inline-block border-b-2 border-primary-500/50 pb-2 text-2xl text-primary-500 transition-colors hover:border-primary-400 hover:text-primary-400 md:text-3xl"
          >
            info@ramsocunsw.org
          </motion.a>

          {/* Social Links — displayed as labeled links, not just icons */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-6"
          >
            {socialLinks.map((social, index) => (
              <motion.div
                key={social.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.08 }}
              >
                <Link
                  href={social.url}
                  target="_blank"
                  title={social.name}
                  aria-label={`Go to our ${social.name}`}
                  className="group flex items-center gap-2 text-neutral-400 transition-colors duration-300 hover:text-primary-500"
                >
                  <social.icon size={20} />
                  <span className="text-sm font-medium uppercase tracking-wider">
                    {social.name}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
