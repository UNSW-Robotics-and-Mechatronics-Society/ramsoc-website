import { apolloClient } from "@/lib/contentful/client";

import { EXECUTIVES_IN_ORDER, YEAR_SEARCH_RANGE } from "./constants";
import { ContentfulApiException, TeamNotFoundException } from "./exceptions";
import {
  CHECK_IF_TEAM_EXISTS_IN_YEAR,
  GET_TEAM_MEMBERS_BY_YEAR,
} from "./graphql";
import {
  type GetTeamByYearData,
  type GetTeamMembersByYearData,
} from "./graphql.types";
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
      EXECUTIVES_IN_ORDER.indexOf(a.role.toLowerCase()) -
      EXECUTIVES_IN_ORDER.indexOf(b.role.toLowerCase()),
  );
  directors.sort((a, b) => a.role.localeCompare(b.role));

  return {
    executives: execs,
    directors: directors,
    subcommittees: subcoms,
  };
};

/**
 * Fetches team data for a specific year from Contentful CMS using Apollo Client GraphQL
 * @throws {TeamNotFoundException} if no team members found for the year
 * @throws {ContentfulApiException} if Contentful API request fails
 */
export const getTeamByYear = async (
  year: number,
): Promise<TeamStructureSchema> => {
  try {
    const allTeamMembers: TeamMemberSchema[] = [];
    const batchSize = 100;
    let skip = 0;
    let hasMore = true;
    let total = 0;

    // Paginate through all team members for this year
    while (hasMore) {
      const { data } = await apolloClient.query<GetTeamMembersByYearData>({
        query: GET_TEAM_MEMBERS_BY_YEAR,
        variables: {
          year,
          limit: batchSize,
          skip,
        },
      });

      if (!data?.teamCollection) {
        throw new Error("No team collection data returned from GraphQL");
      }

      // Store total from first request
      if (skip === 0) {
        total = data.teamCollection.total;

        // If no members found, throw error
        if (total === 0) {
          throw new TeamNotFoundException(year);
        }
      }

      // Process and add team members from this batch
      const batchMembers: TeamMemberSchema[] = data.teamCollection.items.map(
        (item) => {
          const selfieUrl = item.selfie?.url;
          const formattedSelfieUrl = selfieUrl
            ? `${selfieUrl}?fm=webp&fit=fill&w=400&h=400&q=85`
            : "";

          return {
            id: item.sys.id,
            name: item.name,
            role: item.role,
            year: item.year,
            selfie: formattedSelfieUrl,
            email: item.email,
            linkedin: item.linkedin,
          };
        },
      );

      allTeamMembers.push(...batchMembers);

      // Check if we need to fetch more
      const fetched = skip + data.teamCollection.items.length;
      hasMore = fetched < total;
      skip += batchSize;
    }

    return categorizeTeamMembersByRole(allTeamMembers);
  } catch (error: unknown) {
    // Re-throw custom exceptions
    if (error instanceof TeamNotFoundException) {
      throw error;
    }

    // Wrap GraphQL/Apollo errors
    throw new ContentfulApiException(
      `Failed to fetch team data from Contentful: ${error}`,
    );
  }
};

/**
 * Fetches all available team years from Contentful CMS using Apollo Client GraphQL
 * @throws {ContentfulApiException} if Contentful API request fails
 */
export const getAvailableYears = async (): Promise<number[]> => {
  try {
    // Query all years in parallel: each query only checks total count for efficiency
    const results = await Promise.all(
      YEAR_SEARCH_RANGE.map((year) =>
        apolloClient
          .query<GetTeamByYearData>({
            query: CHECK_IF_TEAM_EXISTS_IN_YEAR,
            variables: { year },
          })
          .then((result) => ({
            year,
            exists: (result.data?.teamCollection?.total ?? 0) > 0,
          }))
          .catch(() => ({ year, exists: false })),
      ),
    );

    // Filter to only years that have team members
    const availableYears = results
      .filter((r) => r.exists)
      .map((r) => r.year)
      .sort((a, b) => a - b);

    return availableYears;
  } catch (error: unknown) {
    throw new ContentfulApiException(
      `Failed to fetch available team years from Contentful: ${error}`,
    );
  }
};
