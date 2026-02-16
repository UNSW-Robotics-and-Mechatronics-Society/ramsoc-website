"use client";

import { Fragment } from "react";

import useEvents from "@/features/events/hooks/useEvents";

import EventCardSmall from "./event-card-small";

export default function PastEvents() {
  const { allEvents, isFetching } = useEvents();

  const pastEvents = allEvents?.pastEvents ?? [];

  if (isFetching && pastEvents.length === 0) {
    return (
      <div className="text-primary-600 col-span-full py-8 text-center text-sm">
        Loading past events...
      </div>
    );
  }

  if (pastEvents.length === 0) {
    return (
      <div className="text-primary-600 col-span-full py-8 text-center text-sm">
        No past events to show.
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      <Fragment>
        {pastEvents.map((event) => (
          <EventCardSmall data={event} key={event.id} />
        ))}
      </Fragment>
      <div className="text-primary-600 col-span-full py-8 text-center text-sm">
        You&apos;ve reached the end!
      </div>
    </div>
  );
}
