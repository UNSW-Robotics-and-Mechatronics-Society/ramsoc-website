"use client";

import { Hero } from "@/components/hero";
import Events from "./_components/events";

export default function EventsPage() {
  return (
    <main className="w-full">
      <Hero imageSrc="/events/hero.webp" imageAlt="Collage of events at RAMSoc">
        Our Events
      </Hero>
      <Events />
    </main>
  );
}
