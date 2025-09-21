import { intervalToDuration } from "date-fns";
import { BriefcaseBusiness } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface Props {
  id: string;
  company: string;
  ctaUrl?: string;
  deadline: string;
  email: string;
  isActive: boolean;
  logoUrl: string;
  position: string;
  onClick: (id: string) => void;
}

export function CareerCard({
  id,
  company,
  ctaUrl,
  deadline,
  email,
  logoUrl,
  isActive = false,
  position,
  onClick,
}: Props) {
  const timeUntil = useMemo(() => {
    if (!deadline || deadline.trim() === "") {
      return { time: "TBD", granularity: "", expired: false };
    }

    const durationGranularity = ["years", "months", "days", "hours"] as const;
    const deadlineDate = new Date(deadline);

    if (isNaN(deadlineDate.getTime())) {
      console.warn(`Invalid date string for job id ${id}: ${deadline}`);
      return { time: "null", granularity: "", expired: false };
    }

    const duration = intervalToDuration({
      start: Date.now(),
      end: deadlineDate,
    });

    const index = durationGranularity.findIndex(
      (granularity) => !!duration[granularity],
    );

    if (index === -1 || (duration[durationGranularity[index]] as number) < 0) {
      return { expired: true };
    }

    const timeTo = duration[durationGranularity[index]];
    const granularity = durationGranularity[index];

    return {
      granularity:
        timeTo === 1
          ? granularity.substring(0, granularity.length - 1)
          : granularity,
      time: timeTo,
      expired: false,
    };
  }, [deadline, id]);

  return (
    <div
      key={id}
      role="button"
      tabIndex={0}
      className={cn(
        `flex cursor-pointer flex-col rounded-md p-4 outline transition-all ${
          isActive
            ? "outline-2 outline-primary-600"
            : "outline-1 outline-gray-200"
        }`,
      )}
      onClick={() => {
        onClick(id);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick(id);
        }
      }}
    >
      <div className="mb-4 flex items-center gap-2">
        <div className="flex aspect-square w-12 items-center justify-center overflow-hidden">
          {logoUrl ? (
            <img
              className="size-full object-cover"
              src={logoUrl}
              alt={company}
            />
          ) : (
            <BriefcaseBusiness className="size-6 text-gray-500" />
          )}
        </div>
        <div>{company}</div>
      </div>
      <h3 className="mb-2">{position}</h3>
      <div className="mb-2">
        {!timeUntil?.expired ? (
          <>
            <div className="text-sm text-primary-900/70">
              Applications Close{" "}
              <span className="font-medium">
                {timeUntil?.time} {timeUntil?.granularity}
              </span>
            </div>
          </>
        ) : (
          <div className="text-sm text-red-500">Application Closed</div>
        )}
      </div>
      <div className="mb-4">{email}</div>

      {ctaUrl && (
        <Button variant={"default"} size={"sm"} asChild>
          <Link href={ctaUrl} target="_blank">
            Apply Now
          </Link>
        </Button>
      )}
    </div>
  );
}
