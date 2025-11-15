import ProfileGrid from "@/features/team/components/profile-grid";
import type { TeamMember } from "@/features/team/types";

interface DirectorsSectionProps {
  directors: TeamMember[];
}

export const DirectorsSection = ({ directors }: DirectorsSectionProps) => {
  if (directors.length === 0) {
    return null;
  }
  return (
    <div className="mb-20">
      <div className="mb-8">
        <h3 className="text-primary-900 mb-3 text-2xl font-semibold">
          Directors
        </h3>
        <p className="text-primary-700 max-w-2xl text-sm leading-relaxed">
          Our directors oversee key areas of the society, from events and
          sponsorships to marketing and IT infrastructure.
        </p>
      </div>
      <ProfileGrid profileData={directors} background="director" />
    </div>
  );
};
