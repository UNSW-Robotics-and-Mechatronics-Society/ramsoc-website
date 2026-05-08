"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";

import "./BorderGlow.css";

function parseHsl(hslStr: string) {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);

  if (!match) {
    return { h: 40, s: 80, l: 80 };
  }

  return {
    h: Number.parseFloat(match[1] ?? "40"),
    s: Number.parseFloat(match[2] ?? "80"),
    l: Number.parseFloat(match[3] ?? "80"),
  };
}

function buildGlowVars(glowColor: string, intensity: number) {
  const { h, s, l } = parseHsl(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  const opacities = [100, 60, 50, 40, 30, 20, 10];
  const keys = ["", "-60", "-50", "-40", "-30", "-20", "-10"];

  return opacities.reduce<Record<string, string>>((vars, opacity, index) => {
    vars[`--glow-color${keys[index]}`] =
      `hsl(${base} / ${Math.min(opacity * intensity, 100)}%)`;
    return vars;
  }, {});
}

const GRADIENT_POSITIONS = [
  "80% 55%",
  "69% 34%",
  "8% 6%",
  "41% 38%",
  "86% 85%",
  "82% 18%",
  "51% 4%",
];

const GRADIENT_KEYS = [
  "--gradient-one",
  "--gradient-two",
  "--gradient-three",
  "--gradient-four",
  "--gradient-five",
  "--gradient-six",
  "--gradient-seven",
];

const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function buildGradientVars(colors: string[]) {
  return GRADIENT_KEYS.reduce<Record<string, string>>(
    (vars, key, index) => {
      const color = colors[Math.min(COLOR_MAP[index] ?? 0, colors.length - 1)];
      vars[key] =
        `radial-gradient(at ${GRADIENT_POSITIONS[index]}, ${color} 0px, transparent 50%)`;
      return vars;
    },
    { "--gradient-base": `linear-gradient(${colors[0]} 0 100%)` },
  );
}

function easeOutCubic(x: number) {
  return 1 - (1 - x) ** 3;
}

function easeInCubic(x: number) {
  return x ** 3;
}

function animateValue({
  start = 0,
  end = 100,
  duration = 1000,
  delay = 0,
  ease = easeOutCubic,
  onUpdate,
  onEnd,
}: {
  start?: number;
  end?: number;
  duration?: number;
  delay?: number;
  ease?: (x: number) => number;
  onUpdate: (value: number) => void;
  onEnd?: () => void;
}) {
  const startTime = performance.now() + delay;

  function tick() {
    const elapsed = performance.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    onUpdate(start + (end - start) * ease(progress));

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      onEnd?.();
    }
  }

  window.setTimeout(() => requestAnimationFrame(tick), delay);
}

type BorderGlowProps = {
  children: ReactNode;
  className?: string;
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: [string, string, string] | string[];
  fillOpacity?: number;
};

export default function BorderGlow({
  children,
  className = "",
  edgeSensitivity = 30,
  glowColor = "40 80 80",
  backgroundColor = "#120F17",
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1,
  coneSpread = 25,
  animated = true,
  colors = ["#c084fc", "#f472b6", "#38bdf8"],
  fillOpacity = 0.5,
}: BorderGlowProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const getCenterOfElement = useCallback((element: HTMLDivElement) => {
    const { width, height } = element.getBoundingClientRect();
    return [width / 2, height / 2] as const;
  }, []);

  const getEdgeProximity = useCallback(
    (element: HTMLDivElement, x: number, y: number) => {
      const [centerX, centerY] = getCenterOfElement(element);
      const dx = x - centerX;
      const dy = y - centerY;
      let kx = Number.POSITIVE_INFINITY;
      let ky = Number.POSITIVE_INFINITY;

      if (dx !== 0) {
        kx = centerX / Math.abs(dx);
      }

      if (dy !== 0) {
        ky = centerY / Math.abs(dy);
      }

      return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
    },
    [getCenterOfElement],
  );

  const getCursorAngle = useCallback(
    (element: HTMLDivElement, x: number, y: number) => {
      const [centerX, centerY] = getCenterOfElement(element);
      const dx = x - centerX;
      const dy = y - centerY;

      if (dx === 0 && dy === 0) {
        return 0;
      }

      const radians = Math.atan2(dy, dx);
      let degrees = radians * (180 / Math.PI) + 90;

      if (degrees < 0) {
        degrees += 360;
      }

      return degrees;
    },
    [getCenterOfElement],
  );

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const edge = getEdgeProximity(card, x, y);
      const angle = getCursorAngle(card, x, y);

      card.style.setProperty("--edge-proximity", `${(edge * 100).toFixed(3)}`);
      card.style.setProperty("--cursor-angle", `${angle.toFixed(3)}deg`);
    },
    [getCursorAngle, getEdgeProximity],
  );

  useEffect(() => {
    if (!animated || !cardRef.current) return;

    const card = cardRef.current;
    const angleStart = 110;
    const angleEnd = 465;

    card.classList.add("sweep-active");
    card.style.setProperty("--cursor-angle", `${angleStart}deg`);

    animateValue({
      duration: 500,
      onUpdate: (value) =>
        card.style.setProperty("--edge-proximity", `${value}`),
    });

    animateValue({
      duration: 1500,
      end: 50,
      ease: easeInCubic,
      onUpdate: (value) => {
        const angle = ((angleEnd - angleStart) * value) / 100 + angleStart;
        card.style.setProperty("--cursor-angle", `${angle}deg`);
      },
    });

    animateValue({
      delay: 1500,
      duration: 2250,
      start: 50,
      end: 100,
      ease: easeOutCubic,
      onUpdate: (value) => {
        const angle = ((angleEnd - angleStart) * value) / 100 + angleStart;
        card.style.setProperty("--cursor-angle", `${angle}deg`);
      },
    });

    animateValue({
      delay: 2500,
      duration: 1500,
      start: 100,
      end: 0,
      ease: easeInCubic,
      onUpdate: (value) =>
        card.style.setProperty("--edge-proximity", `${value}`),
      onEnd: () => card.classList.remove("sweep-active"),
    });
  }, [animated]);

  const style = {
    "--card-bg": backgroundColor,
    "--edge-sensitivity": edgeSensitivity,
    "--border-radius": `${borderRadius}px`,
    "--glow-padding": `${glowRadius}px`,
    "--cone-spread": coneSpread,
    "--fill-opacity": fillOpacity,
    ...buildGlowVars(glowColor, glowIntensity),
    ...buildGradientVars(colors),
  } as React.CSSProperties;

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      className={`border-glow-card ${className}`.trim()}
      style={style}
    >
      <span className="edge-light" />
      <div className="border-glow-inner">{children}</div>
    </div>
  );
}
