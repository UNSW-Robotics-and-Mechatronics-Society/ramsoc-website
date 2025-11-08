"use client";

import useEvents from "@/features/events/hooks/useEvents";

import EventCard from "./event-card-large";
import { EventCardLoading } from "./event-card-large-loading";
import { NoEvents } from "./no-event";

export default function CurrentEvents() {
  const { isFetching, allEvents } = useEvents();
  return (
    <>
      {!allEvents && isFetching && <EventCardLoading></EventCardLoading>}

      {allEvents &&
        allEvents.upcomingEvents.length > 0 &&
        allEvents.upcomingEvents.map((data, idx) => (
          <EventCard data={data} key={idx}></EventCard>
        ))}

      {allEvents && allEvents.upcomingEvents.length === 0 && (
        <NoEvents></NoEvents>
      )}
    </>
  );
}
