"use client";

import { useRef, useState } from "react";

import { motion } from "framer-motion";
import {
  FaDiscord,
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { HiArrowRight, HiPaperClip, HiX } from "react-icons/hi";
import { SiLinktree } from "react-icons/si";
import Link from "next/link";

import {
  DISCORD_URL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  LINKTREE_URL,
} from "@/lib/constants/urls";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactType, setContactType] = useState("student");
  const [inquiry, setInquiry] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const socialLinks = [
    { name: "LinkedIn", url: LINKEDIN_URL, icon: FaLinkedin },
    { name: "Facebook", url: FACEBOOK_URL, icon: FaFacebookSquare },
    { name: "Instagram", url: INSTAGRAM_URL, icon: FaInstagram },
    { name: "Discord", url: DISCORD_URL, icon: FaDiscord },
    { name: "Linktree", url: LINKTREE_URL, icon: SiLinktree },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
      e.target.value = "";
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("contactType", contactType);
    formData.append("inquiry", inquiry);
    files.forEach((file) => formData.append("files", file));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        let msg = "Failed to send message.";
        try {
          const data = (await res.json()) as { error?: string };
          msg = data.error ?? msg;
        } catch {
          // non-JSON error body
        }
        throw new Error(msg);
      }

      setSubmitSuccess(true);
      setName("");
      setEmail("");
      setContactType("student");
      setInquiry("");
      setFiles([]);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Failed to send message.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-white py-32">
      {/* Giant decorative text */}
      <motion.span
        className="pointer-events-none absolute -right-8 top-1/2 hidden -translate-y-1/2 select-none text-[14rem] font-black leading-none tracking-tighter text-transparent lg:block"
        style={{ WebkitTextStroke: "1px rgba(41, 171, 226, 0.08)" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      >
        HELLO
      </motion.span>

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        {/* Heading */}
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
          className="mx-auto mb-16 max-w-3xl"
        >
          <div className="grid gap-6 md:grid-cols-2">
            {/* Left — Name, Email, Contact Type */}
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
                  disabled={isSubmitting}
                  className="w-full border border-neutral-400 bg-white px-4 py-3 text-sm text-primary-950 transition-colors focus:border-primary-500 focus:outline-none disabled:opacity-50"
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
                  disabled={isSubmitting}
                  className="w-full border border-neutral-400 bg-white px-4 py-3 text-sm text-primary-950 transition-colors focus:border-primary-500 focus:outline-none disabled:opacity-50"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold tracking-[0.2em] text-primary-950 uppercase">
                  Contact Type:
                </label>
                <select
                  value={contactType}
                  onChange={(e) => setContactType(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full appearance-none border border-neutral-400 bg-white px-4 py-3 text-sm text-primary-950 transition-colors focus:border-primary-500 focus:outline-none disabled:opacity-50"
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="industry">Industry</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Right — Inquiry + Attach */}
            <div className="flex flex-col">
              <label className="mb-2 block text-xs font-bold tracking-[0.2em] text-primary-950 uppercase">
                Inquiry:
              </label>
              <textarea
                value={inquiry}
                onChange={(e) => setInquiry(e.target.value)}
                required
                disabled={isSubmitting}
                className="min-h-50 flex-1 resize-none border border-neutral-400 bg-white px-4 py-3 text-sm text-primary-950 transition-colors focus:border-primary-500 focus:outline-none disabled:opacity-50"
              />

              {/* File attachment */}
              <div className="mt-3">
                {/* sr-only keeps it accessible + clickable; display:none blocks programmatic .click() in some browsers */}
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="sr-only"
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 border border-dashed border-neutral-400 py-2.5 text-xs font-bold tracking-[0.15em] text-neutral-400 uppercase transition-colors hover:border-primary-500 hover:text-primary-500 disabled:opacity-50"
                >
                  <HiPaperClip className="size-4" />
                  {files.length > 0
                    ? `${files.length} file${files.length > 1 ? "s" : ""} attached — add more`
                    : "Attach Files"}
                </button>

                {files.length > 0 && (
                  <ul className="mt-2 divide-y divide-neutral-100 border border-neutral-200">
                    {files.map((file, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 bg-white px-3 py-2"
                      >
                        <HiPaperClip className="size-3.5 shrink-0 text-primary-500" />
                        <span className="min-w-0 flex-1 truncate text-xs font-medium text-primary-950">
                          {file.name}
                        </span>
                        <span className="shrink-0 text-xs text-neutral-400">
                          {file.size < 1024
                            ? `${file.size} B`
                            : file.size < 1024 * 1024
                              ? `${(file.size / 1024).toFixed(1)} KB`
                              : `${(file.size / (1024 * 1024)).toFixed(1)} MB`}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFile(i)}
                          className="shrink-0 text-neutral-300 transition-colors hover:text-red-500"
                          aria-label={`Remove ${file.name}`}
                        >
                          <HiX className="size-3.5" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Submit row */}
          <div className="mt-6 flex items-center gap-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-primary-950 transition-colors hover:text-primary-500 disabled:opacity-50"
            >
              <span className="flex size-12 items-center justify-center bg-primary-500 text-white transition-colors group-hover:bg-primary-400 group-disabled:bg-neutral-300">
                <HiArrowRight className="size-5" />
              </span>
              {isSubmitting ? "Sending…" : "Send Message"}
            </button>

            {submitSuccess && (
              <p className="text-xs font-bold tracking-[0.15em] text-primary-500 uppercase">
                Message sent!
              </p>
            )}
            {submitError && (
              <p className="text-xs font-bold tracking-[0.15em] text-red-500 uppercase">
                {submitError}
              </p>
            )}
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
