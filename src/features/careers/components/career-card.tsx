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

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { env } from "@/env";
import { getNotionPageUrl } from "@/lib/constants/urls";
import { normalizeCareerCtaUrlStrict } from "../utils/career-url";

import type { Career } from "../hooks/useCareers";
import styles from "./career-card.module.scss";

interface Props extends Career {
  id: string;
  onClick: (id: string) => void;
}

export function CareerCard({
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
  onClick,
}: Props) {
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

  // Generate Notion database URL with filter for this specific job
  const notionApplyUrl = useMemo(() => {
    if (normalizedctaUrl) {
      return normalizedctaUrl;
    }

    // Fallback to filtered Notion database view if no external URL
    const dbId = env.NEXT_PUBLIC_NOTION_CAREERS_DB_SOURCE_ID;
    if (!dbId || !position) {
      return null;
    }

    // Create a Notion URL with a filter for this position
    // Format: https://notion.so/{dbId}?v={viewId}&p={pageId}
    // For simplicity, we'll link to the page directly
    return getNotionPageUrl(id);
  }, [normalizedctaUrl, id, position]);

  return (
    <Card
      className={styles.careerCard}
      onClick={hasDetails ? () => onClick(id) : undefined}
      style={{ cursor: hasDetails ? "pointer" : "default" }}
    >
      <CardContent className={styles.cardContent}>
        {/* Logo Section - Left Side */}
        <div className={styles.logoContainer}>
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

        {/* Content Section - Center */}
        <div className={styles.contentSection}>
          {/* Header */}
          <div className={styles.header}>
            <h3 className={styles.position}>{position}</h3>
            <p className={styles.company}>{company}</p>
            {type && (
              <Badge variant="secondary" className={styles.typeBadge}>
                {type}
              </Badge>
            )}
          </div>

          {/* Description */}
          {description && <p className={styles.description}>{description}</p>}

          {/* Metadata */}
          <div className={styles.metadata}>
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
              {tags.map((tag) => (
                <Badge key={tag} variant="outline" className={styles.tag}>
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Quick Apply Button */}
        {notionApplyUrl && (
          <div className={styles.applySection}>
            <Button
              asChild
              className={styles.applyButton}
              onClick={(e) => e.stopPropagation()}
            >
              <Link
                rel="noopener noreferrer"
                target="_blank"
                href={notionApplyUrl}
              >
                <FaExternalLinkAlt className={styles.applyIcon} />
                <span>Apply</span>
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
