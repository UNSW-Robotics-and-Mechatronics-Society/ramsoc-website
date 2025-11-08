import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import CurrentEvents from "@/features/events/components/current-events";

export default function Events() {
  return (
    <Container outerProps={{ variant: "gradient" }}>
      <div className="w-full">
        <div className="mx-auto flex size-full max-w-[1200px] flex-col items-center justify-between gap-16 py-16">
          <h2 className="text-center">Events</h2>
          <CurrentEvents />
          <Button className="w-fit" variant="outline" asChild>
            <Link href="/events">See Past Events</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
