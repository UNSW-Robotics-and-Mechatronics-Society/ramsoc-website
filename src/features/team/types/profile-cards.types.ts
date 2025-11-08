import type { TeamMember } from "@/features/team/hooks/useTeam";

export type Background = "director" | "executive";

export type ProfileCardsProps = {
  profileData: TeamMember[];
  background: Background;
};
