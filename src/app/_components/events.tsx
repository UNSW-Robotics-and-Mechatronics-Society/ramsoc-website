"use client";

import { format, parseISO } from "date-fns";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HiArrowRight, HiCalendar, HiMapPin } from "react-icons/hi2";

import { Button } from "@/components/ui/button";
import { useEvents } from "@/features/events";
import type { Event } from "@/features/events/types";
import { getFacebookEventUrl } from "@/lib/constants/urls";

function EventCardFeatured({ event }: { event: Event }) {
  return (
    <Link
      href={getFacebookEventUrl(event.id)}
      target="_blank"
      className="group relative block overflow-hidden"
    >
      {/* Large image */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-neutral-100 md:aspect-video">
        {event.cover ? (
          <Image
            src={event.cover.source}
            alt={event.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 60vw"
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
          <span className="text-xs font-medium tracking-wider text-white/50">
            {format(parseISO(event.start_time), "dd MMM yyyy")}
          </span>
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
        <p className="line-clamp-2 max-w-xl text-sm leading-relaxed text-white/40">
          {event.description}
        </p>

        {/* Hover indicator */}
        <div className="mt-6 flex items-center gap-2 text-sm font-bold tracking-[0.15em] text-primary-400 uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span>View Event</span>
          <HiArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

function EventCardCompact({ event, index }: { event: Event; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: 0.1 * index }}
    >
      <Link
        href={getFacebookEventUrl(event.id)}
        target="_blank"
        className="group flex gap-5 border-b border-neutral-100 py-5 transition-colors hover:border-primary-500/30"
      >
        {/* Thumbnail */}
        <div className="relative size-20 shrink-0 overflow-hidden bg-neutral-100 md:size-24">
          {event.cover ? (
            <Image
              src={event.cover.source}
              alt={event.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="96px"
              unoptimized
            />
          ) : (
            <div className="flex size-full items-center justify-center">
              <HiCalendar className="size-8 text-neutral-300" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <span className="mb-1 text-[0.65rem] font-semibold tracking-[0.2em] text-primary-500/70 uppercase">
            {format(parseISO(event.start_time), "dd MMM yyyy · hh:mm aa")}
          </span>
          <h4 className="line-clamp-2 text-sm font-bold leading-snug text-primary-950 transition-colors group-hover:text-primary-500 md:text-base">
            {event.name}
          </h4>
          {event.place && (
            <span className="mt-1 line-clamp-1 text-xs text-neutral-400">
              {event.place.name}
            </span>
          )}
        </div>

        {/* Arrow */}
        <div className="flex shrink-0 items-center">
          <HiArrowRight className="size-4 text-neutral-300 transition-all group-hover:translate-x-1 group-hover:text-primary-500" />
        </div>
      </Link>
    </motion.div>
  );
}

function EventsSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <div className="aspect-video animate-pulse bg-neutral-100" />
      </div>
      <div className="space-y-4 lg:col-span-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex gap-4">
            <div className="size-20 shrink-0 animate-pulse bg-neutral-100" />
            <div className="flex-1 space-y-2 py-2">
              <div className="h-3 w-24 animate-pulse bg-neutral-100" />
              <div className="h-4 w-full animate-pulse bg-neutral-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Events() {
  const { isFetching, allEvents, isError } = useEvents();

  const upcomingEvents = allEvents?.upcomingEvents ?? [];
  const pastEvents = allEvents?.pastEvents ?? [];

  // Use upcoming events first, then fall back to past events
  const hasUpcoming = upcomingEvents.length > 0;
  const displayEvents = hasUpcoming ? upcomingEvents : pastEvents;
  const featuredEvent = displayEvents[0];
  const sideEvents = displayEvents.slice(1, 5);

  return (
    <section className="relative overflow-hidden bg-white py-28 text-primary-950 md:py-36">
      {/* Decorative vertical lines */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-[25%] h-full w-px bg-neutral-100" />
        <div className="absolute top-0 left-[75%] h-full w-px bg-neutral-100" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-12 lg:px-20">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex items-end justify-between"
        >
          <div>
            <span className="mb-4 block text-xs font-bold tracking-[0.3em] text-primary-500 uppercase">
              // 02 — {hasUpcoming ? "Upcoming" : "Recent"} Events
            </span>
            <h2 className="text-5xl font-bold md:text-6xl lg:text-8xl">
              {hasUpcoming ? (
                <>
                  What&apos;s
                  <br />
                  <span className="text-primary-500">Coming Up</span>
                </>
              ) : (
                <>
                  Past
                  <br />
                  <span className="text-primary-500">Events</span>
                </>
              )}
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button
              asChild
              size="none"
              className="group hidden items-center gap-3 rounded-none border-0 bg-transparent px-0 text-sm font-bold uppercase tracking-[0.2em] text-primary-950 transition-colors hover:bg-transparent hover:text-primary-500 md:inline-flex"
            >
              <Link href="/events">
                <span className="flex size-12 items-center justify-center border border-neutral-200 transition-colors group-hover:border-primary-500">
                  <HiArrowRight className="size-5 transition-transform group-hover:translate-x-0.5" />
                </span>
                All Events
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Events layout */}
        {isFetching && !allEvents ? (
          <EventsSkeleton />
        ) : isError ? (
          <div className="border border-neutral-200 px-8 py-16 text-center">
            <p className="text-sm tracking-wider text-neutral-400 uppercase">
              Unable to load events at this time
            </p>
          </div>
        ) : featuredEvent ? (
          <div className="grid gap-px lg:grid-cols-5">
            {/* Featured event — large left */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-3"
            >
              <EventCardFeatured event={featuredEvent} />
            </motion.div>

            {/* Side list — compact cards */}
            <div className="border-l border-neutral-100 lg:col-span-2 lg:pl-8">
              <div className="mb-4 border-b border-neutral-200 pb-3">
                <span className="text-[0.6rem] font-bold tracking-[0.3em] text-neutral-400 uppercase">
                  {hasUpcoming ? "More Upcoming" : "More Events"}
                </span>
              </div>
              {sideEvents.length > 0 ? (
                sideEvents.map((event, index) => (
                  <EventCardCompact
                    key={event.id}
                    event={event}
                    index={index}
                  />
                ))
              ) : (
                <p className="py-8 text-center text-sm text-neutral-400">
                  No additional events to show
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="border border-neutral-200 px-8 py-16 text-center">
            <p className="text-sm tracking-wider text-neutral-400 uppercase">
              No events to display
            </p>
          </div>
        )}

        {/* Mobile CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 md:hidden"
        >
          <Button
            asChild
            size="none"
            className="group inline-flex items-center gap-3 rounded-none border-0 bg-transparent px-0 text-sm font-bold uppercase tracking-[0.2em] text-primary-950 transition-colors hover:bg-transparent hover:text-primary-500"
          >
            <Link href="/events">
              <span className="flex size-12 items-center justify-center border border-neutral-200 transition-colors group-hover:border-primary-500">
                <HiArrowRight className="size-5" />
              </span>
              View All Events
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Decorative large number */}
      <motion.span
        className="pointer-events-none absolute right-8 bottom-12 hidden select-none text-[12rem] font-black leading-none text-primary-500/5 lg:block xl:right-20 xl:text-[16rem]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        02
      </motion.span>
    </section>
  );
}
