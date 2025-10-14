import { Skeleton } from "@/components/ui/Skeleton";

export function PostLoading() {
  return (
    <div className="mt-12 flex max-h-fit w-full flex-col gap-8 opacity-20">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-7/12" />
        <Skeleton className="h-6 w-3/12" />
        <Skeleton className="h-6 w-6/12" />
        <Skeleton className="h-6 w-10/12" />
        <Skeleton className="h-6 w-9/12" />
      </div>

      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-6/12" />
        <Skeleton className="h-6 w-5/12" />
        <Skeleton className="h-6 w-4/12" />
        <Skeleton className="h-6 w-7/12" />
      </div>

      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-8/12" />
        <Skeleton className="h-6 w-3/12" />
        <Skeleton className="h-6 w-5/12" />
        <Skeleton className="h-6 w-11/12" />
      </div>

      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-7/12" />
        <Skeleton className="h-6 w-4/12" />
        <Skeleton className="h-6 w-6/12" />
        <Skeleton className="h-6 w-8/12" />
        <Skeleton className="h-6 w-5/12" />
      </div>

      <div className="flex flex-col gap-2">
        <Skeleton className="h-6 w-9/12" />
        <Skeleton className="h-6 w-2/12" />
        <Skeleton className="h-6 w-4/12" />
        <Skeleton className="h-6 w-7/12" />
        <Skeleton className="h-6 w-11/12" />
        <Skeleton className="h-6 w-5/12" />
      </div>
    </div>
  );
}
