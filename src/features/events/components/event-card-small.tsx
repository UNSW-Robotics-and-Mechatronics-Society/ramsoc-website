import { getFacebookEventUrl } from "@/lib/constants/urls";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { HiCalendar, HiMapPin } from "react-icons/hi2";
import type { Event } from "../types";

interface EventCardSmallProps {
  data: Event;
}

export default function EventCardSmall({ data }: EventCardSmallProps) {
  return (
    <Link
      className="group border-primary-200/50 block overflow-hidden rounded-xl border bg-white shadow-md transition-all duration-300 hover:shadow-xl"
      href={getFacebookEventUrl(data.id)}
      target="_blank"
    >
      {/* Event Image */}
      <div className="bg-primary-100 relative aspect-video w-full overflow-hidden">
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
            <div className="from-primary-950/40 absolute inset-0 bg-linear-to-t to-transparent" />
          </>
        ) : (
          <div className="bg-primary-100 flex size-full items-center justify-center">
            <HiCalendar className="text-primary-300 size-16" />
          </div>
        )}
      </div>

      {/* Event Content */}
      <div className="flex flex-col gap-2 p-4">
        <h3 className="text-primary-900 line-clamp-2 text-base font-semibold">
          {data.name}
        </h3>

        {/* Date and Location */}
        <div className="space-y-1">
          <div className="text-primary-600 flex items-center gap-1.5 text-xs">
            <HiCalendar className="size-3.5 shrink-0" />
            <span className="font-medium">
              {format(parseISO(data.start_time), "dd MMM yyyy")}
            </span>
          </div>
          {data.place && (
            <div className="text-primary-600 flex items-center gap-1.5 text-xs">
              <HiMapPin className="size-3.5 shrink-0" />
              <span className="line-clamp-1">{data.place.name}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
