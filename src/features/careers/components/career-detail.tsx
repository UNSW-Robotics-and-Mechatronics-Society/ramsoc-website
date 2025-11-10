"use client";
import "katex/dist/katex.min.css";
import "prismjs/themes/prism-tomorrow.css";
import "react-notion-x/src/styles.css";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import {
  FaDollarSign,
  FaEnvelope,
  FaExternalLinkAlt,
  FaMapMarkerAlt,
  FaTimes,
} from "react-icons/fa";
import { NotionRenderer } from "react-notion-x";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getNotionPageUrl } from "@/lib/constants/urls";
import { api } from "@/trpc/react";
import { normalizeCareerCtaUrlStrict } from "../utils/career-url";

import type { Career } from "../types";
import { PostLoading } from "./post-loading";

interface CareerDetailsProps {
  activeId: string;
  careerMeta?: Career;
  onBack: () => void;
}

export function CareerDetails({
  activeId,
  careerMeta,
  onBack,
}: CareerDetailsProps) {
  // Disable body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onBack();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onBack]);

  const { data, isLoading, error } = api.careers.getById.useQuery(
    { id: activeId },
    {
      staleTime: 60 * 60 * 1000,
      enabled: !!activeId,
      retry: (failureCount, error: any) => {
        // Don't retry on 404
        if (error?.data?.code === "NOT_FOUND") return false;
        return failureCount < 3;
      },
    },
  );

  const normalizedCtaUrl = normalizeCareerCtaUrlStrict(careerMeta?.ctaUrl);

  // Generate Notion database URL with filter for this specific job
  const notionApplyUrl = normalizedCtaUrl
    ? normalizedCtaUrl
    : activeId
      ? getNotionPageUrl(activeId)
      : null;

  // Handle backdrop click
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onBack();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/10 p-4"
      onClick={handleBackdropClick}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          onBack();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Close modal"
    >
      <div className="relative flex size-full max-h-[90vh] max-w-4xl flex-col overflow-hidden rounded-lg bg-white shadow-xl">
        {/* Header with career metadata and close button */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="mb-4 flex items-start gap-4">
                {careerMeta?.logo && (
                  <div className="flex size-16 flex-none items-center justify-center overflow-hidden rounded-lg bg-white p-2">
                    <Image
                      className="size-full object-contain"
                      src={careerMeta.logo}
                      alt={`${careerMeta.company} logo`}
                      width={64}
                      height={64}
                      quality={95}
                    />
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-semibold">
                    {careerMeta?.position || "Career Details"}
                  </h2>
                  <p className="text-primary-900/90 text-lg font-medium">
                    {careerMeta?.company}
                  </p>
                </div>
              </div>

              {/* Career metadata */}
              <div className="text-primary-900/90 mb-3 flex flex-wrap items-center gap-4 text-sm">
                {careerMeta?.location && (
                  <div className="flex items-center gap-1">
                    <FaMapMarkerAlt className="size-4" />
                    {careerMeta.location}
                  </div>
                )}
                {careerMeta?.pay && (
                  <div className="flex items-center gap-1">
                    <FaDollarSign className="size-4" />
                    {careerMeta.pay}
                  </div>
                )}
                {careerMeta?.email && (
                  <div className="flex items-center gap-1">
                    <FaEnvelope className="size-4" />
                    {careerMeta.email}
                  </div>
                )}
              </div>

              {/* Tags and Type */}
              <div className="flex flex-wrap gap-2">
                {careerMeta?.type && (
                  <Badge variant="secondary">{careerMeta.type}</Badge>
                )}
                {careerMeta?.tags?.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Quick Apply Button */}
              {notionApplyUrl && (
                <div className="mt-4">
                  <Button
                    asChild
                    size="sm"
                    className="bg-primary-600 rounded-lg text-white"
                  >
                    <Link
                      href={notionApplyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <FaExternalLinkAlt className="size-3" />
                      <span>Apply</span>
                    </Link>
                  </Button>
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="ml-4 size-8 p-0"
            >
              <FaTimes className="size-4" />
            </Button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading && <PostLoading />}

          {error && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <h3 className="mb-2 text-lg font-medium text-gray-900">
                Content Not Available
              </h3>
              <p className="mb-4 text-gray-600">
                {error?.data?.code === "NOT_FOUND"
                  ? "The detailed information for this position is not available."
                  : "Failed to load career details. Please try again later."}
              </p>
              {notionApplyUrl && (
                <Button
                  asChild
                  className="rounded-full bg-black text-white hover:bg-gray-800"
                >
                  <Link
                    href={notionApplyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <FaExternalLinkAlt className="size-3.5" />
                    <span>Apply Directly</span>
                  </Link>
                </Button>
              )}
            </div>
          )}

          {data && (
            <NotionRenderer
              recordMap={data}
              className="m-0! p-0!"
              components={{
                nextImage: Image,
                nextLink: Link,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
