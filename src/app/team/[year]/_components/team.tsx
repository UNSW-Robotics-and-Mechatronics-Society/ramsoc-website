"use client";

import { motion } from "framer-motion";

import {
  DirectorsSection,
  ExecutivesSection,
  SubcommitteeSection,
  type TeamStructure,
} from "@/features/team";

interface TeamSectionProps extends TeamStructure {
  year: number;
}

const Team = (team: TeamSectionProps) => {
  return (
    <section
      className="relative overflow-hidden bg-white py-28 text-primary-950 md:py-36"
      key={team.year}
    >
      {/* Faint grid background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />

      {/* Decorative vertical lines */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-[25%] h-full w-px bg-neutral-100" />
        <div className="absolute top-0 left-[75%] h-full w-px bg-neutral-100" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        {/* Executives Section */}
        <div className="mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <span className="mb-4 block text-xs font-bold tracking-[0.3em] text-primary-500 uppercase">
              // 01 — Leadership
            </span>
            <h2 className="text-5xl font-bold md:text-6xl lg:text-8xl">
              Executive
              <br />
              <span className="text-primary-500">Team</span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-400">
              Our executive team leads the society&apos;s strategic direction,
              ensures smooth operations, and fosters a welcoming environment for
              all members.
            </p>
          </motion.div>
          <ExecutivesSection execs={team.executives} />
        </div>

        {/* Directors Section */}
        <div className="mb-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <span className="mb-4 block text-xs font-bold tracking-[0.3em] text-primary-500 uppercase">
              // 02 — Management
            </span>
            <h2 className="text-5xl font-bold md:text-6xl lg:text-8xl">
              Our
              <br />
              <span className="text-primary-500">Directors</span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-400">
              Our directors oversee key areas of the society, from events and
              sponsorships to marketing and IT infrastructure.
            </p>
          </motion.div>
          <DirectorsSection directors={team.directors} />
        </div>

        {/* Subcommittee Section */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <span className="mb-4 block text-xs font-bold tracking-[0.3em] text-primary-500 uppercase">
              // 03 — Support
            </span>
            <h2 className="text-5xl font-bold md:text-6xl lg:text-8xl">
              Sub
              <br />
              <span className="text-primary-500">Committee</span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-400">
              Our subcommittee members support directors in executing
              initiatives, from content creation to event logistics and member
              engagement.
            </p>
          </motion.div>
          <SubcommitteeSection subcomProfileData={team.subcommittees} />
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
        T
      </motion.span>
    </section>
  );
};

export default Team;
