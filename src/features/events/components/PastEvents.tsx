"use client";
import { groupBy } from "lodash-es";
import { Fragment, useEffect, useMemo } from "react";

import useEvents from "@/features/events/hooks/useEvents";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { getUnswTermAndYear } from "@/lib/utils";
import { MetaEvent } from "@/types/events";

import EventCardSmall from "./EventCardSmall";

export default function PastEvents() {
  const { allEvents, fetchNextPage, hasNextPage, isFetching } = useEvents();
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.5,
  });

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [isIntersecting, fetchNextPage, hasNextPage, isFetching]);

  const termGroupedPastEvents = useMemo<
    [string, MetaEvent[]][] | undefined
  >(() => {
    if (allEvents) {
      const eventsByTerm = groupBy(allEvents.pastEvents, (event) => {
        const termAndYear = getUnswTermAndYear(event.start_time);
        return `${termAndYear.year} Term ${termAndYear.term}`;
      });
      return Object.keys(eventsByTerm).map(
        (key) => [key, eventsByTerm[key]] as [string, MetaEvent[]],
      );
    }
  }, [allEvents?.pastEvents]);

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {termGroupedPastEvents &&
        termGroupedPastEvents.map(([term, events]) => {
          return (
            <Fragment key={term}>
              <h3 className="col-span-full mt-8 text-xl">{term}</h3>
              {events.map((event) => (
                <EventCardSmall data={event} key={event.id}></EventCardSmall>
              ))}
            </Fragment>
          );
        })}
      <div ref={ref} className="h-px w-full"></div>
      <div className="col-span-full text-center">
        {hasNextPage ? "Loading" : "You have reached the end!"}
      </div>
    </div>
  );
}
