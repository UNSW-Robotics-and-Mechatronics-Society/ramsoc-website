"use client";

import useEvents from "@/features/events/hooks/useEvents";
import { motion } from "framer-motion";

import EventCardSmall from "./event-card-small";

export default function PastEvents() {
  const { allEvents, isFetching } = useEvents();

  const pastEvents = allEvents?.pastEvents ?? [];

  if (isFetching && pastEvents.length === 0) {
    return (
      <div className="col-span-full py-8 text-center text-sm tracking-wider text-neutral-400 uppercase">
        Loading past events...
      </div>
    );
  }

  if (pastEvents.length === 0) {
    return (
      <div className="col-span-full py-8 text-center text-sm tracking-wider text-neutral-400 uppercase">
        No past events to show.
      </div>
    );
  }

  return (
    <div className="grid gap-x-12 md:grid-cols-2">
      {pastEvents.map((event, idx) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: idx * 0.05 }}
        >
          <EventCardSmall data={event} />
        </motion.div>
      ))}
      <div className="col-span-full py-12 text-center text-xs font-bold tracking-[0.3em] text-neutral-300 uppercase">
        You&apos;ve reached the end
      </div>
    </div>
  );
}
