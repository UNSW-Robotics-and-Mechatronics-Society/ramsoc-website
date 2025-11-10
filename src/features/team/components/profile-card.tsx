import Image from "next/image";
import { FaLinkedinIn } from "react-icons/fa";

import { Card, CardContent } from "@/components/ui/card";
import type { TeamMember } from "../types";

import styles from "./profile-card.module.scss";

interface ProfileCardProps {
  profile: TeamMember;
  backgroundClass: string;
}

export const ProfileCard = ({ profile, backgroundClass }: ProfileCardProps) => {
  const hasLinkedIn = profile.linkedin !== undefined && profile.linkedin !== "";

  return (
    <Card className={`${styles.profileCard} ${backgroundClass}`}>
      <CardContent className={styles.cardContent}>
        <div className={styles.imageContainer}>
          <Image
            src={profile.selfie}
            alt={profile.name}
            className={styles.picture}
            width={320}
            height={256}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
            loading="lazy"
            quality={85}
          />
        </div>

        <div className={styles.profileInfo}>
          <h3 className={styles.name}>{profile.name}</h3>
          <p className={styles.role}>{profile.role}</p>

          <a href={`mailto:${profile.email}`} className={styles.email}>
            {profile.email}
          </a>

          {hasLinkedIn && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className={styles.linkedinLink}
            >
              <FaLinkedinIn className={styles.linkedinIcon} />
              <span>LinkedIn</span>
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
