import { useMemo } from "react";

import { api } from "@/trpc/react";
import type { Event } from "../types";

export default function useEvents() {
  const query = api.events.getInfinite.useQuery({});

  const allEvents = useMemo(() => {
    if (!query.data) return undefined;

    const events = query.data.data;

    const upcomingEvents = events.filter((event: Event) => event.upcoming);
    const pastEvents = events.filter((event: Event) => !event.upcoming);

    return { upcomingEvents, pastEvents };
  }, [query.data]);

  return { allEvents, ...query };
}
