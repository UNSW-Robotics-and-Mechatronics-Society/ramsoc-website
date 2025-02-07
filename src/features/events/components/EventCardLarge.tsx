import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { Button } from "@/components/ui/Button";
import { MetaEvent } from "@/types/events";

interface EventCardProps {
  data: MetaEvent;
}

export default function EventCard({ data }: EventCardProps) {
  return (
    <div className="flex w-full flex-col bg-primary-950 sm:h-96 sm:flex-row">
      <div className="relative aspect-video h-full bg-primary-950 sm:aspect-[3/4] md:aspect-[4/4]">
        {data.cover && (
          <>
            <Image
              width={512}
              height={384}
              className="absolute left-0 top-0 size-full object-cover"
              src={data.cover.source}
              alt={data.name}
              unoptimized
            ></Image>
            <Image
              width={512}
              height={384}
              className="absolute size-full object-contain backdrop-blur-3xl"
              src={data.cover.source}
              alt={data.name}
              unoptimized
            ></Image>
          </>
        )}
      </div>
      <div className="flex max-h-fit w-full flex-col overflow-hidden p-8 text-primary-50 sm:max-h-full">
        <h3 className="overflow-hidden text-ellipsis text-nowrap">
          {data.name}
        </h3>
        <p className="mt-1 text-xl font-semibold">
          {format(parseISO(data.start_time), "hh:mm aa, dd/MM/yy")}
        </p>
        {data.place && (
          <p className="overflow-hidden text-ellipsis text-nowrap text-xl">
            {data.place.name}
          </p>
        )}
        <p className="mt-4 line-clamp-5 overflow-hidden text-ellipsis whitespace-pre-line text-base">
          {data.description}
        </p>
        <Button asChild>
          <Link
            href={`https://www.facebook.com/events/${data.id}`}
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
