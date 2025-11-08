import { useMemo } from "react";

import { api } from "@/trpc/react";

export default function useEvents() {
  const query = api.events.getInfinite.useInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  const allEvents = useMemo(() => {
    if (!query.data) return;
    // Data comes back in many pages so we flatten to a singular dimension
    const flattenedData = query.data.pages.flatMap((v) => {
      return v.data;
    });

    // Seperate events in to upcoming and past
    const upcomingEvents = flattenedData.filter((v) => {
      return Date.parse(v.start_time) > Date.now();
    });
    const pastEvents = flattenedData?.filter((v) => {
      return Date.parse(v.start_time) <= Date.now();
    });

    return { upcomingEvents, pastEvents };
  }, [query.data]);

  return { allEvents, ...query };
}

export type UseEventsReturn = ReturnType<typeof useEvents>;

export type Events = NonNullable<UseEventsReturn["allEvents"]>;

export type UpcomingEvent = Events["upcomingEvents"][number];

export type PastEvent = Events["pastEvents"][number];

export type Event = UpcomingEvent | PastEvent;
