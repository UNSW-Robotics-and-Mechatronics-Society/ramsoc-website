export function EventCardLoading() {
  return (
    <div>
      {/* Featured skeleton */}
      <div className="aspect-16/10 w-full animate-pulse bg-neutral-100 md:aspect-[21/9]" />

      {/* Grid skeletons */}
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="overflow-hidden">
            <div className="aspect-video w-full animate-pulse bg-neutral-100" />
          </div>
        ))}
      </div>
    </div>
  );
}
