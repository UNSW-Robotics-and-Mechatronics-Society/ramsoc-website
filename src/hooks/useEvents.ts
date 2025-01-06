import { MetaGraphAPIEventResponse } from "@/types/events";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";

// React hook that fetches and manages event data with infinite scrolling capabilities.
// The hook separates events into upcoming and past categories based on their start times.
export default function useEvents() {
  // Query our api
  const query = useInfiniteQuery<MetaGraphAPIEventResponse>({
    queryKey: ["events"],
    queryFn: async ({ pageParam = undefined }) => {
      return await axios
        .get(`/api/events${pageParam ? `?cursor=${pageParam}` : ""}`)
        .then((res) => res.data);
    },
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.paging.cursors?.after,
  });

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
