"use client";

import Image from "next/image";

export function NoEvents() {
  return (
    <div className="border-primary-200/50 flex min-h-[400px] w-full flex-col items-center justify-center gap-6 rounded-2xl border bg-white p-12 shadow-sm">
      <div className="p-6">
        <Image
          src="/home/sleeping-logo.svg"
          alt="sleeping ramsoc logo"
          width={300}
          height={232}
          className="translate-x-[2.5%]"
        />
      </div>
      <div className="text-center">
        <h3 className="text-primary-900 mb-2 text-xl font-semibold">
          No Upcoming Events
        </h3>
        <p className="text-primary-600 max-w-sm text-sm leading-relaxed">
          We're planning something amazing! Check back soon.
        </p>
      </div>
    </div>
  );
}
