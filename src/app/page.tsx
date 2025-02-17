import AboutUsSection from "@/app/_components/AboutUsSection";
import ContactUsSection from "@/app/_components/ContactUsSection";
import EventsSection from "@/app/_components/EventsSection";
import HeroSection from "@/app/_components/HeroSection";
import MeetTheTeamSection from "@/app/_components/MeetTheTeamSection";
import SponsoredSection from "@/app/_components/SponsoredSection";

import FlagshipEventsSection from "./_components/FlagshipEventsSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection></HeroSection>
      <AboutUsSection></AboutUsSection>
      <FlagshipEventsSection></FlagshipEventsSection>
      <EventsSection></EventsSection>
      <MeetTheTeamSection></MeetTheTeamSection>
      <SponsoredSection></SponsoredSection>
      <ContactUsSection></ContactUsSection>
    </main>
  );
}
