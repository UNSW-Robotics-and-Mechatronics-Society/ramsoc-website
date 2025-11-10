import type { TeamMember } from "../types";

import { ProfileCard } from "./profile-card";
import styles from "./profile-section.module.scss";

interface ProfileSectionProps {
  group: string;
  profiles: TeamMember[];
  backgroundClass: string;
}

export const ProfileSection = ({
  group,
  profiles,
  backgroundClass,
}: ProfileSectionProps) => {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>{group}</h2>
      <div className={styles.profileGrid}>
        {profiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            backgroundClass={backgroundClass}
          />
        ))}
      </div>
    </div>
  );
};
