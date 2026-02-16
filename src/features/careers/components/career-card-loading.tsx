import { Skeleton } from "@/components/ui/skeleton";

export function CareerCardLoading() {
  return (
    <div className="border border-neutral-200 bg-white p-6 md:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        {/* Logo skeleton */}
        <Skeleton className="h-32 w-full shrink-0 md:size-40" />

        {/* Content skeleton */}
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}
