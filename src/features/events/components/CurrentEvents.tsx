"use client";

import useEvents from "@/features/events/hooks/useEvents";

import EventCard from "./EventCardLarge";
import { EventCardLoading } from "./EventCardLargeLoading";
import { NoEvents } from "./NoEvents";

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
