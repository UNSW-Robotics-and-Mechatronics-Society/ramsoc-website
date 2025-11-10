import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CareerCardLoading() {
  return (
    <Card className="cursor-pointer bg-stone-100/50 transition-shadow hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1">
            <div className="mb-8 flex items-start gap-4">
              <div className="aspect-square w-16 flex-none">
                <Skeleton className="size-full opacity-70"></Skeleton>
              </div>
              <div className="flex w-full flex-col gap-2">
                <Skeleton className="h-6 w-9/12 opacity-70" />
                <Skeleton className="h-6 w-2/12 opacity-70" />
                <Skeleton className="h-4 w-4/12 opacity-70" />
              </div>
            </div>

            <div className="mb-8 flex flex-col gap-2">
              <Skeleton className="h-4 w-9/12 opacity-70" />
              <Skeleton className="h-4 w-2/12 opacity-70" />
              <Skeleton className="h-4 w-4/12 opacity-70" />
              <Skeleton className="h-4 w-5/12 opacity-70" />
            </div>

            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-28 opacity-70" />
              <Skeleton className="h-6 w-16 opacity-70" />
              <Skeleton className="h-6 w-12 opacity-70" />
              <Skeleton className="h-6 w-24 opacity-70" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
