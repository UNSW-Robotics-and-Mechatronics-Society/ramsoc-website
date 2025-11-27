import { gql } from "@apollo/client";

/**
 * Query to fetch all team members for a specific year
 * - Returns all fields needed to build the team structure
 * - Supports pagination via limit and skip
 */
export const GET_TEAM_MEMBERS_BY_YEAR = gql`
  query GetTeamMembersByYear($year: Int!, $limit: Int!, $skip: Int!) {
    teamCollection(
      where: { year: $year }
      order: [year_ASC, role_ASC, name_ASC]
      limit: $limit
      skip: $skip
    ) {
      total
      items {
        sys {
          id
        }
        year
        name
        role
        email
        linkedin
        selfie {
          url
        }
      }
    }
  }
`;

/**
 * Query to check if a specific year has any team members
 * Only fetches the total count for efficiency
 */
export const CHECK_IF_TEAM_EXISTS_IN_YEAR = gql`
  query CheckIfTeamExistsByYear($year: Int!) {
    teamCollection(where: { year: $year }, limit: 0) {
      total
    }
  }
`;
