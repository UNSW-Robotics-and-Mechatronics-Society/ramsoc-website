"use client";

import ShapeGrid from "@/components/ShapeGrid";

export default function VictorShapeGrid() {
  return (
    <div className="relative h-full w-full">
      <ShapeGrid
        speed={0.2}
        squareSize={60}
        direction="right"
        borderColor="#deebff"
        hoverFillColor="#d2d2f1"
        shape="square"
        hoverTrailAmount={5}
        className="h-full w-full"
      />
    </div>
  );
}
