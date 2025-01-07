import { Container } from "@/components/ui/Container";
import CurrentEvents from "@/features/events/components/CurrentEvents";
import PastEvents from "@/features/events/components/PastEvents";

export default function EventsSection() {
  return (
    <Container
      outerProps={{ variant: "gradient" }}
      className="flex flex-col items-center justify-between px-4 py-16"
    >
      <h2 className="mb-8">Current Events</h2>
      <CurrentEvents></CurrentEvents>
      <h2 className="mb-8 mt-16"> Past Events</h2>
      <PastEvents></PastEvents>
    </Container>
  );
}
