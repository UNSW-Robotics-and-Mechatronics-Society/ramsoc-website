import AboutUs from "@/app/_components/about-us";
import CareersPreview from "@/app/_components/careers-preview";
import ContactUs from "@/app/_components/contact-us";
import Events from "@/app/_components/events";
import Hero from "@/app/_components/hero";
import MeetTheTeam from "@/app/_components/meet-the-team";
import Sponsored from "@/app/_components/sponsors";
import FlagshipEvents from "./_components/flagship-events";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AboutUs />
      <FlagshipEvents />
      <Events />
      <CareersPreview />
      <MeetTheTeam />
      <Sponsored />
      <ContactUs />
    </main>
  );
}
