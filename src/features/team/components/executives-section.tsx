import ProfileGrid from "@/features/team/components/profile-grid";
import type { TeamMember } from "@/features/team/types";

interface ExecutivesSectionProps {
  execs: TeamMember[];
}

export const ExecutivesSection = ({ execs }: ExecutivesSectionProps) => {
  return <ProfileGrid profileData={execs} background="executive" />;
};
