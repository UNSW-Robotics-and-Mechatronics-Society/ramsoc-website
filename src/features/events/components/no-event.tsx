"use client";

import Image from "next/image";

export function NoEvents() {
  return (
    <div className="flex min-h-[300px] w-full flex-col items-center justify-center border border-neutral-200 px-8 py-16 text-center">
      <div className="mb-6 p-4">
        <Image
          src="/home/sleeping-logo.svg"
          alt="sleeping ramsoc logo"
          width={200}
          height={155}
          className="translate-x-[2.5%]"
        />
      </div>
      <p className="text-sm font-bold tracking-[0.3em] text-neutral-300 uppercase">
        No Upcoming Events
      </p>
      <p className="mt-2 max-w-sm text-xs tracking-wider text-neutral-400">
        We&apos;re planning something amazing — check back soon.
      </p>
    </div>
  );
}
