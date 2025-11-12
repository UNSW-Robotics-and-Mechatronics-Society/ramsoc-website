import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { HiCalendar, HiMapPin } from "react-icons/hi2";

import { Button } from "@/components/ui/button";
import { getFacebookEventUrl } from "@/lib/constants/urls";
import type { Event } from "../types";

interface EventCardProps {
  data: Event;
}

export default function EventCard({ data }: EventCardProps) {
  return (
    <div className="group border-primary-200/50 flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-lg transition-all duration-300 hover:shadow-xl">
      <div className="bg-primary-100 relative aspect-video overflow-hidden">
        {data.cover ? (
          <>
            <Image
              width={512}
              height={384}
              className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
              src={data.cover.source}
              alt={data.name}
              unoptimized
            />
            <div className="from-primary-950/60 absolute inset-0 bg-linear-to-t to-transparent" />
          </>
        ) : (
          <div className="bg-primary-100 flex size-full items-center justify-center">
            <HiCalendar className="text-primary-300 size-24" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-primary-900 mb-3 line-clamp-2 text-xl font-semibold">
          {data.name}
        </h3>

        <div className="mb-4 space-y-2">
          <div className="text-primary-600 flex items-center gap-2 text-sm">
            <HiCalendar className="size-4 shrink-0" />
            <span className="font-medium">
              {format(parseISO(data.start_time), "hh:mm aa, dd MMM yyyy")}
            </span>
          </div>
          {data.place && (
            <div className="text-primary-600 flex items-center gap-2 text-sm">
              <HiMapPin className="size-4 shrink-0" />
              <span className="line-clamp-1">{data.place.name}</span>
            </div>
          )}
        </div>

        <p className="text-primary-700 mb-6 line-clamp-3 text-sm leading-relaxed">
          {data.description}
        </p>

        <Button asChild className="mt-auto w-full" size="sm">
          <Link href={getFacebookEventUrl(data.id)} target="_blank">
            Learn More
          </Link>
        </Button>
      </div>
    </div>
  );
}
