import SubcomProfiles from "@/features/team/components/subcom-profiles";
import type { SubcomProfile } from "@/features/team/types";

import styles from "./team.module.scss";
import { TitleHeader } from "./title-header";

interface SubcommitteeSectionProps {
  subcomProfileData: SubcomProfile[];
}

export const SubcommitteeSection = ({
  subcomProfileData,
}: SubcommitteeSectionProps) => {
  return (
    <div className={styles.sectionContainer}>
      <TitleHeader text="Subcommittees" />
      <SubcomProfiles subcomData={subcomProfileData} />
    </div>
  );
};
