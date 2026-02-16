import { SITE_OG_IMAGE, SITE_URL } from "@/lib/constants/urls";
import { getAvailableYears } from "@/server/api/routers/team/service";
import { api } from "@/trpc/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { TeamPageClient } from "./_components/team-page-client";

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
      siteName: "RAMSoc UNSW",
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

  const availableYears = await api.team.getAvailableYears();

  if (isNaN(year) || !availableYears.includes(year)) {
    const latestYear = availableYears[availableYears.length - 1];
    if (latestYear) {
      redirect(`/team/${latestYear}`);
    }
    redirect("/");
  }

  const teamData = await api.team.getByYear({ year });

  return (
    <TeamPageClient
      year={year}
      availableYears={availableYears}
      teamData={teamData}
    />
  );
}

export async function generateStaticParams() {
  const availableYears = await getAvailableYears();

  return availableYears.map((year) => ({
    year: year.toString(),
  }));
}

export const revalidate = 3600;
