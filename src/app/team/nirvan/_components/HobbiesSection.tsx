"use client";

import { useState } from "react";
import { Mountain, Gamepad2, Code2 } from "lucide-react";

const ICON_CENTERS = ["16.67%", "50%", "83.33%"] as const;

const hobbies = [
  {
    title: "Hiking",
    Icon: Mountain,
    accent: "#5ab8d4",
    highlight: "#a8e8f8",
    glow: "rgba(90,184,212,0.28)",
    background: "linear-gradient(170deg, #060e18 0%, #0a1e30 60%, #040d1a 100%)",
    text: "Finding clarity one trail at a time. The best views always come after the hardest climbs.",
  },
  {
    title: "Gaming",
    Icon: Gamepad2,
    accent: "#e040c0",
    highlight: "#f8a0e0",
    glow: "rgba(224,64,192,0.28)",
    background: "linear-gradient(170deg, #130008 0%, #220b18 60%, #0e0010 100%)",
    text: "Every game is a world with its own rules. Strategy, exploration, always the next challenge.",
  },
  {
    title: "Coding",
    Icon: Code2,
    accent: "#a8d400",
    highlight: "#d4f060",
    glow: "rgba(168,212,0,0.28)",
    background: "linear-gradient(170deg, #060d00 0%, #101c00 60%, #040a00 100%)",
    text: "Turning ideas into working systems. Building from scratch and watching it run never gets old.",
  },
];

// Bounds at the BOTTOM edge (where paragraph text sits)
const contentBounds = [
  { default: { left: "0%",     right: "66.67%" }, hover: { left: "0%",  right: "62%" } },
  { default: { left: "33.33%", right: "33.33%" }, hover: { left: "38%", right: "38%" } },
  { default: { left: "66.67%", right: "0%"     }, hover: { left: "62%", right: "0%"  } },
];

// Bounds at the TOP edge (where the heading sits)
const titleBounds = [
  { default: { left: "0%",     right: "66.67%" }, hover: { left: "0%",  right: "72%" } },
  { default: { left: "33.33%", right: "33.33%" }, hover: { left: "28%", right: "28%" } },
  { default: { left: "66.67%", right: "0%"     }, hover: { left: "72%", right: "0%"  } },
];

// Deterministic hyperdrive streak configs — varied lengths/speeds for depth
const STREAKS = Array.from({ length: 32 }, (_, i) => {
  const isLong = i % 5 === 0;
  const height = isLong
    ? 160 + ((i * 11 + 7) % 90)   // 160–250 px — the "fast" foreground streaks
    : 40 + ((i * 23 + 11) % 90);  //  40–130 px — shorter background streaks
  const duration = isLong
    ? 0.18 + ((i * 17 + 3) % 10) / 10 * 0.22  // 0.18–0.40 s (fast)
    : 0.35 + ((i * 19 + 7) % 14) / 14 * 0.55; // 0.35–0.90 s (slower)
  return {
    left: ((i * 37 + 13) % 93) + 3,
    height,
    duration,
    delay: -(((i * 31 + 3) % 100) / 100 * duration),
    opacity: isLong
      ? 0.75 + ((i * 7) % 3) / 10          // 0.75–1.0
      : 0.30 + ((i * 13 + 5) % 7) / 14,   // 0.30–0.80
    width: isLong ? 2 : 1,
    // accent = section colour streak, highlight = lighter tint, normal = white
    type: (i % 5 === 1 ? "accent" : i % 5 === 3 ? "highlight" : "normal") as
      | "accent"
      | "highlight"
      | "normal",
  };
});

// Static background star-dots for depth
const STARS = Array.from({ length: 22 }, (_, i) => ({
  left: ((i * 41 + 17) % 92) + 4,
  top: ((i * 29 + 11) % 86) + 5,
  size: ((i * 7 + 3) % 3) + 1,
  opacity: 0.08 + ((i * 13 + 5) % 8) / 20,
  glowing: i % 6 === 0,
}));

const defaultClips = [
  "polygon(0% 0%, 33.33% 0%, 33.33% 100%, 0% 100%)",
  "polygon(33.33% 0%, 66.67% 0%, 66.67% 100%, 33.33% 100%)",
  "polygon(66.67% 0%, 100% 0%, 100% 100%, 66.67% 100%)",
];

const hoverClips = [
  "polygon(0% 0%, 28% 0%, 38% 100%, 0% 100%)",
  "polygon(28% 0%, 72% 0%, 62% 100%, 38% 100%)",
  "polygon(72% 0%, 100% 0%, 100% 100%, 62% 100%)",
];

export default function HobbiesSection() {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <style>{`
        @keyframes hyperDrive {
          0%   { transform: translateY(0px); }
          100% { transform: translateY(590px); }
        }
      `}</style>
      <div
        className="relative w-full overflow-hidden rounded-lg"
        style={{ height: "340px" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {hobbies.map((hobby, i) => (
          <div
            key={hobby.title}
            className="absolute inset-0 overflow-hidden"
            style={{
              background: hobby.background,
              clipPath: hovered ? hoverClips[i] : defaultClips[i],
              transition: "clip-path 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {/* Static star field — always visible for depth */}
            {STARS.map((star, j) => (
              <div
                key={j}
                style={{
                  position: "absolute",
                  left: `${star.left}%`,
                  top: `${star.top}%`,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  borderRadius: "50%",
                  background: "white",
                  opacity: star.opacity,
                  boxShadow: star.glowing
                    ? `0 0 ${star.size + 2}px 1px ${hobby.accent}99`
                    : undefined,
                }}
              />
            ))}

            {/* Hyperdrive streaks — fade in on hover */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                overflow: "hidden",
                opacity: hovered ? 1 : 0,
                transition: "opacity 0.3s ease",
              }}
            >
              {STREAKS.map((s, j) => {
                const grad =
                  s.type === "accent"
                    ? `linear-gradient(to bottom, transparent, ${hobby.accent}bb 70%, ${hobby.accent})`
                    : s.type === "highlight"
                    ? `linear-gradient(to bottom, transparent, ${hobby.highlight}99 75%, ${hobby.highlight})`
                    : "linear-gradient(to bottom, transparent, rgba(255,255,255,0.45) 80%, rgba(255,255,255,0.75))";

                const glow =
                  s.type === "accent"
                    ? `0 4px 10px 2px ${hobby.accent}77`
                    : s.type === "highlight"
                    ? `0 3px 8px 1px ${hobby.highlight}66`
                    : s.width === 2
                    ? "0 2px 6px 1px rgba(255,255,255,0.5)"
                    : undefined;

                return (
                  <div
                    key={j}
                    style={{
                      position: "absolute",
                      left: `${s.left}%`,
                      top: `-${s.height}px`,
                      width: `${s.width}px`,
                      height: `${s.height}px`,
                      background: grad,
                      boxShadow: glow,
                      opacity: s.opacity,
                      animation: `hyperDrive ${s.duration}s ${s.delay}s linear infinite`,
                      willChange: "transform",
                    }}
                  />
                );
              })}
            </div>

            {/* Bottom gradient — dims streaks so text stays readable */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "140px",
                background: `linear-gradient(to top, ${hobby.background.match(/#[0-9a-f]{6}/i)?.[0] ?? "#000"} 10%, ${hobby.glow} 60%, transparent)`,
                pointerEvents: "none",
              }}
            />

            {/* Vertical seam on the split edge */}
            {i < 2 && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "1px",
                  height: "100%",
                  background:
                    "linear-gradient(to bottom, transparent 5%, rgba(255,255,255,0.25) 50%, transparent 95%)",
                }}
              />
            )}

            {/* Heading — top-left corner, always visible, tracks top clip boundary */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: hovered
                  ? titleBounds[i]!.hover.left
                  : titleBounds[i]!.default.left,
                right: hovered
                  ? titleBounds[i]!.hover.right
                  : titleBounds[i]!.default.right,
                padding: "20px",
                zIndex: 10,
                transition:
                  "left 0.65s cubic-bezier(0.4, 0, 0.2, 1), right 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <h3
                style={{
                  color: hobby.accent,
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  textShadow: `0 0 14px ${hobby.accent}`,
                }}
              >
                {hobby.title}
              </h3>
            </div>

            {/* Icon — centered in the panel, floats up slightly on hover */}
            <div
              style={{
                position: "absolute",
                top: hovered ? "44%" : "52%",
                left: ICON_CENTERS[i],
                transform: "translate(-50%, -50%)",
                zIndex: 10,
                transition: "top 0.65s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease",
                opacity: hovered ? 0.55 : 0.85,
                pointerEvents: "none",
              }}
            >
              <hobby.Icon
                size={44}
                color={hobby.accent}
                strokeWidth={1.25}
                style={{ filter: `drop-shadow(0 0 14px ${hobby.accent}aa)` }}
              />
            </div>

            {/* Paragraph — bottom, invisible until hover, fades in after tilt settles */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: hovered
                  ? contentBounds[i]!.hover.left
                  : contentBounds[i]!.default.left,
                right: hovered
                  ? contentBounds[i]!.hover.right
                  : contentBounds[i]!.default.right,
                padding: "20px",
                zIndex: 10,
                transition:
                  "left 0.65s cubic-bezier(0.4, 0, 0.2, 1), right 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <p
                style={{
                  fontSize: "0.72rem",
                  lineHeight: "1.65",
                  color: "rgba(255,255,255,0.65)",
                  opacity: hovered ? 1 : 0,
                  transition: hovered
                    ? "opacity 1.2s ease 0.75s"
                    : "opacity 0.2s ease",
                }}
              >
                {hobby.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
