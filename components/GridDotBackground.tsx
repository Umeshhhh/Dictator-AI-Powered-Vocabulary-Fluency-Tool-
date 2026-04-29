"use client";

import React from "react";

interface DotBackgroundProps {
  dotSize?: number;
  spacing?: number;
  dotColor?: string;
  children?: React.ReactNode;
  className?: string;
}

const DotBackground = ({
  dotSize = 1,
  spacing = 24,
  dotColor = "#ffffff",
  children,
  className = "",
}: DotBackgroundProps) => {
  return (
    <div className={`relative w-full bg-black overflow-hidden ${className}`}>
      {/* Dot grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundSize: `${spacing}px ${spacing}px`,
          backgroundImage: `radial-gradient(${dotColor} ${dotSize}px, transparent ${dotSize}px)`,
        }}
      />

      {/* Fade mask (edges darker, center visible) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, rgba(0,0,0,0) 70%, rgba(0,0,0,1) 100%)`,
        }}
      />

      {/* Content above dots */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default DotBackground;
