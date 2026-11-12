import AboutUs from "@/app/_components/about-us";
import CareersPreview from "@/app/_components/careers-preview";
import ContactUs from "@/app/_components/contact-us";
import Events from "@/app/_components/events";
import Hero from "@/app/_components/hero";
import MeetTheTeam from "@/app/_components/meet-the-team";
import Sponsored from "@/app/_components/sponsors";
import { getAvailableYears } from "@/server/api/routers/team/service";
import FlagshipEvents from "./_components/flagship-events";

/**
 * Resolves the most recent team year from Contentful so the homepage heading
 * never goes stale. Falls back to the current calendar year if Contentful is
 * unreachable, so a CMS outage can't take down the homepage.
 */
async function getLatestTeamYear(): Promise<number> {
  try {
    const availableYears = await getAvailableYears();
    return (
      availableYears[availableYears.length - 1] ?? new Date().getFullYear()
    );
  } catch {
    return new Date().getFullYear();
  }
}

export default async function HomePage() {
  const teamYear = await getLatestTeamYear();

  return (
    <main>
      <Hero />
      <AboutUs />
      <FlagshipEvents />
      <Events />
      <CareersPreview />
      <MeetTheTeam year={teamYear} />
      <Sponsored />
      <ContactUs />
    </main>
  );
}

export const revalidate = 3600;
