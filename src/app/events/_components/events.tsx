import { Container } from "@/components/ui/container";
import { CurrentEvents, PastEvents } from "@/features/events";

export default function Events() {
  return (
    <Container
      outerProps={{ variant: "gradient" }}
      className="flex flex-col items-center justify-between gap-y-4 px-4 py-16 sm:gap-y-8"
    >
      <h2>Current Events</h2>
      <CurrentEvents />
      <h2 className="mt-16"> Past Events</h2>
      <PastEvents />
    </Container>
  );
}
