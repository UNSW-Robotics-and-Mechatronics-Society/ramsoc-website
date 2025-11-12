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
    <section className="bg-primary-50/30 py-20">
      <Container>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-primary-200/50 mx-auto max-w-2xl overflow-hidden rounded-2xl border bg-white p-12 shadow-lg"
        >
          <h2 id="contact" className="text-primary-900 mb-6 text-center">
            Get In Touch
          </h2>

          {/* Email */}
          <motion.a
            href="mailto:info@ramsocunsw.org"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-primary-600 hover:text-primary-900 mb-10 block text-center text-xl transition-colors"
          >
            info@ramsocunsw.org
          </motion.a>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center gap-6"
          >
            {socialLinks.map((social, index) => (
              <motion.div
                key={social.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
              >
                <Link
                  href={social.url}
                  target="_blank"
                  title={social.name}
                  aria-label={`Go to our ${social.name}`}
                  className="text-primary-500 hover:text-primary-700 transition-colors duration-300"
                >
                  <social.icon size={28} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
