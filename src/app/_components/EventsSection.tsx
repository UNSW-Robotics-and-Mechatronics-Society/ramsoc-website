import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import CurrentEvents from "@/features/events/components/CurrentEvents";

export default function EventsSection() {
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
