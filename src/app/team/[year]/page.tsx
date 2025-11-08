import { Hero } from "@/components/hero";
import { YearArrowSelector } from "@/features/team/components/year-arrow-selector";
import { SITE_OG_IMAGE, SITE_URL } from "@/lib/constants/urls";
import { getAvailableYears } from "@/server/api/routers/team/service";
import { api } from "@/trpc/server";
import type { Metadata } from "next";
import Team from "./_components/team";

export const metadata: Metadata = {
  title: "Home | RAMSoc UNSW",
  description:
    "UNSW Robotics and Mechatronics Society (RAMSoc) is a student-run engineering society that aims to provide Mechatronic Engineering opportunities and pathways between mechatronic students and the professional community.",
  openGraph: {
    title: "Home | RAMSoc UNSW",
    description:
      "UNSW Robotics and Mechatronics Society - Connecting mechatronic students with opportunities and the professional community.",
    url: SITE_URL,
    images: `${SITE_URL}${SITE_OG_IMAGE}`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Home | RAMSoc UNSW",
    description:
      "UNSW Robotics and Mechatronics Society - Connecting mechatronic students with opportunities and the professional community.",
  },
};

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
