import { useMemo } from "react";

import { api } from "@/trpc/react";
import type { Event } from "../types";

export default function useEvents() {
  const query = api.events.getInfinite.useQuery({});
  const allEvents = useMemo(() => {
    if (!query.data) return { upcomingEvents: [], pastEvents: [] };;
    
    const events = query.data.data
    console.log("CHECK 1")
    console.log(events)
    // Seperate events in to upcoming and past
    const upcomingEvents = events.filter((event: Event) => event.upcoming === 1);
    const pastEvents = events.filter((event: Event) => event.upcoming === 0);
    console.log("UPCOMING")
    console.log(upcomingEvents)

    return { upcomingEvents, pastEvents };
  }, [query.data]);
  console.log(allEvents)
  return { allEvents, ...query };
}
