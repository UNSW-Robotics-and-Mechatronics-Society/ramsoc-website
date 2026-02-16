"use client";

import { Container } from "@/components/ui/container";
import { motion } from "framer-motion";
import {
  HiOutlineAcademicCap,
  HiOutlineBriefcase,
  HiOutlineUserGroup,
} from "react-icons/hi2";

const tiers = [
  {
    title: "Executives",
    icon: HiOutlineAcademicCap,
    description: "Elected by members at the Annual General Meeting (AGM) in Term 3.",
    detail: "Each executive oversees 2 directors.",
    timing: "T3 — AGM Election",
    color: "primary-700",
    bgColor: "bg-primary-700",
    borderColor: "border-primary-700",
    textColor: "text-primary-700",
    lightBg: "bg-primary-50",
  },
  {
    title: "Directors",
    icon: HiOutlineBriefcase,
    description:
      "Recruited by executives through an application and interview process in Term 3.",
    detail: "Each director manages a portfolio and leads 2 subcommittee members.",
    timing: "T3 — Application & Interview",
    color: "primary-500",
    bgColor: "bg-primary-500",
    borderColor: "border-primary-500",
    textColor: "text-primary-500",
    lightBg: "bg-primary-50/50",
  },
  {
    title: "Subcommittee",
    icon: HiOutlineUserGroup,
    description:
      "Recruited by directors at the start of Term 1 through open applications.",
    detail:
      "Subcommittee members support their director's portfolio with hands-on work.",
    timing: "T1 — Open Applications",
    color: "primary-400",
    bgColor: "bg-primary-400",
    borderColor: "border-primary-400",
    textColor: "text-primary-400",
    lightBg: "bg-primary-50/30",
  },
] as const;

export function SocietyStructure() {
  return (
    <section className="border-b border-primary-100 bg-white py-16">
      <Container>
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <h3 className="mb-3 text-2xl font-semibold text-primary-900">
              How Our Society Works
            </h3>
            <p className="text-sm leading-relaxed text-primary-700">
              RAMSoc is an Arc-affiliated society at UNSW. Our team is structured
              in three tiers, recruited across Terms 3 and 1 each year.
            </p>
          </motion.div>

          {/* Vertical tree */}
          <div className="relative flex flex-col items-center gap-0">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.15 }}
                className="relative flex w-full max-w-md flex-col items-center"
              >
                {/* Connector line from previous tier */}
                {index > 0 && (
                  <div className="h-6 w-px bg-primary-300" />
                )}

                {/* Tier card */}
                <div
                  className={`w-full rounded-xl border-l-4 ${tier.borderColor} ${tier.lightBg} p-5 shadow-sm`}
                >
                  <div className="mb-2 flex items-center gap-3">
                    <div
                      className={`flex size-9 items-center justify-center rounded-lg ${tier.bgColor} text-white`}
                    >
                      <tier.icon className="size-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary-900">
                        {tier.title}
                      </h4>
                      <span
                        className={`text-xs font-medium ${tier.textColor}`}
                      >
                        {tier.timing}
                      </span>
                    </div>
                  </div>
                  <p className="mb-1 text-sm leading-relaxed text-primary-800">
                    {tier.description}
                  </p>
                  <p className="text-xs text-primary-600">{tier.detail}</p>
                </div>

                {/* Branch indicators */}
                {index < tiers.length - 1 && (
                  <div className="flex items-center gap-1 pt-1 text-xs text-primary-400">
                    <span>▼</span>
                    <span className="text-primary-500">recruits</span>
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
            className="mt-10 text-center"
          >
            <p className="text-sm text-primary-600">
              Interested in joining the team?{" "}
              <a
                href={process.env.NEXT_PUBLIC_SUBCOMMITTEE_APPLICATION_FORM_URL ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary-500 underline decoration-primary-300 underline-offset-2 transition-colors hover:text-primary-400"
              >
                Apply for subcommittee
              </a>
            </p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
