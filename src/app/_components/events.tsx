"use client";

import { Container } from "@/components/ui/container";
import { EventCarousel, useEvents } from "@/features/events";

export default function Events() {
  const { isFetching, allEvents, isError } = useEvents();

  return (
    <section className="bg-primary-50/30 py-20">
      <Container className="px-0 sm:px-0 lg:px-8">
        <div className="mx-auto max-w-[1400px]">
          <EventCarousel
            events={allEvents}
            isFetching={isFetching}
            isError={isError}
          />
        </div>
      </Container>
    </section>
  );
}
