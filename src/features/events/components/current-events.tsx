"use client";

import useEvents from "@/features/events/hooks/useEvents";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HiArrowRight, HiCalendar, HiMapPin } from "react-icons/hi2";

import type { Event } from "../types";
import EventCard from "./event-card-large";
import { EventCardLoading } from "./event-card-large-loading";
import { NoEvents } from "./no-event";

function FeaturedEvent({ event }: { event: Event }) {
  return (
    <Link
      href={event.url ?? "#"}
      target="_blank"
      className="group relative block overflow-hidden"
    >
      <div className="relative aspect-16/10 w-full overflow-hidden bg-neutral-100 md:aspect-[21/9]">
        {event.cover ? (
          <Image
            src={event.cover.source}
            alt={event.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1400px) 100vw, 1400px"
            unoptimized
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-neutral-100">
            <HiCalendar className="size-20 text-neutral-300" />
          </div>
        )}
        {/* Heavy gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-primary-950 via-primary-950/60 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-primary-950/40 to-transparent" />
      </div>

      {/* Content overlaid at bottom */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
        <div className="mb-3 flex items-center gap-4">
          <span className="bg-primary-500 px-3 py-1 text-[0.65rem] font-bold tracking-[0.2em] text-white uppercase">
            Featured
          </span>
          {event.start_time && (
            <span className="text-xs font-medium tracking-wider text-white/50">
              {event.start_time}
            </span>
          )}
        </div>
        <h3 className="mb-3 text-3xl font-black leading-tight text-white md:text-4xl lg:text-5xl">
          {event.name}
        </h3>
        {event.place && (
          <div className="mb-4 flex items-center gap-2 text-sm text-white/40">
            <HiMapPin className="size-4 shrink-0" />
            <span className="line-clamp-1">{event.place.name}</span>
          </div>
        )}
        {event.description && (
          <p className="line-clamp-2 max-w-xl text-sm leading-relaxed text-white/40">
            {event.description}
          </p>
        )}

        {/* Hover indicator */}
        <div className="mt-6 flex items-center gap-2 text-sm font-bold tracking-[0.15em] text-primary-400 uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span>View Event</span>
          <HiArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

export default function CurrentEvents() {
  const { isFetching, allEvents, isError } = useEvents();

  // Show loading state
  if (!allEvents && isFetching) {
    return <EventCardLoading />;
  }

  // Show error state or no events
  if (isError || !allEvents || allEvents.upcomingEvents.length === 0) {
    return <NoEvents />;
  }

  const featured = allEvents.upcomingEvents[0]!;
  const remaining = allEvents.upcomingEvents.slice(1);

  return (
    <div>
      {/* Featured event */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <FeaturedEvent event={featured} />
      </motion.div>

      {/* Remaining events in grid */}
      {remaining.length > 0 && (
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {remaining.map((data, idx) => (
            <motion.div
              key={data.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.08 }}
              className="h-full"
            >
              <EventCard data={data} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
