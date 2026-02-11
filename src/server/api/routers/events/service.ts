import { fetchRubricLandingPage, mapRubricEventToEvent } from "./rubric.provider";
import type { RubricEvent } from "./rubric.types";

import type { GetInfiniteEventsInput } from "./schemas";

/**
 * Fetches events from Rubric API with cursor-based pagination
 * @param input - Contains optional cursor for pagination
 * @returns Events data with pagination information
 */

export async function getInfiniteEvents(input: GetInfiniteEventsInput) {

  const data = await fetchRubricLandingPage()
  const eventsSection = data?.sections?.find((section: any) => section.sectionname === "Events");
  const events: RubricEvent[] = eventsSection?.array ?? [];
  if (events.length === 0) {
    return {
      data: [],
      nextCursor: null,
    };
  }
  const sorted = events.sort((a: RubricEvent, b: RubricEvent) => {
    const a_index = a.eventsortindex ?? 0;
    const b_index = b.eventsortindex ?? 0;
    return a_index - b_index;
  });

  const upcoming = sorted.filter((e) => e.upcoming === 1);
  const past = sorted.filter((e) => e.upcoming === 0);

  const mappedEvents = [...upcoming, ...past].map(mapRubricEventToEvent);
  return {
    data: mappedEvents,
    upcoming,
    past,
  };
}


