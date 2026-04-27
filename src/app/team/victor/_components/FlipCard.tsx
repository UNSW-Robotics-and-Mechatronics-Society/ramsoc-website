"use client";

import Image from "next/image";
import { useState } from "react";

type FlipCardProps = {
  title: string;
  src: string;
  alt: string;
  description: string;
};

export default function FlipCard({
  title,
  src,
  alt,
  description,
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setIsFlipped((current) => !current)}
      className="group block w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2"
      aria-pressed={isFlipped}
      aria-label={`Flip ${title} card`}
    >
      <div
        className="relative aspect-[4/3] w-full rounded-xl"
        style={{ perspective: "1200px" }}
      >
        <div
          className="relative h-full w-full rounded-xl transition-transform duration-700"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateX(180deg)" : "rotateX(0deg)",
          }}
        >
          <div
            className="absolute inset-0 overflow-hidden rounded-xl bg-neutral-300 shadow-md"
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(min-width: 768px) 30vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
              <p className="text-sm font-semibold tracking-wide uppercase">
                Tap to flip
              </p>
            </div>
          </div>

          <div
            className="text-primary-950 absolute inset-0 flex h-full flex-col justify-center rounded-xl border border-sky-200 bg-[#dff4ff] p-5 shadow-md"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateX(180deg)",
            }}
          >
            <p className="text-primary-600 text-xs font-black tracking-[0.2em] uppercase">
              {title}
            </p>
            <p className="mt-3 text-sm leading-relaxed font-semibold md:text-base">
              {description}
            </p>
            <p className="text-primary-600 mt-4 text-xs font-bold uppercase">
              Click to flip back
            </p>
          </div>
        </div>
      </div>
    </button>
  );
}
