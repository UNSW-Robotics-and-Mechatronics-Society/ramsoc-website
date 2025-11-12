"use client";
import { groupBy } from "lodash-es";
import { Fragment, useEffect, useMemo } from "react";

import useEvents from "@/features/events/hooks/useEvents";
import type { PastEvent } from "@/features/events/types";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { getUnswTermAndYear } from "../utils/unsw-date-fns";

import EventCardSmall from "./event-card-small";

export default function PastEvents() {
  const { allEvents, fetchNextPage, hasNextPage, isFetching } = useEvents();
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.5,
  });

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [isIntersecting]);

  const termGroupedPastEvents = useMemo(() => {
    if (allEvents) {
      const eventsByTerm = groupBy(allEvents.pastEvents, (event) => {
        const termAndYear = getUnswTermAndYear(event.start_time);
        return `${termAndYear.year} Term ${termAndYear.term}`;
      });
      return Object.keys(eventsByTerm).map(
        (key) => [key, eventsByTerm[key]] as [string, PastEvent[]],
      );
    }
  }, [allEvents?.pastEvents]);

  return (
    <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {termGroupedPastEvents &&
        termGroupedPastEvents.map(([term, events]) => {
          return (
            <Fragment key={term}>
              <h3 className="text-primary-900 col-span-full mt-8 text-lg font-semibold first:mt-0">
                {term}
              </h3>
              {events.map((event) => (
                <EventCardSmall data={event} key={event.id} />
              ))}
            </Fragment>
          );
        })}
      <div ref={ref} className="h-px w-full"></div>
      <div className="text-primary-600 col-span-full py-8 text-center text-sm">
        {hasNextPage ? "Loading more events..." : "You've reached the end!"}
      </div>
    </div>
  );
}
