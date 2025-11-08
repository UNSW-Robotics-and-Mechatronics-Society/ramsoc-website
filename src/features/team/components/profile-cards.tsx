import type { JSX } from "react";

import type { ProfileCardsProps } from "../types/profile-cards.types";
import { groupProfilesByRole } from "../utils/group-profiles";
import { ProfileCard } from "./profile-card";
import { ProfileSection } from "./profile-section";

import bgStyles from "../styles/profile-backgrounds.module.scss";
import styles from "./profile-cards.module.scss";

const ProfileCards = ({
  profileData,
  background,
}: ProfileCardsProps): JSX.Element => {
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
            group={group}
            profiles={profiles}
            backgroundClass={backgroundClass}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.mainContainer}>
      {profileData.map((profile) => (
        <ProfileCard
          key={profile.id}
          profile={profile}
          backgroundClass={backgroundClass}
        />
      ))}
    </div>
  );
};

export default ProfileCards;
