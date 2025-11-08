import type { JSX } from "react";

import ProfileCards from "@/features/team/components/profile-cards";
import type { TeamMember } from "@/features/team/hooks/useTeam";

import styles from "./team.module.scss";
import { TitleHeader } from "./title-header";

type DirectorsSectionProps = {
  directors: TeamMember[];
};

export const DirectorsSection = ({
  directors,
}: DirectorsSectionProps): JSX.Element => {
  return (
    <div className={styles.sectionContainer}>
      <TitleHeader text="Directors" />
      <ProfileCards profileData={directors} background="director" />
    </div>
  );
};
