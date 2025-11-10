import Link from "next/link";

import type { SubcomProfile } from "../types";

import { env } from "@/env";
import styles from "./subcom-profiles.module.scss";

type SubcomProfileCardsType = {
  subcomData: SubcomProfile[];
};

export const SubcomProfiles = ({ subcomData }: SubcomProfileCardsType) => {
  const year = new Date().getFullYear();
  return (
    <div className={styles.subcomMainContainer}>
      {subcomData.length === 0 ? (
        <div className={styles.joinUsMessage}>
          <Link
            href={env.NEXT_PUBLIC_SUBCOMMITTEE_APPLICATION_FORM_URL}
            className="px-5 pb-5"
          >
            <button className={styles.buttonStyle}>Join Our Team</button>
          </Link>
          <p>Be part of our {year} team and contribute to something great 🤖</p>
        </div>
      ) : (
        subcomData.map((team) => (
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
  );
};

export default SubcomProfiles;
