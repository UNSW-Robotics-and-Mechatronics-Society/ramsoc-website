import ProfileGrid from "@/features/team/components/profile-grid";
import type { TeamMember } from "@/features/team/types";

import styles from "./team.module.scss";
import { TitleHeader } from "./title-header";

interface ExecutivesSectionProps {
  execs: TeamMember[];
}

export const ExecutivesSection = ({ execs }: ExecutivesSectionProps) => {
  return (
    <div className={styles.sectionContainer}>
      <TitleHeader text="Executives" />
      <ProfileGrid profileData={execs} background="executive" />
    </div>
  );
};
