import type { GetInfiniteEventsInput } from "./schemas";
import { fetchRubricLandingPage } from "./rubric.provider";
import type { RubricEvent } from "./rubric.types";

function mapRubricEvent(e: RubricEvent) {
  return {
    id: e.eventid,
    name: e.title.trim(),
    description: "",
    start_time: e.formatteddate ?? "",
    end_time: "",
    place: e.subtitle ? { name: e.subtitle } : undefined,
    cover: e.image
      ? { offset_x: 0, offset_y: 0, source: e.image }
      : undefined,
    upcoming: e.upcoming === 1,
    url: e.destination ?? undefined,
    info: e.info ?? undefined,
  };
}

/**
 * Fetches events from the Rubric API
 */
export async function getInfiniteEvents(_input: GetInfiniteEventsInput) {
  const data = await fetchRubricLandingPage();

  const eventsSection = data?.sections?.find(
    (section) => section.sectionname === "Events",
  );

  const events: RubricEvent[] = eventsSection?.array ?? [];

  const sorted = [...events].sort(
    (a, b) => (a.eventsortindex ?? 0) - (b.eventsortindex ?? 0),
  );

  return {
    data: sorted.map(mapRubricEvent),
  };
}
