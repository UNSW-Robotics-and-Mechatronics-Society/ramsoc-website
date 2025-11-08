import { Hero } from "@/components/hero";
import { YearArrowSelector } from "@/features/team/components/year-arrow-selector";
import { SITE_OG_IMAGE, SITE_URL } from "@/lib/constants/urls";
import { getAvailableYears } from "@/server/api/routers/team/service";
import { api } from "@/trpc/server";
import type { Metadata } from "next";
import Team from "./_components/team";

export async function generateMetadata(
  props: PageProps<"/team/[year]">,
): Promise<Metadata> {
  const { year: yearStr } = await props.params;
  const year = parseInt(yearStr, 10);

  return {
    title: `${year} Team | RAMSoc UNSW`,
    description: `Meet the ${year} RAMSoc UNSW team - our executives, directors, and subcommittee members driving innovation in robotics and mechatronics.`,
    openGraph: {
      title: `${year} Team | RAMSoc UNSW`,
      description: `Meet the ${year} RAMSoc UNSW team - executives, directors, and subcommittee members.`,
      url: `${SITE_URL}/team/${year}`,
      images: `${SITE_URL}${SITE_OG_IMAGE}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${year} Team | RAMSoc UNSW`,
      description: `Meet the ${year} RAMSoc UNSW team - executives, directors, and subcommittee members.`,
    },
  };
}

export default async function TeamPage(props: PageProps<"/team/[year]">) {
  const { year: yearStr } = await props.params;
  const year = parseInt(yearStr, 10);

  // Fetch data in parallel on the server
  const [teamData, availableYears] = await Promise.all([
    api.team.getByYear({ year }),
    api.team.getAvailableYears(),
  ]);

  return (
    <div>
      <Hero imageSrc="/team/hero.webp" imageAlt="Collage of events at RAMSoc">
        <span className="block before:content-['Our_Team'] hover:before:content-['THE_GOATS']" />
      </Hero>
      <YearArrowSelector selectedYear={year} availableYears={availableYears} />
      <Team {...teamData} />
    </div>
  );
}

export async function generateStaticParams() {
  const availableYears = await getAvailableYears();

  return availableYears.map((year) => ({
    year: year.toString(),
  }));
}

export const revalidate = 3600;
