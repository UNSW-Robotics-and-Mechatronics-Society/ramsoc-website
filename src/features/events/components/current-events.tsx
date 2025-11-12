"use client";

import useEvents from "@/features/events/hooks/useEvents";
import { motion } from "framer-motion";

import EventCard from "./event-card-large";
import { EventCardLoading } from "./event-card-large-loading";
import { NoEvents } from "./no-event";

export default function CurrentEvents() {
  const { isFetching, allEvents, isError, error } = useEvents();

  // Show loading state
  if (!allEvents && isFetching) {
    return <EventCardLoading />;
  }

  // Show error state or no events
  if (isError || !allEvents || allEvents.upcomingEvents.length === 0) {
    return <NoEvents />;
  }

  // Show events in a grid layout
  return (
    <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
      {allEvents.upcomingEvents.map((data, idx) => (
        <motion.div
          key={data.id || idx}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          className="h-full"
        >
          <EventCard data={data} />
        </motion.div>
      ))}
    </div>
  );
}
