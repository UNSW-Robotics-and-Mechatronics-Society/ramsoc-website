"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TeamError({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("Team page error:", error);
    router.replace("/team");
  }, [error, router]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-semibold text-primary-900">
        Team not found
      </h2>
      <p className="text-primary-700">Redirecting to the latest team...</p>
    </div>
  );
}
