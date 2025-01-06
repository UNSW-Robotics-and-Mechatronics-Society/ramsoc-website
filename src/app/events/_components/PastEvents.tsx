"use client";
import useEvents from "@/hooks/useEvents";
import { getUnswTermAndYear } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import { Fragment, useEffect, useMemo } from "react";
import { groupBy } from "lodash-es";
import { MetaEvent } from "@/types/events";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export default function PastEvents() {
  const { allEvents, fetchNextPage, hasNextPage, isFetching } = useEvents();
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.5,
  });

  useEffect(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [isIntersecting]);

  const termGroupedPastEvents = useMemo<
    [string, MetaEvent[]][] | undefined
  >(() => {
    if (allEvents) {
      const eventsByTerm = groupBy(allEvents.pastEvents, (event) => {
        const termAndYear = getUnswTermAndYear(event.start_time);
        return `${termAndYear.year} Term ${termAndYear.term}`;
      });
      return Object.keys(eventsByTerm).map(
        (key) => [key, eventsByTerm[key]] as [string, MetaEvent[]],
      );
    }
  }, [allEvents?.pastEvents]);

  return (
    <>
      <div className="grid min-h-screen w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {termGroupedPastEvents &&
          termGroupedPastEvents.map(([term, events]) => {
            return (
              <Fragment key={term}>
                <h3 className="col-span-full mt-8 text-xl">{term}</h3>
                {events.map((data) => (
                  <div
                    className="flex w-full flex-col bg-primary-950"
                    key={data.id}
                  >
                    <div className="relative aspect-video w-full">
                      {data.cover && (
                        <>
                          <Image
                            width={512}
                            height={384}
                            className="absolute left-0 top-0 h-full w-full object-cover"
                            src={data.cover.source}
                            alt={data.name}
                            unoptimized
                          ></Image>
                          <Image
                            width={512}
                            height={384}
                            className="absolute h-full w-full object-contain backdrop-blur-3xl"
                            src={data.cover.source}
                            alt={data.name}
                            unoptimized
                          ></Image>
                        </>
                      )}
                    </div>
                    <div className="flex max-h-fit w-full flex-col overflow-hidden p-8 text-primary-50">
                      <h3 className="overflow-hidden text-ellipsis text-nowrap text-base font-semibold">
                        {data.name}
                      </h3>
                      <p className="mt-1 text-base font-semibold">
                        {format(
                          parseISO(data.start_time),
                          "hh:mm aa, dd/MM/yy",
                        )}
                      </p>
                      {data.place && (
                        <p className="overflow-hidden text-ellipsis text-nowrap text-base">
                          {data.place.name}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </Fragment>
            );
          })}
        <div ref={ref} className="h-px w-full"></div>
        <div className="col-span-full text-center">
          {hasNextPage ? "Loading" : "You have reached the end!"}
        </div>
      </div>
    </>
  );
}
