import ProfileGrid from "@/features/team/components/profile-grid";
import type { TeamMember } from "@/features/team/types";

interface ExecutivesSectionProps {
  execs: TeamMember[];
}

export const ExecutivesSection = ({ execs }: ExecutivesSectionProps) => {
  if (execs.length === 0) {
    return null;
  }
  return (
    <div className="mb-20">
      <div className="mb-8">
        <h3 className="text-primary-900 mb-3 text-2xl font-semibold">
          Executives
        </h3>
        <p className="text-primary-700 max-w-2xl text-sm leading-relaxed">
          Our executive team leads the society's strategic direction, ensures
          smooth operations, and fosters a welcoming environment for all
          members.
        </p>
      </div>
      <ProfileGrid profileData={execs} background="executive" />
    </div>
  );
};
