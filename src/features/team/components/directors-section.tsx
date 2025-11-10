import ProfileGrid from "@/features/team/components/profile-grid";
import type { TeamMember } from "@/features/team/types";

import styles from "./team.module.scss";
import { TitleHeader } from "./title-header";

interface DirectorsSectionProps {
  directors: TeamMember[];
}

export const DirectorsSection = ({ directors }: DirectorsSectionProps) => {
  return (
    <div className={styles.sectionContainer}>
      <TitleHeader text="Directors" />
      <ProfileGrid profileData={directors} background="director" />
    </div>
  );
};
