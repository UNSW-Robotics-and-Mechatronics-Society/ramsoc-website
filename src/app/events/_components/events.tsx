"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/ui/container";
import { CurrentEvents, PastEvents } from "@/features/events";

export default function Events() {
  return (
    <section className="bg-primary-50/30 py-20">
      <Container>
        <div className="mx-auto max-w-[1400px]">
          {/* Current Events Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="mb-4">Upcoming Events</h2>
            <p className="text-primary-700 max-w-2xl leading-relaxed">
              Join us for workshops, competitions, and networking opportunities
              throughout the year
            </p>
          </motion.div>
          <CurrentEvents />

          {/* Past Events Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-32 mb-12"
          >
            <h2 className="mb-4">Past Events</h2>
            <p className="text-primary-700 max-w-2xl leading-relaxed">
              Take a look at our previous events and what we&apos;ve
              accomplished together
            </p>
          </motion.div>
          <PastEvents />
        </div>
      </Container>
    </section>
  );
}
