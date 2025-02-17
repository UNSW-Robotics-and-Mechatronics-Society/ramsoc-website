import { Container } from "@/components/ui/Container";
import CurrentEvents from "@/features/events/components/CurrentEvents";
import PastEvents from "@/features/events/components/PastEvents";

export default function EventsSection() {
  return (
    <Container
      outerProps={{ variant: "gradient" }}
      className="flex flex-col items-center justify-between gap-y-4 px-4 py-16 sm:gap-y-8"
    >
      <h2>Current Events</h2>
      <CurrentEvents></CurrentEvents>
      <h2 className="mt-16"> Past Events</h2>
      <PastEvents></PastEvents>
    </Container>
  );
}
