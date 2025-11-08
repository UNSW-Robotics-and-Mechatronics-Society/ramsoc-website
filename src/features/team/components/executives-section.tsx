import type { JSX } from "react";

import ProfileCards from "@/features/team/components/profile-cards";
import type { TeamMember } from "@/features/team/hooks/useTeam";

import styles from "./team.module.scss";
import { TitleHeader } from "./title-header";

type ExecutivesSectionProps = {
  execs: TeamMember[];
};

export const ExecutivesSection = ({
  execs,
}: ExecutivesSectionProps): JSX.Element => {
  return (
    <div className={styles.sectionContainer}>
      <TitleHeader text="Executives" />
      <ProfileCards profileData={execs} background="executive" />
    </div>
  );
};
