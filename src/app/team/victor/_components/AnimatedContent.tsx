"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  useEffect,
  useRef,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";

gsap.registerPlugin(ScrollTrigger);

type AnimatedContentProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
  container?: string | Element | null;
  distance?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  duration?: number;
  ease?: string;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
  delay?: number;
  replay?: boolean;
  exitDistance?: number;
  exitScale?: number;
  exitOpacity?: number;
  disappearAfter?: number;
  disappearDuration?: number;
  disappearEase?: string;
  onComplete?: () => void;
  onDisappearanceComplete?: () => void;
};

export default function AnimatedContent({
  children,
  container,
  distance = 100,
  direction = "vertical",
  reverse = false,
  duration = 0.8,
  ease = "power3.out",
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  replay = false,
  exitDistance,
  exitScale,
  exitOpacity,
  disappearAfter = 0,
  disappearDuration = 0.5,
  disappearEase = "power3.in",
  onComplete,
  onDisappearanceComplete,
  className = "",
  ...props
}: AnimatedContentProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let scrollerTarget =
      container ?? document.getElementById("snap-main-container") ?? null;

    if (typeof scrollerTarget === "string") {
      scrollerTarget = document.querySelector(scrollerTarget);
    }

    const axis = direction === "horizontal" ? "x" : "y";
    const offset = reverse ? -distance : distance;
    const resolvedExitDistance = exitDistance ?? distance;
    const exitOffset = reverse ? -resolvedExitDistance : resolvedExitDistance;
    const hiddenOpacity = animateOpacity ? initialOpacity : 1;
    const startPct = (1 - threshold) * 100;

    gsap.set(element, {
      [axis]: offset,
      scale,
      opacity: hiddenOpacity,
      visibility: "visible",
    });

    const animateIn = () => {
      gsap.to(element, {
        [axis]: 0,
        scale: 1,
        opacity: 1,
        duration,
        ease,
        delay,
        overwrite: "auto",
        onComplete,
      });
    };

    const animateOut = () => {
      gsap.to(element, {
        [axis]: exitOffset,
        scale: exitScale ?? scale,
        opacity: exitOpacity ?? hiddenOpacity,
        duration: disappearDuration,
        ease: disappearEase,
        overwrite: "auto",
        onComplete: onDisappearanceComplete,
      });
    };

    if (replay) {
      const scrollTrigger = ScrollTrigger.create({
        trigger: element,
        scroller: scrollerTarget,
        start: `top ${startPct}%`,
        end: "bottom top",
        onEnter: animateIn,
        onLeave: animateOut,
        onEnterBack: animateIn,
        onLeaveBack: animateOut,
      });

      return () => {
        scrollTrigger.kill();
        gsap.killTweensOf(element);
      };
    }

    const timeline = gsap.timeline({
      paused: true,
      delay,
      onComplete: () => {
        onComplete?.();

        if (disappearAfter > 0) {
          gsap.to(element, {
            [axis]: reverse ? distance : -distance,
            scale: 0.8,
            opacity: animateOpacity ? initialOpacity : 0,
            delay: disappearAfter,
            duration: disappearDuration,
            ease: disappearEase,
            onComplete: () => onDisappearanceComplete?.(),
          });
        }
      },
    });

    timeline.to(element, {
      [axis]: 0,
      scale: 1,
      opacity: 1,
      duration,
      ease,
    });

    const scrollTrigger = ScrollTrigger.create({
      trigger: element,
      scroller: scrollerTarget,
      start: `top ${startPct}%`,
      once: true,
      onEnter: () => timeline.play(),
    });

    return () => {
      scrollTrigger.kill();
      timeline.kill();
    };
  }, [
    container,
    distance,
      direction,
      reverse,
      duration,
      ease,
      initialOpacity,
      animateOpacity,
      scale,
      threshold,
      delay,
      replay,
      exitDistance,
      exitScale,
      exitOpacity,
      disappearAfter,
      disappearDuration,
      disappearEase,
      onComplete,
      onDisappearanceComplete,
  ]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ visibility: "hidden" }}
      {...props}
    >
      {children}
    </div>
  );
}
