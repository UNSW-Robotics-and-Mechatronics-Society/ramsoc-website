"use client";

import Image from "next/image";
import { useCallback, useMemo, useRef, useState } from "react";

import Carousel from "@/components/Carousel";

function SlideImage({
  src,
  alt,
  onFlip,
}: {
  src: string;
  alt: string;
  onFlip: () => void;
}) {
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    pointerStartRef.current = { x: event.clientX, y: event.clientY };
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointerStartRef.current) return;

    const deltaX = Math.abs(event.clientX - pointerStartRef.current.x);
    const deltaY = Math.abs(event.clientY - pointerStartRef.current.y);
    pointerStartRef.current = null;

    if (deltaX < 8 && deltaY < 8) {
      onFlip();
    }
  };

  return (
    <div
      className="relative flex h-full w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-slate-100 outline-none"
      role="button"
      tabIndex={0}
      aria-label={`Flip card for ${alt}`}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onFlip();
        }
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="400px"
        className="object-contain p-2"
      />
    </div>
  );
}

export default function UserInteractiveAppCarousel() {
  const [isFlipped, setIsFlipped] = useState(false);
  const flipCard = useCallback(() => {
    setIsFlipped((current) => !current);
  }, []);
  const items = useMemo(
    () => [
      {
        id: 1,
        content: (
          <SlideImage
            src="/team/victor/Web_controller_movement.png"
            alt="Web controller movement view"
            onFlip={flipCard}
          />
        ),
      },
      {
        id: 2,
        content: (
          <SlideImage
            src="/team/victor/web_controller_camera.png"
            alt="Web controller camera view"
            onFlip={flipCard}
          />
        ),
      },
      {
        id: 3,
        content: (
          <SlideImage
            src="/team/victor/web_controller_terminal.png"
            alt="Web controller terminal view"
            onFlip={flipCard}
          />
        ),
      },
    ],
    [flipCard],
  );

  return (
    <article className="space-y-3">
      <h3 className="text-primary-600 text-center text-xl font-bold tracking-tight italic md:text-3xl">
        User Interactive App
      </h3>

      <div className="mx-auto w-full max-w-[400px]">
        <div
          className="aspect-[5/3.5] w-full"
          style={{ perspective: "1200px" }}
        >
          <div
            className="relative h-full w-full transition-transform duration-700"
            style={{
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-md">
                <Carousel
                  items={items as any}
                  baseWidth={400}
                  autoplay={!isFlipped}
                  autoplayDelay={2000}
                  pauseOnHover
                  loop
                  round={false}
                  className="carousel-media"
                  containerPadding={0}
                />
              </div>
            </div>

            <div
              className="text-primary-950 absolute inset-0 flex h-full cursor-pointer flex-col justify-center rounded-2xl border border-sky-200 bg-[#dff4ff] p-5 shadow-md outline-none"
              role="button"
              tabIndex={0}
              aria-label="Flip User Interactive App card back to carousel"
              onClick={flipCard}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  flipCard();
                }
              }}
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <p className="text-primary-600 text-xs font-black tracking-[0.2em] uppercase">
                User Interactive App
              </p>
              <div className="mt-3 text-sm leading-relaxed font-semibold md:text-base">
                <p>
                  This web interface is locally hosted on the robot and will be
                  used for the user to interact with the robot, test movement
                  features and perceive data . Main features include:
                </p>
                <ul className="mt-2 list-inside list-disc">
                  <li>Real-time movement control</li>
                  <li>Camera feed display</li>
                  <li>Terminal access for diagnostics</li>
                </ul>
              </div>
              <p className="text-primary-600 mt-4 text-xs font-bold uppercase">
                Click to flip back
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
