"use client";
import HeroSection from "@/app/events/_components/HeroSection";
import CurrentEvents from "@/features/events/components/CurrentEvents";
import PastEvents from "@/features/events/components/PastEvents";

export default function EventsPage() {
  return (
    <main className="w-full text-primary-800">
      <HeroSection></HeroSection>
      <div className="w-full bg-gradient-to-b from-neutral-50 via-primary-100 to-primary-100">
        <div className="mx-auto flex size-full max-w-[1200px] flex-col items-center justify-between gap-16 px-4 py-16">
          <h2 className="text-5xl">Current Events</h2>
          <CurrentEvents></CurrentEvents>
          <h2 className="text-5xl"> Past Events</h2>
          <PastEvents></PastEvents>
        </div>
      </div>
    </main>
  );
}
