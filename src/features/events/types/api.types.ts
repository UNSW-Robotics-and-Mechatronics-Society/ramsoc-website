import type { RouterOutputs } from "@/trpc/react";

export type EventsInfiniteOutput = RouterOutputs["events"]["getInfinite"];
export type Event = EventsInfiniteOutput["data"][number];
export type UpcomingEvent = Event;
export type PastEvent = Event;
