import type { JSX } from "react";

import SubcomProfiles from "@/features/team/components/subcom-profiles";
import type { SubcomProfileData } from "@/features/team/hooks/useTeam";

import styles from "./team.module.scss";
import { TitleHeader } from "./title-header";

type SubcommitteeSectionProps = {
  subcomProfileData: SubcomProfileData[];
};

export const SubcommitteeSection = ({
  subcomProfileData,
}: SubcommitteeSectionProps): JSX.Element => {
  return (
    <div className={styles.sectionContainer}>
      <TitleHeader text="Subcommittees" />
      <SubcomProfiles subcomData={subcomProfileData} />
    </div>
  );
};
