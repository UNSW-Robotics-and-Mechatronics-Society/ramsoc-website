"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiArrowRight, HiBriefcase } from "react-icons/hi2";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function CareersPreview() {
  return (
    <section className="bg-primary-900 relative overflow-hidden py-20 text-white">
      {/* Background Pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(30deg,#fff_12%,transparent_12.5%,transparent_87%,#fff_87.5%,#fff),linear-gradient(150deg,#fff_12%,transparent_12.5%,transparent_87%,#fff_87.5%,#fff),linear-gradient(30deg,#fff_12%,transparent_12.5%,transparent_87%,#fff_87.5%,#fff),linear-gradient(150deg,#fff_12%,transparent_12.5%,transparent_87%,#fff_87.5%,#fff)] bg-size-[80px_140px] bg-position-[0_0,0_0,40px_70px,40px_70px]" />
      </div>

      <Container>
        <div className="relative mx-auto max-w-[1400px]">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-primary-500 hidden size-12 items-center justify-center rounded-lg sm:flex">
                  <HiBriefcase className="size-6" />
                </div>
                <h2 className="text-white">Launch Your Career</h2>
              </div>

              <p className="text-primary-100 mb-8 text-lg leading-relaxed">
                Explore exciting opportunities in robotics, mechatronics, and
                engineering. We connect our members with internships, graduate
                positions, and career opportunities from leading companies and
                innovative startups.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" variant="default">
                  <Link href="/careers" className="group">
                    View Opportunities
                    <HiArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 hover:text-white"
                >
                  <Link href="/events">Attend Our Events</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid gap-6 sm:grid-cols-2"
            >
              <div className="rounded-2xl border border-white/20 bg-white/5 p-6 backdrop-blur-sm">
                <div className="text-primary-400 mb-2 text-3xl font-bold">
                  Year-Round
                </div>
                <p className="text-primary-200">Networking Events</p>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/5 p-6 backdrop-blur-sm">
                <div className="text-primary-400 mb-2 text-3xl font-bold">
                  Real-Time
                </div>
                <p className="text-primary-200">Job Updates</p>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
