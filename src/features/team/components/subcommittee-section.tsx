import Link from "next/link";

import type { SubcomProfile } from "../types";

import { env } from "@/env";
import styles from "./subcommittee-section.module.scss";

interface SubcommitteeSectionProps {
  subcomProfileData: SubcomProfile[];
  year: number;
}

export const SubcommitteeSection = ({
  subcomProfileData,
  year,
}: SubcommitteeSectionProps) => {
  return (
    <div>
      <div className="mb-8">
        <h3 className="text-primary-900 mb-3 text-2xl font-semibold">
          Subcommittee
        </h3>
        <p className="text-primary-700 max-w-2xl text-sm leading-relaxed">
          Our subcommittee members support directors in executing initiatives,
          from content creation to event logistics and member engagement.
        </p>
      </div>
      <div className={styles.subcomMainContainer}>
        {subcomProfileData.length === 0 ? (
          <div className={styles.emptyStateContainer}>
            <div className={styles.emptyStateContent}>
              <div className={styles.emptyStateActions}>
                <Link
                  href={env.NEXT_PUBLIC_SUBCOMMITTEE_APPLICATION_FORM_URL}
                  className={styles.joinButton}
                >
                  Join Our Team
                </Link>
                <p className={styles.emptyStateFooter}>
                  Be part of our {year} team and contribute to something great
                  🤖
                </p>
              </div>
            </div>
          </div>
        ) : (
          subcomProfileData.map((team) => (
            <div
              className={styles.subcomContainer}
              key={`${team.portfolio}-subcommittee`}
            >
              <h1 className={styles.subcomPosition}>
                {team.portfolio.toLocaleUpperCase()}
              </h1>
              <div className={styles.subcomName}>
                {team.members.map((memberName: string, index: number) => (
                  <p key={`${team.portfolio}-${memberName}-${index}`}>
                    {memberName}
                  </p>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
