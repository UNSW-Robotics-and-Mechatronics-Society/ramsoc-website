"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";

import "./BounceCards.css";

type BounceCardsProps = {
  className?: string;
  images: string[];
  containerWidth?: number;
  containerHeight?: number;
  animationDelay?: number;
  animationStagger?: number;
  easeType?: string;
  transformStyles?: string[];
  enableHover?: boolean;
};

export default function BounceCards({
  className = "",
  images = [],
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  easeType = "elastic.out(1, 0.8)",
  transformStyles = [
    "rotate(10deg) translate(-170px)",
    "rotate(5deg) translate(-85px)",
    "rotate(-3deg)",
    "rotate(-10deg) translate(85px)",
    "rotate(2deg) translate(170px)",
  ],
  enableHover = true,
}: BounceCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.fromTo(
        ".card",
        { scale: 0 },
        {
          scale: 1,
          stagger: animationStagger,
          ease: easeType,
          delay: animationDelay,
        },
      );
    }, containerRef);

    return () => context.revert();
  }, [animationDelay, animationStagger, easeType]);

  const getNoRotationTransform = (transform: string) => {
    const hasRotate = /rotate\([\s\S]*?\)/.test(transform);

    if (hasRotate) {
      return transform.replace(/rotate\([\s\S]*?\)/, "rotate(0deg)");
    }

    if (transform === "none") {
      return "rotate(0deg)";
    }

    return `${transform} rotate(0deg)`;
  };

  const getPushedTransform = (baseTransform: string, offsetX: number) => {
    const translateRegex = /translate\(([-0-9.]+)px\)/;
    const match = baseTransform.match(translateRegex);

    if (match?.[1]) {
      const currentX = Number.parseFloat(match[1]);
      const newX = currentX + offsetX;
      return baseTransform.replace(translateRegex, `translate(${newX}px)`);
    }

    return baseTransform === "none"
      ? `translate(${offsetX}px)`
      : `${baseTransform} translate(${offsetX}px)`;
  };

  const pushSiblings = (hoveredIndex: number) => {
    if (!enableHover || !containerRef.current) return;

    const query = gsap.utils.selector(containerRef);

    images.forEach((_, index) => {
      const target = query(`.card-${index}`);
      gsap.killTweensOf(target);

      const baseTransform = transformStyles[index] ?? "none";

      if (index === hoveredIndex) {
        const noRotationTransform = getNoRotationTransform(baseTransform);
        gsap.to(target, {
          transform: noRotationTransform,
          duration: 0.4,
          ease: "back.out(1.4)",
          overwrite: "auto",
        });
      } else {
        const offsetX = index < hoveredIndex ? -160 : 160;
        const pushedTransform = getPushedTransform(baseTransform, offsetX);
        const distance = Math.abs(hoveredIndex - index);
        const delay = distance * 0.05;

        gsap.to(target, {
          transform: pushedTransform,
          duration: 0.4,
          ease: "back.out(1.4)",
          delay,
          overwrite: "auto",
        });
      }
    });
  };

  const resetSiblings = () => {
    if (!enableHover || !containerRef.current) return;

    const query = gsap.utils.selector(containerRef);

    images.forEach((_, index) => {
      const target = query(`.card-${index}`);
      gsap.killTweensOf(target);

      gsap.to(target, {
        transform: transformStyles[index] ?? "none",
        duration: 0.4,
        ease: "back.out(1.4)",
        overwrite: "auto",
      });
    });
  };

  return (
    <div
      ref={containerRef}
      className={`bounceCardsContainer ${className}`.trim()}
      style={{
        position: "relative",
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
      }}
    >
      {images.map((src, index) => (
        <div
          key={src}
          className={`card card-${index}`}
          style={{
            transform: transformStyles[index] ?? "none",
          }}
          onMouseEnter={() => pushSiblings(index)}
          onMouseLeave={resetSiblings}
        >
          <img className="image" src={src} alt={`origami card ${index + 1}`} />
        </div>
      ))}
    </div>
  );
}
