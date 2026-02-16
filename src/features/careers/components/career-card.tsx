import { intervalToDuration } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import {
  FaClock,
  FaDollarSign,
  FaEnvelope,
  FaExternalLinkAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { env } from "@/env";
import { getNotionPageUrl } from "@/lib/constants/urls";
import { normalizeCareerCtaUrlStrict } from "../utils/career-url";

import type { Career } from "../types";
import styles from "./career-card.module.scss";

interface Props {
  career: Career;
  onClick: (id: string) => void;
}

export function CareerCard({ career, onClick }: Props) {
  const {
    company,
    ctaUrl,
    deadline,
    description,
    email,
    id,
    location,
    logo,
    pay,
    position,
    tags,
    type,
    hasDetails,
  } = career;

  const timeUntil = useMemo(() => {
    if (!deadline) {
      return;
    }

    const durationGranularity = ["years", "months", "days", "hours"] as const;

    const duration = intervalToDuration({
      start: Date.now(),
      end: new Date(deadline),
    });

    const index = durationGranularity.findIndex(
      (granularity) => !!duration[granularity],
    );
    if (index === -1) {
      return;
    }

    const granularity = durationGranularity[index];
    if (!granularity) {
      return;
    }

    const timeTo = duration[granularity];
    if (!timeTo || timeTo < 0) {
      return;
    }

    return {
      granularity:
        timeTo === 1
          ? granularity.substring(0, granularity.length - 1)
          : granularity,
      time: timeTo,
    };
  }, [deadline]);

  const normalizedctaUrl = normalizeCareerCtaUrlStrict(ctaUrl);

  const notionApplyUrl = useMemo(() => {
    if (normalizedctaUrl) {
      return normalizedctaUrl;
    }

    const dbId = env.NEXT_PUBLIC_NOTION_CAREERS_DB_SOURCE_ID;
    if (!dbId || !position) {
      return null;
    }

    return getNotionPageUrl(id);
  }, [normalizedctaUrl, id, position]);

  return (
    <div
      className={styles.card}
      data-clickable={hasDetails}
      onClick={hasDetails ? () => onClick(id) : undefined}
    >
      <div className={styles.inner}>
        {/* Logo */}
        <div className={styles.logoWrap}>
          {logo && (
            <Image
              className={styles.logo}
              src={logo}
              alt={`${company} logo`}
              width={200}
              height={200}
              quality={95}
              priority={false}
            />
          )}
        </div>

        {/* Content */}
        <div className={styles.content}>
          <div>
            <h3 className={styles.position}>{position}</h3>
            <p className={styles.company}>{company}</p>
            {type && <span className={styles.typeBadge}>{type}</span>}
          </div>

          {description && <p className={styles.description}>{description}</p>}

          {/* Metadata */}
          <div className={styles.meta}>
            {timeUntil && (
              <div className={styles.metaItem}>
                <FaClock className={styles.icon} />
                <span>
                  {timeUntil.time} {timeUntil.granularity}
                </span>
              </div>
            )}
            {location && (
              <div className={styles.metaItem}>
                <FaMapMarkerAlt className={styles.icon} />
                <span>{location}</span>
              </div>
            )}
            {pay && (
              <div className={styles.metaItem}>
                <FaDollarSign className={styles.icon} />
                <span>{pay}</span>
              </div>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className={styles.emailLink}
                onClick={(e) => e.stopPropagation()}
              >
                <FaEnvelope className={styles.icon} />
                <span>{email}</span>
              </a>
            )}
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div className={styles.tags}>
              {tags.map((tag: string) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Apply */}
        {notionApplyUrl && (
          <div className={styles.applyWrap}>
            <Link
              rel="noopener noreferrer"
              target="_blank"
              href={notionApplyUrl}
              className={styles.applyBtn}
              onClick={(e) => e.stopPropagation()}
            >
              <FaExternalLinkAlt className={styles.applyIcon} />
              <span>Apply</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
