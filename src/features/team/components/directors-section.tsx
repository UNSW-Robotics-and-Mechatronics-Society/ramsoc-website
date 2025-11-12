import ProfileGrid from "@/features/team/components/profile-grid";
import type { TeamMember } from "@/features/team/types";

interface DirectorsSectionProps {
  directors: TeamMember[];
}

export const DirectorsSection = ({ directors }: DirectorsSectionProps) => {
  return <ProfileGrid profileData={directors} background="director" />;
};
