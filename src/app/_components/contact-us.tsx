"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi";
import {
  FaDiscord,
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { SiLinktree } from "react-icons/si";
import Link from "next/link";

import {
  DISCORD_URL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  LINKTREE_URL,
} from "@/lib/constants/urls";

const CONTACT_TYPE_EMAILS: Record<string, string> = {
  student: "info@ramsocunsw.org",
  teacher: "outreach@ramsocunsw.org",
  industry: "sponsorships@ramsocunsw.org",
};

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactType, setContactType] = useState("student");
  const [inquiry, setInquiry] = useState("");

  const socialLinks = [
    { name: "LinkedIn", url: LINKEDIN_URL, icon: FaLinkedin },
    { name: "Facebook", url: FACEBOOK_URL, icon: FaFacebookSquare },
    { name: "Instagram", url: INSTAGRAM_URL, icon: FaInstagram },
    { name: "Discord", url: DISCORD_URL, icon: FaDiscord },
    { name: "Linktree", url: LINKTREE_URL, icon: SiLinktree },
  ];

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const recipient =
      CONTACT_TYPE_EMAILS[contactType] ?? "info@ramsocunsw.org";
    const contactTypeLabel =
      contactType.charAt(0).toUpperCase() + contactType.slice(1);
    const subject = encodeURIComponent("RAMSoc Website Inquiry");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nContact Type: ${contactTypeLabel}\n\nInquiry:\n${inquiry}`,
    );
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="relative overflow-hidden bg-white py-32">
      {/* Giant decorative text */}
      <motion.span
        className="pointer-events-none absolute -right-8 top-1/2 hidden -translate-y-1/2 select-none text-[14rem] font-black leading-none tracking-tighter text-transparent lg:block"
        style={{
          WebkitTextStroke: "1px rgba(41, 171, 226, 0.08)",
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
        </motion.div>

        {/* Contact Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16 max-w-3xl mx-auto"
        >
          <div className="grid gap-6 md:grid-cols-2">
            {/* Left column: Name, Email, Contact Type */}
            <div className="flex flex-col gap-5">
              <div>
                <label className="mb-2 block text-xs font-bold tracking-[0.2em] text-primary-950 uppercase">
                  Name:
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border border-neutral-400 bg-white px-4 py-3 text-sm text-primary-950 transition-colors focus:border-primary-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold tracking-[0.2em] text-primary-950 uppercase">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-neutral-400 bg-white px-4 py-3 text-sm text-primary-950 transition-colors focus:border-primary-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold tracking-[0.2em] text-primary-950 uppercase">
                  Contact Type:
                </label>
                <select
                  value={contactType}
                  onChange={(e) => setContactType(e.target.value)}
                  className="w-full appearance-none border border-neutral-400 bg-white px-4 py-3 text-sm text-primary-950 transition-colors focus:border-primary-500 focus:outline-none"
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="industry">Industry</option>
                </select>
              </div>
            </div>

            {/* Right column: Inquiry */}
            <div className="flex flex-col">
              <label className="mb-2 block text-xs font-bold tracking-[0.2em] text-primary-950 uppercase">
                Inquiry:
              </label>
              <textarea
                value={inquiry}
                onChange={(e) => setInquiry(e.target.value)}
                required
                className="min-h-[200px] flex-1 resize-none border border-neutral-400 bg-white px-4 py-3 text-sm text-primary-950 transition-colors focus:border-primary-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-primary-950 transition-colors hover:text-primary-500"
            >
              <span className="flex size-12 items-center justify-center bg-primary-500 text-white transition-colors group-hover:bg-primary-400">
                <HiArrowRight className="size-5" />
              </span>
              Send Message
            </button>
          </div>
        </motion.form>

        {/* Social Links */}
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
      </div>
    </section>
  );
}