import HeroSection from "@/app/teams/[year]/_components/HeroSection";
import TeamSection from "@/app/teams/[year]/_components/TeamSection";
import YearArrowSelector from "@/components/ui/YearArrowSelector";
import { fetchTeamData, getAvailableTeamYears } from "@/lib/utils";

// Next.js will invalidate the cache when a
// request comes in, at most once every 1 hour.
export const revalidate = 3600

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true // or false, to 404 on unknown paths

export const generateStaticParams = async () => {
  const availableYears = await getAvailableTeamYears();
  return availableYears.map((year) => ({ year: year.toString() }));
}

export default async function TeamPage({ params }: { params: Promise<{ year: number }> }) {
  const year = Number((await params).year);
  const teamData = await fetchTeamData(year);
  return (
    <main>
      <HeroSection></HeroSection>
      <YearArrowSelector selectedYear={year} currentYear={new Date().getFullYear()} availableYears={[2024, 2025]}></YearArrowSelector>
      <TeamSection {...teamData}></TeamSection>
    </main>
  );
}
