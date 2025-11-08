import { getFacebookEventUrl } from "@/lib/constants/urls";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import type { Event } from "../hooks/useEvents";

interface EventCardSmallProps {
  data: Event;
}

export default function EventCardSmall({ data }: EventCardSmallProps) {
  return (
    <Link
      className="group bg-primary-950 flex w-full flex-col"
      href={getFacebookEventUrl(data.id)}
      target="_blank"
    >
      <div className="relative aspect-video w-full overflow-hidden">
        {data.cover && (
          <>
            <Image
              width={512}
              height={384}
              className="absolute top-0 left-0 size-full scale-100 object-cover transition group-hover:scale-105"
              src={data.cover.source}
              alt={data.name}
              unoptimized
            />
            <Image
              width={512}
              height={384}
              className="absolute size-full scale-100 object-contain backdrop-blur-3xl transition group-hover:scale-105"
              src={data.cover.source}
              alt={data.name}
              unoptimized
            />
          </>
        )}
      </div>
      <div className="text-primary-50 flex max-h-fit w-full flex-col overflow-hidden px-4 py-6">
        <h3 className="overflow-hidden font-semibold text-nowrap text-ellipsis">
          {data.name}
        </h3>
        <p className="text-primary-500/90 text-base font-semibold">
          {format(parseISO(data.start_time), "dd/MM/yy")}
        </p>
        <p className="text-primary-500/90 overflow-hidden text-base text-nowrap text-ellipsis">
          {data.place?.name ?? "-"}
        </p>
      </div>
    </Link>
  );
}
