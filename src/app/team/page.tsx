import { getAvailableYears } from "@/server/api/routers/team/service";
import { redirect } from "next/navigation";

/**
 * /team — redirects to the latest available team year.
 * Replaces the hardcoded next.config.js redirect so we always
 * land on a year that actually has data in Contentful.
 */
export default async function TeamRedirectPage() {
  const availableYears = await getAvailableYears();
  const latestYear = availableYears[availableYears.length - 1];

  if (latestYear) {
    redirect(`/team/${latestYear}`);
  }

  // Fallback: no team data exists at all
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <p className="text-sm tracking-wider text-neutral-400 uppercase">
        No team data available yet.
      </p>
    </div>
  );
}
