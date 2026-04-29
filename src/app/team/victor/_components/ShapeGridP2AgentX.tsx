"use client";

import ShapeGrid from "@/components/ShapeGrid";

export default function ShapeGridP2AgentX() {
  return (
    <div className="relative h-full w-full">
      <ShapeGrid
        speed={0.3}
        squareSize={60}
        direction="diagonal"
        borderColor="#deebff"
        hoverFillColor="#d2d2f1"
        shape="square"
        hoverTrailAmount={5}
        className="h-full w-full"
      />
    </div>
  );
}
