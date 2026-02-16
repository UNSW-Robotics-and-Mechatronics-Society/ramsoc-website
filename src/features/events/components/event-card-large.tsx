import Image from "next/image";
import Link from "next/link";
import { HiArrowRight, HiCalendar, HiMapPin } from "react-icons/hi2";

import type { Event } from "../types";

interface EventCardProps {
  data: Event;
}

export default function EventCard({ data }: EventCardProps) {
  const eventUrl = data.url ?? "#";

  return (
    <Link
      href={eventUrl}
      target="_blank"
      className="group relative block h-full overflow-hidden"
    >
      {/* Image fills card */}
      <div className="relative aspect-video w-full overflow-hidden bg-neutral-100">
        {data.cover ? (
          <Image
            src={data.cover.source}
            alt={data.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-neutral-100">
            <HiCalendar className="size-16 text-neutral-300" />
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-primary-950 via-primary-950/50 to-transparent" />
      </div>

      {/* Content overlaid at bottom */}
      <div className="absolute inset-x-0 bottom-0 p-5">
        {data.start_time && (
          <span className="mb-2 block text-[0.65rem] font-semibold tracking-[0.2em] text-white/50 uppercase">
            {data.start_time}
          </span>
        )}

        <h3 className="mb-1 line-clamp-2 text-lg font-bold text-white md:text-xl">
          {data.name}
        </h3>

        {data.place && (
          <div className="flex items-center gap-1.5 text-xs text-white/40">
            <HiMapPin className="size-3 shrink-0" />
            <span className="line-clamp-1">{data.place.name}</span>
          </div>
        )}

        {/* Hover arrow */}
        <div className="mt-3 flex items-center gap-2 text-xs font-bold tracking-[0.15em] text-primary-400 uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span>View</span>
          <HiArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
