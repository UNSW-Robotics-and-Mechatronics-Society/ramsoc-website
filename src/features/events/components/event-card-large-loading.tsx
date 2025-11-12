import { Skeleton } from "@/components/ui/skeleton";

export function EventCardLoading() {
  return (
    <div className="grid w-full gap-8 md:grid-cols-2">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="border-primary-200/50 overflow-hidden rounded-2xl border bg-white shadow-lg"
        >
          {/* Image skeleton */}
          <Skeleton className="aspect-video w-full" />

          {/* Content skeleton */}
          <div className="flex flex-col gap-4 p-6">
            {/* Title */}
            <Skeleton className="h-7 w-3/4" />

            {/* Date and location */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>

            {/* Description lines */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>

            {/* Button */}
            <Skeleton className="mt-2 h-10 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
