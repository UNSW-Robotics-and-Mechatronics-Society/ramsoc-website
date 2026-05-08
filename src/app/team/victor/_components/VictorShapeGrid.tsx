"use client";

import ShapeGrid from "@/components/ShapeGrid";

type VictorShapeGridProps = {
  speed?: number;
  squareSize?: number;
  direction?: "right" | "left" | "up" | "down" | "diagonal";
  borderColor?: string;
  hoverFillColor?: string;
  shape?: "square" | "hexagon" | "triangle" | "circle";
  hoverTrailAmount?: number;
  className?: string;
};

export default function VictorShapeGrid({
  speed = 0.3,
  squareSize = 60,
  direction = "left",
  borderColor = "#deebff",
  hoverFillColor = "#d2d2f1",
  shape = "square",
  hoverTrailAmount = 5,
  className = "h-full w-full",
}: VictorShapeGridProps) {
  return (
    <div className="relative h-full w-full">
      <ShapeGrid
        speed={speed}
        squareSize={squareSize}
        direction={direction}
        borderColor={borderColor}
        hoverFillColor={hoverFillColor}
        shape={shape}
        hoverTrailAmount={hoverTrailAmount}
        className={className}
      />
    </div>
  );
}
