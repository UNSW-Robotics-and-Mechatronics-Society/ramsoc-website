import type { TeamMember } from "../types";
import { groupProfilesByRole } from "../utils/group-profiles";
import { ProfileCard } from "./profile-card";
import { ProfileSection } from "./profile-section";

import bgStyles from "../styles/profile-backgrounds.module.scss";
import styles from "./profile-grid.module.scss";

type Background = "director" | "executive";

interface ProfileGridsProps {
  profileData: TeamMember[];
  background: Background;
}

export const ProfileGrid = ({ profileData, background }: ProfileGridsProps) => {
  const backgroundClass =
    background === "director"
      ? (bgStyles.directorBGColour ?? "")
      : (bgStyles.execBGColour ?? "");

  if (background === "director") {
    const groupedProfiles = groupProfilesByRole(profileData);

    return (
      <div className={styles.mainContainer}>
        {Object.entries(groupedProfiles).map(([group, profiles]) => (
          <ProfileSection
            key={group}
            profiles={profiles}
            backgroundClass={backgroundClass}
            group={group}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.mainContainer}>
      {profileData.map((profile: TeamMember) => (
        <ProfileCard
          key={profile.id}
          profile={profile}
          backgroundClass={backgroundClass}
        />
      ))}
    </div>
  );
};

export default ProfileGrid;
