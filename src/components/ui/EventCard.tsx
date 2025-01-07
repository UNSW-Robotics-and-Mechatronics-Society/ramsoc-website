import { format, parseISO } from "date-fns";
import Image from "next/image";
import * as React from "react";

import { MetaEvent } from "@/types/events";

import { Button } from "./Button";
import { Skeleton } from "./Skeleton";

interface EventCardProps {
  data: MetaEvent;
}

export function EventCardLoading() {
  return (
    <div className="flex w-full flex-col bg-primary-950 sm:h-96 sm:flex-row">
      <div className="relative aspect-video h-full sm:aspect-[3/4] md:aspect-[4/4]">
        <Skeleton className="size-full" />
      </div>
      <div className="flex max-h-fit w-full flex-col gap-2 overflow-hidden p-8 text-primary-50 sm:max-h-full">
        <Skeleton className="h-8 w-8/12" />
        <Skeleton className="h-7 w-4/12" />
        <Skeleton className="h-7 w-5/12" />
        <div>
          <Skeleton className="mt-2 h-4 w-11/12" />
          <Skeleton className="mt-2 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-10/12" />
          <Skeleton className="mt-2 h-4 w-11/12" />
        </div>
      </div>
    </div>
  );
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
        <h3 className="overflow-hidden text-ellipsis text-nowrap text-2xl font-semibold">
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
        <Button className="mt-4 w-fit sm:mt-auto">Learn More</Button>
      </div>
    </div>
  );
}
