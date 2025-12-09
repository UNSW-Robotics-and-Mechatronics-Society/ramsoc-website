"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaDiscord,
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

import { Container } from "@/components/ui/container";
import {
  DISCORD_URL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
} from "@/lib/constants/urls";

export default function ContactUs() {
  const socialLinks = [
    {
      name: "LinkedIn",
      url: LINKEDIN_URL,
      icon: FaLinkedin,
    },
    {
      name: "Facebook",
      url: FACEBOOK_URL,
      icon: FaFacebookSquare,
    },
    {
      name: "Instagram",
      url: INSTAGRAM_URL,
      icon: FaInstagram,
    },
    {
      name: "Discord",
      url: DISCORD_URL,
      icon: FaDiscord,
    },
  ];

  return (
    <section className="bg-white py-16 border-b border-[#d4d4d4]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 id="contact" className="text-black mb-4 text-2xl font-normal font-mono uppercase tracking-tight border-b-4 border-[#1076eb] pb-2 inline-block">
            Get In Touch
          </h2>

          {/* Email */}
          <motion.a
            href="mailto:info@ramsocunsw.org"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[#1076eb] hover:text-[#0d5fc7] mb-8 mt-8 block text-center text-base font-mono transition-none border-2 border-[#d4d4d4] p-4 bg-white hover:bg-[#f5f5f5]"
          >
            info@ramsocunsw.org
          </motion.a>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-center gap-0 border border-[#d4d4d4] mt-8"
          >
            {socialLinks.map((social, index) => (
              <Link
                key={social.name}
                href={social.url}
                target="_blank"
                title={social.name}
                aria-label={`Go to our ${social.name}`}
                className={`text-black hover:bg-[#1076eb] hover:text-white transition-none p-4 flex-1 flex items-center justify-center ${index !== socialLinks.length - 1 ? 'border-r border-[#d4d4d4]' : ''}`}
              >
                <social.icon size={24} />
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
