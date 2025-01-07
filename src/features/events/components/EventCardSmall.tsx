import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";

import { MetaEvent } from "@/types/events";

interface EventCardSmallProps {
  data: MetaEvent;
}

export default function EventCardSmall({ data }: EventCardSmallProps) {
  return (
    <Link
      className="group flex w-full flex-col bg-primary-950"
      href={`https://www.facebook.com/events/${data.id}`}
      target="_blank"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        {data.cover && (
          <>
            <Image
              width={512}
              height={384}
              className="absolute left-0 top-0 size-full scale-100 object-cover transition group-hover:scale-105"
              src={data.cover.source}
              alt={data.name}
              unoptimized
            ></Image>
            <Image
              width={512}
              height={384}
              className="absolute size-full scale-100 object-contain backdrop-blur-3xl transition group-hover:scale-105"
              src={data.cover.source}
              alt={data.name}
              unoptimized
            ></Image>
          </>
        )}
      </div>
      <div className="flex max-h-fit w-full flex-col overflow-hidden px-4 py-6 text-primary-50">
        <h3 className="overflow-hidden text-ellipsis text-nowrap font-semibold">
          {data.name}
        </h3>
        <p className="text-base font-semibold text-primary-500/90">
          {format(parseISO(data.start_time), "dd/MM/yy")}
        </p>
        <p className="overflow-hidden text-ellipsis text-nowrap text-base text-primary-500/90">
          {data.place?.name ?? "-"}
        </p>
      </div>
    </Link>
  );
}
