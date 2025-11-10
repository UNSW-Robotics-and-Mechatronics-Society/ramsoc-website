import { useMemo } from "react";

import { api } from "@/trpc/react";
import type { Event, EventsInfiniteOutput } from "../types";

export default function useEvents() {
  const query = api.events.getInfinite.useInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage: EventsInfiniteOutput) => lastPage.nextCursor,
    },
  );

  const allEvents = useMemo(() => {
    if (!query.data) return;
    // Data comes back in many pages so we flatten to a singular dimension
    const flattenedData = query.data.pages.flatMap(
      (page: EventsInfiniteOutput) => page.data,
    );

    // Seperate events in to upcoming and past
    const upcomingEvents = flattenedData.filter((event: Event) => {
      return Date.parse(event.start_time) > Date.now();
    });
    const pastEvents = flattenedData?.filter((event: Event) => {
      return Date.parse(event.start_time) <= Date.now();
    });

    return { upcomingEvents, pastEvents };
  }, [query.data]);

  return { allEvents, ...query };
}
