import EventsSection from "@/app/_components/EventsSection";
import HeroSection from "@/app/_components/HeroSection";
import SponsoredSection from "@/app/_components/SponsoredSection";
import AboutUsSection from "@/app/_components/AboutUsSection";
import ContactUsSection from "@/app/_components/ContactUsSection";
import MeetTheTeamSection from "@/app/_components/MeetTheTeamSection";

export default function HomePage() {
  return (
    <main className="w-full text-primary-800">
      <HeroSection></HeroSection>
      <AboutUsSection></AboutUsSection>
      <EventsSection></EventsSection>
      <MeetTheTeamSection></MeetTheTeamSection>
      <SponsoredSection></SponsoredSection>
      <ContactUsSection></ContactUsSection>
    </main>
  );
}
