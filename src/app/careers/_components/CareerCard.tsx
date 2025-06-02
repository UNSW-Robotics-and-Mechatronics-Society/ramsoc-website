import { Button } from "@/components/ui/Button";
import { intervalToDuration } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

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
    const durationGranularity = ["years", "months", "days", "hours"] as const;

    const duration = intervalToDuration({
      start: Date.now(),
      end: new Date(deadline),
    });

    const index = durationGranularity.findIndex(
      (granularity) => !!duration[granularity],
    );
    if (index === -1 || (duration[durationGranularity[index]] as number) < 0) {
      return;
    }

    const timeTo = duration[durationGranularity[index]];
    const granularity = durationGranularity[index];

    return {
      granularity:
        timeTo === 1
          ? granularity.substring(0, granularity.length - 1)
          : granularity,
      time: timeTo,
    };
  }, [deadline]);

  return (
    <li
      key={id}
      className={`flex flex-col rounded-md outline transition-all ${
        isActive
          ? "outline-2 outline-primary-600"
          : "outline-1 outline-gray-200"
      }`}
      onClick={() => {
        onClick(id);
      }}
    >
      <section role="button" className="cursor-pointer p-4">
        <div className="mb-4 flex items-center gap-2">
          <div className="aspect-square w-12">
            <img className="h-full w-full object-cover" src={logoUrl}></img>
          </div>
          <div>{company}</div>
        </div>
        <h3 className="mb-2">{position}</h3>
        <div className="mb-2">
          <div className="text-sm text-primary-900/70">Applications Close</div>
          <div>
            {timeUntil?.time} {timeUntil?.granularity}
          </div>
        </div>
        <div className="mb-4">{email}</div>

        {ctaUrl && (
          <Button variant={"default"} size={"sm"} asChild>
            <Link href={ctaUrl} target="_blank">
              Apply Now
            </Link>
          </Button>
        )}
      </section>
    </li>
  );
}
