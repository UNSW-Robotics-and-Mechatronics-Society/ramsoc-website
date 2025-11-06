import { intervalToDuration } from "date-fns";
import { Clock, DollarSign, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { normalizeCareerCtaUrlStrict } from "@/lib/utils";
import { CareerMetaData } from "@/types/careers";

interface Props extends CareerMetaData {
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

  const normalizedctaUrl = normalizeCareerCtaUrlStrict(ctaUrl);

  return (
    <Card
      className="cursor-pointer bg-stone-100/50 transition-shadow hover:shadow-md"
      onClick={() => onClick(id)}
    >
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1 space-y-3">
            <div className="flex items-start gap-4">
              <div className="aspect-square w-16 flex-none overflow-hidden rounded-lg">
                {logo && (
                  <Image
                    className="size-full object-cover"
                    src={logo}
                    alt={`${company} logo`}
                    width={100}
                    height={100}
                  />
                )}
              </div>
              <div className="w-full overflow-hidden wrap-break-word">
                <h3 className="text-2xl font-semibold">{position}</h3>
                <p className="font-medium text-primary-900/90">{company}</p>
                {email && (
                  <div className="mt-1 flex w-full items-center gap-1">
                    <Mail className="size-3 text-primary-900/90" />
                    <span className="w-full text-base text-primary-900/90">
                      {email}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-base text-primary-900/90">
              {timeUntil && (
                <div className="flex items-center gap-1">
                  <Clock className="size-4" />
                  Closes in {timeUntil.time} {timeUntil.granularity}
                </div>
              )}
              {location && (
                <div className="flex items-center gap-1">
                  <MapPin className="size-4" />
                  {location}
                </div>
              )}
              {pay && (
                <div className="flex items-center gap-1">
                  <DollarSign className="size-4" />
                  {pay}
                </div>
              )}
            </div>

            <p className="line-clamp-4 leading-relaxed">{description}</p>

            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{type}</Badge>
              {tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:w-48">
            {normalizedctaUrl && (
              <Button asChild className="flex-1 sm:w-full">
                <Link
                  rel="noopener noreferrer"
                  target="_blank"
                  href={normalizedctaUrl}
                >
                  Quick Apply
                </Link>
              </Button>
            )}
            {hasDetails && (
              <Button
                variant="outline"
                className="flex-1 bg-transparent sm:w-full"
                onClick={() => onClick(id)}
              >
                View Details
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
