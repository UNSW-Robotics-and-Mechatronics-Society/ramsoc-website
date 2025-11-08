import type { TeamMember } from "@/features/team/hooks/useTeam";

export const groupProfilesByRole = (
  profileData: TeamMember[],
): Record<string, TeamMember[]> => {
  return profileData.reduce(
    (groups: Record<string, TeamMember[]>, profile: TeamMember) => {
      let groupKey = profile.role
        .split(" ")
        .filter((word: string) => word.toLowerCase() !== "director")
        .join(" ")
        .toUpperCase();

      if (groupKey === "IT") groupKey = "INFORMATION TECHNOLOGY (IT)";
      if (groupKey === "WIM") groupKey = "WOMEN IN ENGINEERING (WIM)";

      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey]!.push(profile);
      return groups;
    },
    {},
  );
};
