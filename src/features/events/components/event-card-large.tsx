import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getFacebookEventUrl } from "@/lib/constants/urls";
import type { Event } from "../hooks/useEvents";

interface EventCardProps {
  data: Event;
}

export default function EventCard({ data }: EventCardProps) {
  return (
    <div className="bg-primary-950 flex w-full flex-col sm:h-96 sm:flex-row">
      <div className="bg-primary-950 relative aspect-video h-full sm:aspect-3/4 md:aspect-4/4">
        {data.cover && (
          <>
            <Image
              width={512}
              height={384}
              className="absolute top-0 left-0 size-full object-cover"
              src={data.cover.source}
              alt={data.name}
              unoptimized
            />
            <Image
              width={512}
              height={384}
              className="absolute size-full object-contain backdrop-blur-3xl"
              src={data.cover.source}
              alt={data.name}
              unoptimized
            />
          </>
        )}
      </div>
      <div className="text-primary-50 flex max-h-fit w-full flex-col overflow-hidden p-8 sm:max-h-full">
        <h3 className="overflow-hidden text-nowrap text-ellipsis">
          {data.name}
        </h3>
        <p className="mt-1 text-xl font-semibold">
          {format(parseISO(data.start_time), "hh:mm aa, dd/MM/yy")}
        </p>
        {data.place && (
          <p className="overflow-hidden text-xl text-nowrap text-ellipsis">
            {data.place.name}
          </p>
        )}
        <p className="mt-4 line-clamp-5 overflow-hidden text-base text-ellipsis whitespace-pre-line">
          {data.description}
        </p>
        <Button asChild>
          <Link
            href={getFacebookEventUrl(data.id)}
            target="_blank"
            className="mt-4 w-fit sm:mt-auto"
          >
            Learn More
          </Link>
        </Button>
      </div>
    </div>
  );
}
