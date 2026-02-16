import { Skeleton } from "@/components/ui/skeleton";

export function CareerCardLoading() {
  return (
    <div className="border border-white/10 bg-white/3 p-6 md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        {/* Logo skeleton */}
        <Skeleton className="h-28 w-full shrink-0 bg-white/5 md:size-32" />

        {/* Content skeleton */}
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-3/4 bg-white/5" />
            <Skeleton className="h-3 w-1/4 bg-white/5" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full bg-white/5" />
            <Skeleton className="h-4 w-4/5 bg-white/5" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-3 w-24 bg-white/5" />
            <Skeleton className="h-3 w-20 bg-white/5" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-5 w-16 bg-white/5" />
            <Skeleton className="h-5 w-14 bg-white/5" />
            <Skeleton className="h-5 w-20 bg-white/5" />
          </div>
        </div>
      </div>
    </div>
  );
}
