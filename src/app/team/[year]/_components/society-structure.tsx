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
    <section className="relative overflow-hidden border-b border-neutral-200 bg-white py-20">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="mb-4 block text-xs font-bold tracking-[0.3em] text-primary-500 uppercase">
            // Structure
          </span>
          <h3 className="text-3xl font-bold text-primary-950 md:text-4xl">
            How Our Society <span className="text-primary-500">Works</span>
          </h3>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-400">
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
              {index > 0 && (
                <div className="h-6 w-px bg-neutral-200" />
              )}

              {/* Tier card */}
              <div className="w-full border border-neutral-200 bg-white p-5 transition-colors hover:border-primary-500/30">
                <div className="mb-2 flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center bg-primary-500 text-white">
                    <tier.icon className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary-950">
                      {tier.title}
                    </h4>
                    <span className="text-xs font-medium tracking-[0.15em] text-primary-500 uppercase">
                      {tier.timing}
                    </span>
                  </div>
                </div>
                <p className="mb-1 text-sm leading-relaxed text-neutral-500">
                  {tier.description}
                </p>
                <p className="text-xs text-neutral-400">{tier.detail}</p>
              </div>

              {/* Branch indicators */}
              {index < tiers.length - 1 && (
                <div className="flex items-center gap-1 pt-1 text-xs text-neutral-300">
                  <span>▼</span>
                  <span className="text-xs font-medium tracking-[0.15em] text-primary-500 uppercase">
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
          <p className="text-sm text-neutral-400">
            Interested in joining the team?{" "}
            <Link
              href={
                process.env.NEXT_PUBLIC_SUBCOMMITTEE_APPLICATION_FORM_URL ??
                "#"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary-500 underline decoration-primary-300 underline-offset-2 transition-colors hover:text-primary-400"
            >
              Apply for subcommittee
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
