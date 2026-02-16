import Image from "next/image";
import Link from "next/link";
import { HiArrowRight, HiCalendar, HiMapPin } from "react-icons/hi2";
import type { Event } from "../types";

interface EventCardSmallProps {
  data: Event;
}

export default function EventCardSmall({ data }: EventCardSmallProps) {
  const eventUrl = data.url ?? "#";

  return (
    <Link
      className="group flex gap-5 border-b border-neutral-100 py-5 transition-colors hover:border-primary-500/30"
      href={eventUrl}
      target="_blank"
    >
      {/* Small square thumbnail */}
      <div className="relative size-20 shrink-0 overflow-hidden bg-neutral-100 md:size-24">
        {data.cover ? (
          <Image
            src={data.cover.source}
            alt={data.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="96px"
            unoptimized
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <HiCalendar className="size-8 text-neutral-300" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        {data.start_time && (
          <span className="mb-1 text-[0.65rem] font-semibold tracking-[0.2em] text-primary-500/70 uppercase">
            {data.start_time}
          </span>
        )}
        <h4 className="line-clamp-2 text-sm font-bold leading-snug text-primary-950 transition-colors group-hover:text-primary-500 md:text-base">
          {data.name}
        </h4>
        {data.place && (
          <span className="mt-1 line-clamp-1 flex items-center gap-1.5 text-xs text-neutral-400">
            <HiMapPin className="size-3 shrink-0" />
            {data.place.name}
          </span>
        )}
      </div>

      {/* Arrow */}
      <div className="flex shrink-0 items-center">
        <HiArrowRight className="size-4 text-neutral-300 transition-all group-hover:translate-x-1 group-hover:text-primary-500" />
      </div>
    </Link>
  );
}
