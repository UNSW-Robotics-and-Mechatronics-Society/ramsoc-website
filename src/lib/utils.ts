import { clsx, type ClassValue } from "clsx";
import { Asset } from "contentful";
import { parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";

import { client } from "@/lib/contentful-client";
import { SubcomProfileData } from "@/types/subcomData";
import { TeamMember, TeamStructure } from "@/types/teamData";
import { SchoolTerm, Term } from "@/types/term";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUnswTermAndYear(dateString: string): SchoolTerm {
  const date = parseISO(dateString);
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  let term: Term;
  if (year > 2019) {
    if (month >= 1 && month <= 5) {
      term = Term.Term1; // Term 1: February - May
    } else if (month >= 6 && month <= 8) {
      term = Term.Term2; // Term 2: June - August
    } else {
      term = Term.Term3; // Term 3: September - January
    }
  } else {
    if (month >= 2 && month <= 6) {
      term = Term.Term1; // Term 1: February - June
    } else {
      term = Term.Term2; // Term 2: July - December
    }
  }

  return {
    year,
    term,
  };
}

export const fetchTeamData = async (year: number): Promise<TeamStructure> => {
  const response = await client.getEntries({
    content_type: "team",
    "fields.year": year,
    order: ["fields.year", "fields.role", "fields.name"],
  });

  const yearTeamData: TeamMember[] = response.items.map((item) => {
    const selfieUrl = (item.fields.selfie as Asset)?.fields.file?.url; // without https
    const formattedSelfieUrl = selfieUrl
      ? `https:${selfieUrl}?fm=webp&fit=fill&w=500&h=500` // format: .webp, fitting: fill, dimention: 500px * 500px
      : "";

    return {
      id: item.sys.id as string,
      name: item.fields.name as string,
      role: item.fields.role as string,
      year: item.fields.year as number,
      selfie: formattedSelfieUrl as string,
      email: item.fields.email as string,
      linkedin: item.fields.linkedin as string,
    };
  });

  return categorizeTeamMembersByRole(yearTeamData);
};

const categorizeTeamMembersByRole = (
  teamMembers: TeamMember[],
): TeamStructure => {
  /* 
    Categorizing conditions:
    - execs: teamMember.role doesn't include director nor subcommittee
    - directors: teamMember.role includes director
    - subcoms: teamMember.role includes subcommittee
  */

  const execs: TeamMember[] = [];
  const directors: TeamMember[] = [];
  const subcoms: SubcomProfileData[] = [];

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
    if (member.role.toLowerCase().includes("subcommittee")) {
      const portfolioName = member.role
        .toLowerCase()
        .replace(" subcommittee", "");
      const portfolioSubcoms = subcoms.find(
        (subcom) => subcom.portfolio === portfolioName,
      );
      if (!portfolioSubcoms) {
        subcoms.push({ portfolio: portfolioName, members: [member.name] });
      } else {
        portfolioSubcoms.members.push(member.name);
      }
    } else if (member.role.toLowerCase().includes("director")) {
      directors.push(member);
    } else if (!member.role.toLowerCase().includes("none")) {
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

export const getAvailableTeamYears = async (): Promise<number[]> => {
  const response = await client.getEntries({
    content_type: "team",
    order: ["fields.year"],
  });

  const availableYears: number[] = [];
  response.items.forEach((item) => {
    if (item.fields && item.fields.year) {
      const year: number = item.fields.year as number;
      if (!availableYears.includes(year)) {
        availableYears.push(year);
      }
    }
  });
  return availableYears;
};

/**
 * Normalize the call to action URL from a career entry.
 * @param ctaUrl - Call to action URL from career entry
 * @returns Normalized call to action URL or null if invalid
 */
export const normalizeCareerCtaUrlStrict = (
  ctaUrl: string | null | undefined,
): string | null => {
  if (!ctaUrl || ctaUrl.trim() === "") {
    return null;
  }

  const trimmedUrl = ctaUrl.trim();

  try {
    // If it already has protocol, validate it
    if (/^https?:\/\//i.test(trimmedUrl)) {
      new URL(trimmedUrl); // Throws if invalid
      return trimmedUrl;
    }

    // Add https:// and validate
    const normalizedUrl = trimmedUrl.startsWith("www.")
      ? `https://${trimmedUrl}`
      : `https://${trimmedUrl}`;

    new URL(normalizedUrl); // Throws if invalid
    return normalizedUrl;
  } catch {
    // Invalid URL
    return null;
  }
};
