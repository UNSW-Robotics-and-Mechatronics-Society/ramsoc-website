"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  HiOutlineAcademicCap,
  HiOutlineBriefcase,
  HiOutlineUserGroup,
} from "react-icons/hi2";

const tiers = [
  {
    title: "Executives",
    icon: HiOutlineAcademicCap,
    description:
      "Elected by members at the Annual General Meeting (AGM) in Term 3.",
    detail: "Each executive oversees 2 directors.",
    timing: "T3 — AGM Election",
  },
  {
    title: "Directors",
    icon: HiOutlineBriefcase,
    description:
      "Recruited by executives through an application and interview process in Term 3.",
    detail:
      "Each director manages a portfolio and leads 2 subcommittee members.",
    timing: "T3 — Application & Interview",
  },
  {
    title: "Subcommittee",
    icon: HiOutlineUserGroup,
    description:
      "Recruited by directors at the start of Term 1 through open applications.",
    detail:
      "Subcommittee members support their director's portfolio with hands-on work.",
    timing: "T1 — Open Applications",
  },
] as const;

export function SocietyStructure() {
  return (
    <section className="relative overflow-hidden bg-[#030a18] py-20 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-[25%] h-full w-px bg-white/5" />
        <div className="absolute top-0 left-[75%] h-full w-px bg-white/5" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-primary-400 mb-4 block text-xs font-bold tracking-[0.3em] uppercase">
            // 03 - Structure
          </span>
          <h3 className="text-3xl font-bold md:text-4xl">
            How Our Society <span className="text-primary-400">Works</span>
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/40">
            RAMSoc is an Arc-affiliated society at UNSW. Our team is structured
            in three tiers, recruited across Terms 3 and 1 each year.
          </p>
        </motion.div>

        {/* Vertical tree */}
        <div className="mx-auto flex max-w-md flex-col items-center gap-0">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className="relative flex w-full flex-col items-center"
            >
              {/* Connector line from previous tier */}
              {index > 0 && <div className="h-6 w-px bg-white/10" />}

              {/* Tier card */}
              <div className="hover:border-primary-500/30 w-full border border-white/10 bg-white/5 p-5 transition-colors">
                <div className="mb-2 flex items-center gap-3">
                  <div className="bg-primary-500 flex size-9 items-center justify-center text-white">
                    <tier.icon className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{tier.title}</h4>
                    <span className="text-primary-400 text-xs font-medium tracking-[0.15em] uppercase">
                      {tier.timing}
                    </span>
                  </div>
                </div>
                <p className="mb-1 text-sm leading-relaxed text-white/50">
                  {tier.description}
                </p>
                <p className="text-xs text-white/30">{tier.detail}</p>
              </div>

              {/* Branch indicators */}
              {index < tiers.length - 1 && (
                <div className="flex items-center gap-1 pt-1 text-xs text-white/20">
                  <span>▼</span>
                  <span className="text-primary-400 text-xs font-medium tracking-[0.15em] uppercase">
                    recruits
                  </span>
                  <span>▼</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Apply CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-white/40">
            Interested in joining the team?{" "}
            <Link
              href={
                process.env.NEXT_PUBLIC_SUBCOMMITTEE_APPLICATION_FORM_URL ?? "#"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 decoration-primary-500/30 hover:text-primary-300 font-medium underline underline-offset-2 transition-colors"
            >
              Apply for subcommittee
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
