"use client";
import { Button } from "@/components/ui/Button";
import CurrentEvents from "@/features/CurrentEvents";
import Link from "next/link";

export default function EventsSection() {
  return (
    <div className="w-full bg-gradient-to-b from-neutral-50 via-primary-100 to-primary-100">
      <div className="mx-auto flex h-full w-full max-w-[1200] flex-col items-center justify-between gap-16 py-16">
        <h2 className="text-center text-5xl">Events</h2>
        <CurrentEvents />
        <Button className="w-fit" variant="outline" asChild>
          <Link href="/events">See Past Events</Link>
        </Button>
      </div>
    </div>
  );
}
