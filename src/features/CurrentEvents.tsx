"use client";

import Image from "next/image";

import EventCard, { EventCardLoading } from "@/components/ui/EventCard";
import useEvents from "@/hooks/useEvents";

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
        <>
          <Image
            src="/home/sleeping-logo.svg"
            alt="sleeping ramsoc logo"
            width={500}
            height={387}
            className="translate-x-[2.5%]"
          ></Image>
          <p>There are no events currently. Check back later!</p>
        </>
      )}
    </>
  );
}
