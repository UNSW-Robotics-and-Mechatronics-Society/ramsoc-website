"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  Award,
  Building2,
  Calendar,
  Mail,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { HiArrowRight } from "react-icons/hi2";

import { BarChart3 } from "lucide-react";

import {
  SponsorshipBenefitsTable,
  SponsorshipTierCard,
} from "@/features/sponsors/components";
import { SPONSORSHIP_TIERS } from "@/features/sponsors/types";

const ease = [0.22, 1, 0.36, 1] as const;

const currentSponsors = [
  {
    name: "UNSW Arc",
    logo: "/home/unsw-arc-logo.png",
    url: "https://www.arc.unsw.edu.au/",
  },
  {
    name: "UNSW Engineering",
    logo: "/home/unsw-engineering-logo.png",
    url: "https://www.engineering.unsw.edu.au/",
  },
  {
    name: "UNSW Founders",
    logo: "/home/unsw-founders-logo.png",
    url: "https://www.founders.unsw.edu.au/",
  },
  {
    name: "Engineers Australia",
    logo: "/home/engineers-australia-logo.png",
    url: "https://www.engineersaustralia.org.au/",
  },
  {
    name: "Jinro",
    logo: "/home/Jinro_logo_-_no_background.png",
    url: "https://jinro.com.au/",
  },
  {
    name: "Pure Matcha",
    logo: "/home/purematcha-logo.avif",
    url: "https://purematcha.com.au/",
  },
  {
    name: "Domino's",
    logo: "/home/dominos.svg",
    url: "https://www.dominos.com.au/",
  },
  {
    name: "KOKO amuesment",
    logo: "/home/koko.jpg",
    url: "https://kokoamusement.com.au/",
  },
];

const stats = [
  { icon: Users, value: "1,800+", label: "Active Members" },
  { icon: Calendar, value: "41", label: "Annual Events" },
  { icon: BarChart3, value: "100,000+", label: "Monthly Social Views" },
  { icon: TrendingUp, value: "20.3%", label: "Female Engagement Growth" },
];

const achievements = [
  "2025 ARC Clubs Outstanding Event Series Award (Sumobots) - Winners",
  "2025 ARC Club of the Year Award - Runners Up",
  "Largest robotics-related society in NSW",
  "Over 300 students in annual competitions",
];

const featuredEvents = [
  {
    title: "Sumobots",
    description:
      "Our flagship annual competition where students design and build autonomous robots. With engagement more than doubling every year, Sumobots attracted 371 participants in 2025 and won the ARC Clubs Outstanding Event Series Award.",
    stats: ["371 participants", "Standard & Open streams", "Term-long competition"],
  },
  {
    title: "Buildathon",
    description:
      "A humanitarian engineering event in partnership with CSESoc and MCIC, centered on UN Sustainable Development Goals. Teams create mechatronic solutions judged on technical execution, aesthetics, and impact.",
    stats: ["193 participants", "41 teams", "$300 prize money"],
  },
  {
    title: "Industry Night",
    description:
      "Annual booth-based networking event connecting students with industry representatives. Students learn about experiences and discover internship or graduate opportunities.",
    stats: ["409 attendees in 2025", "Booth presentations", "Direct networking"],
  },
  {
    title: "Women in Mechatronics Panel",
    description:
      "Part of the UNSW Diversity Festival, promoting equity of opportunity. The 2025 panel featured representatives from leading companies including Lunar Outpost, Quantium, Breaker, Stryker, and UNSW Redback Racing.",
    stats: ["90 attendees", "Industry speakers", "First-of-its-kind"],
  },
];

export default function SponsorsPage() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <main className="bg-white">
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative flex min-h-[70vh] items-center overflow-hidden bg-primary-950"
      >
        <motion.div className="absolute inset-0 -z-0" style={{ scale: heroScale }}>
          <Image
            src="/team/hero.webp"
            alt="RAMSoc team"
            fill
            className="object-cover"
            priority
            quality={90}
          />
        </motion.div>
        <div className="absolute inset-0 bg-primary-700/50" />
        <div className="absolute inset-0 bg-primary-950/40" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-white to-transparent" />

        <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-32 md:px-12 lg:px-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="mb-4 block text-xs font-bold tracking-[0.3em] text-primary-400 uppercase"
          >
            // Partner With Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            className="text-7xl font-bold text-white md:text-8xl lg:text-9xl"
          >
            Our
            <br />
            <span className="text-primary-400">Sponsors</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, ease, delay: 0.35 }}
            className="my-6 h-1.5 w-16 origin-left bg-primary-400"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.45 }}
            className="max-w-md text-base leading-relaxed text-white/60"
          >
            Connect with the next generation of robotics and mechatronics
            engineers at UNSW.
          </motion.p>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="relative overflow-hidden border-b border-neutral-200 bg-white py-16">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-2 gap-0 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative border-l border-neutral-200 px-6 py-6 first:border-l-0 lg:px-8"
              >
                <stat.icon
                  size={18}
                  strokeWidth={1.5}
                  className="mb-4 text-primary-500 group-hover:text-primary-400"
                />
                <div className="mb-1 text-4xl font-black tracking-tight text-primary-950 md:text-5xl lg:text-7xl">
                  {stat.value}
                </div>
                <div className="text-xs font-medium tracking-[0.2em] text-neutral-400 uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Current Sponsors ── */}
      <section className="relative overflow-hidden bg-white py-28 text-primary-950 md:py-36">
        {/* Decorative lines */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-[25%] h-full w-px bg-neutral-100" />
          <div className="absolute top-0 left-[75%] h-full w-px bg-neutral-100" />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <span className="mb-4 block text-xs font-bold tracking-[0.3em] text-primary-500 uppercase">
              // 01 — Current Partners
            </span>
            <h2 className="text-5xl font-bold md:text-6xl lg:text-8xl">
              Our
              <br />
              <span className="text-primary-500">Partners</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 gap-px bg-neutral-100 md:grid-cols-4">
            {currentSponsors.map((sponsor, index) => (
              <motion.div
                key={sponsor.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Link
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex aspect-square items-center justify-center bg-white p-8 transition-colors hover:bg-primary-50/50"
                >
                  <Image
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    width={120}
                    height={120}
                    className="object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Decorative large number */}
        <motion.span
          className="pointer-events-none absolute right-8 bottom-12 hidden select-none text-[12rem] font-black leading-none text-primary-500/5 lg:block xl:right-20 xl:text-[16rem]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          01
        </motion.span>
      </section>

      {/* ── About + Why Sponsor ── */}
      <section className="relative overflow-hidden bg-[#030a18] py-28 text-white md:py-36">
        {/* Decorative vertical lines */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-[25%] h-full w-px bg-white/8" />
          <div className="absolute top-0 left-[75%] h-full w-px bg-white/8" />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <span className="mb-4 block text-xs font-bold tracking-[0.3em] text-primary-400 uppercase">
              // 02 — About RAMSoc
            </span>
            <h2 className="text-5xl font-bold md:text-6xl lg:text-8xl">
              Who We
              <br />
              <span className="text-primary-400">Are</span>
            </h2>
          </motion.div>

          <div className="grid gap-16 lg:grid-cols-2">
            {/* Left — about text + achievements */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="space-y-5 text-base leading-relaxed text-white/60">
                <p>
                  The UNSW Robotics and Mechatronics Society (RAMSoc) is a
                  student-led society that brings together students passionate
                  about robotics and its applications. As the largest
                  robotics-related society within the university and in all of
                  NSW, we proudly represent a rapidly growing member base of
                  over 1,800 students.
                </p>
                <p>
                  We organize and host over 30 events each year, including
                  competitions, workshops, industry nights, site visits, and
                  socials. Our aim is to offer students a wide variety of
                  opportunities to develop their engineering skills, participate
                  in team-based challenges, and grow their professional
                  networks.
                </p>
              </div>

              <div className="mt-10">
                <div className="mb-5 flex items-center gap-3">
                  <Award size={18} strokeWidth={1.5} className="text-primary-400" />
                  <span className="text-xs font-bold tracking-[0.2em] text-primary-400 uppercase">
                    Achievements
                  </span>
                </div>
                <ul className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start gap-3 text-sm text-white/50"
                    >
                      <span className="mt-1.5 size-1 shrink-0 bg-primary-400" />
                      {achievement}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Right — goals + why sponsor */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-8"
            >
              <div className="border-l-2 border-primary-500 p-8">
                <Target
                  size={18}
                  strokeWidth={1.5}
                  className="mb-4 text-primary-400"
                />
                <h3 className="mb-4 text-xl font-bold">2026 Goals</h3>
                <ul className="space-y-3 text-sm text-white/50">
                  <li className="flex gap-3">
                    <span className="font-bold text-primary-400">01</span>
                    Expand and strengthen our Women in Mechatronics community
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary-400">02</span>
                    Give back through impactful fundraising and outreach
                    initiatives
                  </li>
                  <li className="flex gap-3">
                    <span className="font-bold text-primary-400">03</span>
                    Elevate our flagship events to reflect our growing audience
                  </li>
                </ul>
              </div>

              <div className="border-l-2 border-primary-500 p-8">
                <Building2
                  size={18}
                  strokeWidth={1.5}
                  className="mb-4 text-primary-400"
                />
                <h3 className="mb-4 text-xl font-bold">Why Sponsor RAMSoc?</h3>
                <ul className="space-y-3 text-sm text-white/50">
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 size-1 shrink-0 bg-primary-400" />
                    Access to top engineering talent passionate about robotics
                    and mechatronics
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 size-1 shrink-0 bg-primary-400" />
                    Direct engagement with 1,800+ motivated students through
                    events and workshops
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 size-1 shrink-0 bg-primary-400" />
                    Brand visibility across social media platforms with 100,000+
                    monthly views
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1.5 size-1 shrink-0 bg-primary-400" />
                    Opportunity to shape future engineers through mentorship and
                    collaboration
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative large number */}
        <motion.span
          className="pointer-events-none absolute right-8 bottom-12 hidden select-none text-[12rem] font-black leading-none text-white/2 lg:block xl:right-20 xl:text-[16rem]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          02
        </motion.span>
      </section>

      {/* ── Sponsorship Tiers ── */}
      <section className="relative overflow-hidden bg-white py-28 text-primary-950 md:py-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-[25%] h-full w-px bg-neutral-100" />
          <div className="absolute top-0 left-[75%] h-full w-px bg-neutral-100" />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <span className="mb-4 block text-xs font-bold tracking-[0.3em] text-primary-500 uppercase">
              // 03 — Packages
            </span>
            <h2 className="text-5xl font-bold md:text-6xl lg:text-8xl">
              Sponsorship
              <br />
              <span className="text-primary-500">Tiers</span>
            </h2>
          </motion.div>

          <div className="grid gap-px bg-neutral-100 md:grid-cols-3">
            {SPONSORSHIP_TIERS.map((tier, index) => (
              <SponsorshipTierCard key={tier.tier} tier={tier} index={index} />
            ))}
          </div>
        </div>

        <motion.span
          className="pointer-events-none absolute right-8 bottom-12 hidden select-none text-[12rem] font-black leading-none text-primary-500/5 lg:block xl:right-20 xl:text-[16rem]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          03
        </motion.span>
      </section>

      {/* ── Benefits Table ── */}
      <section className="relative overflow-hidden bg-white py-28 text-primary-950 md:py-36">
        <div className="relative mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <span className="mb-4 block text-xs font-bold tracking-[0.3em] text-primary-500 uppercase">
              // 04 — Comparison
            </span>
            <h2 className="text-5xl font-bold md:text-6xl lg:text-8xl">
              Detailed
              <br />
              <span className="text-primary-500">Benefits</span>
            </h2>
          </motion.div>

          <SponsorshipBenefitsTable />
        </div>
      </section>

      {/* ── Featured Events ── */}
      <section className="relative overflow-hidden bg-white py-28 text-primary-950 md:py-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-[25%] h-full w-px bg-neutral-100" />
          <div className="absolute top-0 left-[75%] h-full w-px bg-neutral-100" />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-16"
          >
            <span className="mb-4 block text-xs font-bold tracking-[0.3em] text-primary-500 uppercase">
              // 05 — Flagship Events
            </span>
            <h2 className="text-5xl font-bold md:text-6xl lg:text-8xl">
              Featured
              <br />
              <span className="text-primary-500">Events</span>
            </h2>
          </motion.div>

          <div className="grid gap-px bg-neutral-100 md:grid-cols-2">
            {featuredEvents.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 md:p-10"
              >
                <h3 className="mb-3 text-xl font-bold text-primary-950">
                  {event.title}
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-neutral-500">
                  {event.description}
                </p>
                <div className="flex flex-wrap gap-3">
                  {event.stats.map((stat, idx) => (
                    <span
                      key={idx}
                      className="border border-neutral-200 px-3 py-1 text-[0.65rem] font-bold tracking-[0.15em] text-primary-500 uppercase"
                    >
                      {stat}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.span
          className="pointer-events-none absolute right-8 bottom-12 hidden select-none text-[12rem] font-black leading-none text-primary-500/5 lg:block xl:right-20 xl:text-[16rem]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          05
        </motion.span>
      </section>

      {/* ── CTA ── */}
      <section className="relative overflow-hidden bg-[#030a18] py-28 text-white md:py-36">
        <div className="relative mx-auto max-w-[1400px] px-6 text-center md:px-12 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl"
          >
            <span className="mb-4 block text-xs font-bold tracking-[0.3em] text-primary-400 uppercase">
              // 06 — Get In Touch
            </span>
            <h2 className="mb-6 text-5xl font-bold md:text-6xl">
              Ready to <span className="text-primary-400">Partner</span>?
            </h2>
            <p className="mb-10 text-base leading-relaxed text-white/40">
              Join leading organizations in supporting the next generation of
              mechatronics engineers. Contact us to discuss customized
              sponsorship packages.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="mailto:industry@ramsocunsw.org?subject=Sponsorship Inquiry"
                className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition-colors hover:text-primary-400"
              >
                <span className="flex size-12 items-center justify-center bg-primary-500 text-white transition-colors group-hover:bg-primary-400">
                  <Mail size={18} />
                </span>
                Email Us
              </a>
              <a
                href="/RAMSoc Prospectus 2026.pdf"
                download
                className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] text-white transition-colors hover:text-primary-400"
              >
                <span className="flex size-12 items-center justify-center border border-neutral-200/20 transition-colors group-hover:border-primary-500">
                  <HiArrowRight className="size-5 -rotate-45" />
                </span>
                Download Prospectus
              </a>
            </div>
            <p className="mt-10 text-xs tracking-wider text-white/20">
              industry@ramsocunsw.org — University of New South Wales,
              Kensington, NSW 2052
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
