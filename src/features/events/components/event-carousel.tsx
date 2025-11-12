"use client";

import type { CarouselApi } from "@/components/ui/carousel";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import EventCard from "@/features/events/components/event-card-large";
import { EventCardLoading } from "@/features/events/components/event-card-large-loading";
import { NoEvents } from "@/features/events/components/no-event";
import type { Event } from "@/features/events/types";
import { cn } from "@/lib/utils";

interface EventCarouselProps {
  events:
    | {
        upcomingEvents: Event[];
        pastEvents: Event[];
      }
    | undefined;
  isFetching: boolean;
  isError: boolean;
}

export function EventCarousel({
  events,
  isFetching,
  isError,
}: EventCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const upcomingEvents = events?.upcomingEvents || [];
  const hasEvents = !isError && upcomingEvents.length > 0;

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    });
  }, [api]);

  return (
    <>
      {/* Desktop Carousel */}
      {hasEvents && (
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
          }}
          className="hidden lg:block"
        >
          <div className="grid lg:grid-cols-[200px_1fr] lg:items-start lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="sticky top-24 flex flex-col gap-6"
            >
              <div>
                <h2 className="mb-4">Upcoming Events</h2>
                <p className="text-primary-700 mb-8 leading-relaxed">
                  Join us for workshops, competitions, and networking
                  opportunities throughout the year.
                </p>
              </div>

              {upcomingEvents.length > 1 && (
                <div className="flex items-center gap-3">
                  <CarouselPrevious className="border-primary-300 hover:bg-primary-50 static translate-y-0 bg-white" />
                  <CarouselNext className="border-primary-300 hover:bg-primary-50 static translate-y-0 bg-white" />
                </div>
              )}

              {count > 1 && (
                <div className="flex items-center gap-2">
                  {Array.from({ length: count }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => api?.scrollTo(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === current
                          ? "bg-primary-600 w-8"
                          : "bg-primary-300 hover:bg-primary-400 w-2"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              )}

              <Button variant="outline" asChild>
                <Link href="/events">View All Events</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div
                className={cn(
                  "from-primary-50/80 pointer-events-none absolute top-0 left-0 z-10 h-full w-16 bg-linear-to-r to-transparent transition-opacity duration-500",
                  canScrollPrev ? "opacity-100" : "opacity-0",
                )}
              />
              <div
                className={cn(
                  "from-primary-50/80 pointer-events-none absolute top-0 right-0 z-10 h-full w-16 bg-linear-to-l to-transparent transition-opacity duration-500",
                  canScrollNext ? "opacity-100" : "opacity-0",
                )}
              />

              <CarouselContent className="-ml-4">
                {upcomingEvents.map((event) => (
                  <CarouselItem
                    key={event.id}
                    className="pl-4 md:basis-[45%] xl:basis-[45%]"
                  >
                    <div className="h-full">
                      <EventCard data={event} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </motion.div>
          </div>
        </Carousel>
      )}

      {/* Desktop - Loading/Error States */}
      <div className="hidden lg:grid lg:grid-cols-[380px_1fr] lg:items-start lg:gap-16">
        {(isFetching && !events) || isError || !hasEvents ? (
          <>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="sticky top-24 flex flex-col gap-6"
            >
              <div>
                <h2 className="mb-4">Upcoming Events</h2>
                <p className="text-primary-700 mb-8 leading-relaxed">
                  Join us for workshops, competitions, and networking
                  opportunities throughout the year.
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/events">View All Events</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {isFetching && !events && <EventCardLoading />}
              {(isError || (!isFetching && !hasEvents)) && <NoEvents />}
            </motion.div>
          </>
        ) : null}
      </div>

      {/* Mobile Layout */}
      <div className="flex flex-col gap-8 lg:hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="mb-3">Upcoming Events</h2>
          <p className="text-primary-700 mx-auto max-w-2xl">
            Join us for workshops, competitions, and networking opportunities
          </p>
        </motion.div>

        {isFetching && !events && <EventCardLoading />}
        {(isError || (!isFetching && !hasEvents)) && <NoEvents />}
        {hasEvents && (
          <Carousel
            opts={{
              align: "start",
            }}
            className="relative w-full"
          >
            <CarouselContent className="mx-12">
              {upcomingEvents.map((event) => (
                <CarouselItem
                  key={event.id}
                  className="pl-2 sm:basis-1/2 md:pl-4"
                >
                  <div className="h-full">
                    <EventCard data={event} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="border-primary-300 hover:bg-primary-50 left-2 h-9 w-9 bg-white/95 shadow-lg backdrop-blur-sm disabled:opacity-30" />
            <CarouselNext className="border-primary-300 hover:bg-primary-50 right-2 h-9 w-9 bg-white/95 shadow-lg backdrop-blur-sm disabled:opacity-30" />
          </Carousel>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center"
        >
          <Button variant="outline" asChild>
            <Link href="/events">View All Events</Link>
          </Button>
        </motion.div>
      </div>
    </>
  );
}
