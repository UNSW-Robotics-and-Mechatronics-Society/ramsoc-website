import Image from "next/image";
import { JSX } from "react";

import { TeamMember } from "@/types/teamData";

import styles from "./ProfileCards.module.scss";

type Background = "director" | "executive";

type ProfileCardsProp = {
  profileData: TeamMember[];
  background: Background;
};

const groupProfilesByRole = (
  profileData: TeamMember[],
): Record<string, TeamMember[]> => {
  return profileData.reduce(
    (groups: Record<string, TeamMember[]>, profile: TeamMember) => {
      let groupKey = profile.role
        .split(" ")
        .filter((word: string) => word.toLowerCase() !== "director")
        .join(" ")
        .toUpperCase();

      if (groupKey === "IT") groupKey = "INFORMATION TECHNOLOGY (IT)";
      if (groupKey === "WIM") groupKey = "WOMEN IN ENGINEERING (WIM)";

      if (!groups[groupKey]) groups[groupKey] = [];
      groups[groupKey].push(profile);
      return groups;
    },
    {},
  );
};

const ProfileCard = ({
  profile,
  backgroundClass,
}: {
  profile: TeamMember;
  backgroundClass: string;
}) => {
  const hasLinkedIn = profile.linkedin !== undefined;

  return (
    <div className={`${styles.profileContainer} ${backgroundClass}`}>
      <div
        className={`${styles.pictureWrapper} ${hasLinkedIn ? styles.hoverEnabled : ""}`}
      >
        <Image
          src={profile.selfie}
          alt={profile.name}
          className={styles.picture}
          width={500}
          height={500}
        />
        {hasLinkedIn && (
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className={styles.linkedInIcon}
          >
            <img
              src="/icons/linkedinLogo.svg"
              alt="LinkedIn Logo"
              width={96}
              height={96}
            />
          </a>
        )}
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.name}>{profile.name}</h1>
        <div className={styles.position}>{profile.role}</div>
      </div>
      <div className={styles.links}>
        <a
          className="text-primary-900 underline underline-offset-4 hover:text-primary-700"
          href={`mailto:${profile.email}`}
        >
          {profile.email}
        </a>
      </div>
    </div>
  );
};

const ProfileSection = ({
  group,
  profiles,
  backgroundClass,
}: {
  group: string;
  profiles: TeamMember[];
  backgroundClass: string;
}) => {
  return (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>{group}</h2>
      <div className={styles.profileGrid}>
        {profiles.map((profile, index) => (
          <ProfileCard
            key={`${profile.role} card ${index}`}
            profile={profile}
            backgroundClass={backgroundClass}
          />
        ))}
      </div>
    </div>
  );
};

const ProfileCards = ({
  profileData,
  background,
}: ProfileCardsProp): JSX.Element => {
  const backgroundClass =
    background === "director" ? styles.directorBGColour : styles.execBGColour;

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
      {profileData.map((profile, index) => (
        <ProfileCard
          key={`${profile.role} card ${index}`}
          profile={profile}
          backgroundClass={backgroundClass}
        />
      ))}
    </div>
  );
};

export default ProfileCards;
