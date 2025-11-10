import { client } from "@/lib/contentful/client";
import type { Asset } from "contentful";

import { ContentfulApiException, TeamNotFoundException } from "./exceptions";
import type {
  SubcomProfileSchema,
  TeamMemberSchema,
  TeamStructureSchema,
} from "./schemas";

/**
 * Categorizes team members by their role into executives, directors, and subcommittees
 */
const categorizeTeamMembersByRole = (
  teamMembers: TeamMemberSchema[],
): TeamStructureSchema => {
  /*
    Categorizing conditions:
    - execs: teamMember.role doesn't include director nor subcommittee
    - directors: teamMember.role includes director
    - subcoms: teamMember.role includes subcommittee
  */

  const execs: TeamMemberSchema[] = [];
  const directors: TeamMemberSchema[] = [];
  const subcoms: SubcomProfileSchema[] = [];

  const execOrder = [
    "president",
    "vice president",
    "secretary",
    "arc delegate",
    "treasurer",
    "grievance & edi officer",
    "marketing executive",
    "technical executive",
    "industry & sponsorships executive",
  ];

  teamMembers.forEach((member) => {
    const role = member.role;
    const roleLower = role.toLowerCase();

    if (roleLower.includes("subcommittee")) {
      const portfolioName = roleLower.replace(" subcommittee", "");
      const portfolioSubcoms = subcoms.find(
        (subcom) => subcom.portfolio === portfolioName,
      );
      if (!portfolioSubcoms) {
        subcoms.push({ portfolio: portfolioName, members: [member.name] });
      } else {
        portfolioSubcoms.members.push(member.name);
      }
    } else if (roleLower.includes("director")) {
      directors.push(member);
    } else if (!roleLower.includes("none")) {
      execs.push(member);
    } else {
      console.error(`Unrecognized role: ${member.name}`);
    }
  });

  execs.sort(
    (a, b) =>
      execOrder.indexOf(a.role.toLowerCase()) -
      execOrder.indexOf(b.role.toLowerCase()),
  );
  directors.sort((a, b) => a.role.localeCompare(b.role));

  return {
    executives: execs,
    directors: directors,
    subcommittees: subcoms,
  };
};

/**
 * Fetches team data for a specific year from Contentful CMS
 * @throws {TeamNotFoundException} if no team members found for the year
 * @throws {ContentfulApiException} if Contentful API request fails
 */
export const getTeamByYear = async (
  year: number,
): Promise<TeamStructureSchema> => {
  try {
    const response = await client.getEntries({
      content_type: "team",
      "fields.year": year,
      order: ["fields.year", "fields.role", "fields.name"],
    });

    if (response.items.length === 0) {
      throw new TeamNotFoundException(year);
    }

    const yearTeamData: TeamMemberSchema[] = response.items.map((item) => {
      const selfieAsset = item.fields.selfie as Asset | undefined;
      const selfieFileUrl = selfieAsset?.fields.file?.url;
      const formattedSelfieUrl =
        selfieFileUrl && typeof selfieFileUrl === "string"
          ? `https:${selfieFileUrl}?fm=webp&fit=fill&w=400&h=400&q=85` // Optimized: webp format, 400x400, quality 85
          : "";

      return {
        id: item.sys.id,
        name: item.fields.name as string,
        role: item.fields.role as string,
        year: item.fields.year as number,
        selfie: formattedSelfieUrl,
        email: item.fields.email as string,
        linkedin: item.fields.linkedin as string,
      };
    });

    return categorizeTeamMembersByRole(yearTeamData);
  } catch (error: unknown) {
    // Re-throw custom exceptions
    if (error instanceof TeamNotFoundException) {
      throw error;
    }

    // Wrap Contentful errors
    throw new ContentfulApiException(
      "Failed to fetch team data from Contentful",
    );
  }
};

/**
 * Fetches all available team years from Contentful CMS
 * @throws {ContentfulApiException} if Contentful API request fails
 */
export const getAvailableYears = async (): Promise<number[]> => {
  try {
    const response = await client.getEntries({
      content_type: "team",
      order: ["fields.year"],
    });

    const availableYears: number[] = [];
    response.items.forEach((item) => {
      if (item.fields?.year) {
        const year: number = item.fields.year as number;
        if (!availableYears.includes(year)) {
          availableYears.push(year);
        }
      }
    });
    return availableYears;
  } catch (error: unknown) {
    throw new ContentfulApiException(
      "Failed to fetch available team years from Contentful",
    );
  }
};
