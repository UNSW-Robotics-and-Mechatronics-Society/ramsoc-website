import { Skeleton } from "@/components/ui/skeleton";

export function EventCardLoading() {
  return (
    <div className="bg-primary-950 flex w-full flex-col sm:h-96 sm:flex-row">
      <div className="relative aspect-video h-full sm:aspect-3/4 md:aspect-4/4">
        <Skeleton className="size-full" />
      </div>
      <div className="text-primary-50 flex max-h-fit w-full flex-col gap-2 overflow-hidden p-8 sm:max-h-full">
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
