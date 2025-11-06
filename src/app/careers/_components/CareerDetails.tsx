"use client";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { X, MapPin, DollarSign, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ExtendedRecordMap } from "notion-types";
import { useEffect } from "react";
import { NotionRenderer } from "react-notion-x";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { normalizeCareerCtaUrlStrict } from "@/lib/utils";
import { CareerMetaData } from "@/types/careers";

import { PostLoading } from "./PostLoading";

interface CareerDetailsProps {
  activeId: string;
  careerMeta?: CareerMetaData;
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

  const queryPage = useQuery({
    queryKey: ["notion", "page", activeId],
    queryFn: async () => {
      if (!activeId) throw new Error("No activeId set");
      const res = await axios.get<ExtendedRecordMap>(
        `/api/notion/page/${activeId}`,
      );
      return res.data;
    },
    staleTime: 60 * 60 * 1000,
    enabled: !!activeId,
    retry: (failureCount, error: any) => {
      // Don't retry on 404
      if (error?.response?.status === 404) return false;
      return failureCount < 3;
    },
  });

  const { data, isLoading, error } = queryPage;

  const normalizedCtaUrl = normalizeCareerCtaUrlStrict(careerMeta?.ctaUrl);

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
                  <div className="aspect-square w-12 flex-none overflow-hidden rounded-lg bg-stone-200">
                    <Image
                      className="size-full object-cover"
                      src={careerMeta.logo}
                      alt={`${careerMeta.company} logo`}
                      width={48}
                      height={48}
                    />
                  </div>
                )}
                <div>
                  <h2 className="text-2xl font-semibold">
                    {careerMeta?.position || "Career Details"}
                  </h2>
                  <p className="text-lg font-medium text-primary-900/90">
                    {careerMeta?.company}
                  </p>
                </div>
              </div>

              {/* Career metadata */}
              <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-primary-900/90">
                {careerMeta?.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="size-4" />
                    {careerMeta.location}
                  </div>
                )}
                {careerMeta?.pay && (
                  <div className="flex items-center gap-1">
                    <DollarSign className="size-4" />
                    {careerMeta.pay}
                  </div>
                )}
                {careerMeta?.email && (
                  <div className="flex items-center gap-1">
                    <Mail className="size-4" />
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
              {normalizedCtaUrl && (
                <div className="mt-4">
                  <Button asChild size="sm">
                    <Link
                      href={normalizedCtaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Quick Apply
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
              <X className="size-4" />
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
                {error?.response?.status === 404
                  ? "The detailed information for this position is not available."
                  : "Failed to load career details. Please try again later."}
              </p>
              {normalizedCtaUrl && (
                <Button asChild>
                  <Link
                    href={normalizedCtaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Apply Directly
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
