import React, { useMemo } from "react";

/**
 * Lightweight, realistic deep space background:
 * Deep cosmic void, subtle nebula dust, and sub-pixel twinkling stars.
 */
export const InterstellarBackground = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 85 }).map((_, i) => ({
      id: i,
      left: `${(Math.random() * 100).toFixed(1)}%`,
      top: `${(Math.random() * 100).toFixed(1)}%`,
      size: (Math.random() * 1.5 + 0.5).toFixed(1),
      opacity: (Math.random() * 0.6 + 0.25).toFixed(2),
      dur: `${(Math.random() * 3 + 2).toFixed(1)}s`,
      delay: `${(Math.random() * 3).toFixed(1)}s`,
      color: i % 6 === 0 ? "#93c5fd" : i % 8 === 0 ? "#fef08a" : "#ffffff",
    }));
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden bg-[#020205] select-none z-0">
      {/* Deep Space Cosmic Dust & Faint Nebulae */}
      <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-indigo-950/20 rounded-full blur-[160px]" />
      <div className="absolute -bottom-20 -right-20 w-[700px] h-[700px] bg-slate-900/30 rounded-full blur-[180px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-950/15 rounded-full blur-[140px]" />

      {/* Realistic Distant Starfield */}
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute rounded-full animate-twinkle"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            boxShadow: `0 0 2px ${star.color}`,
            "--twinkle-dur": star.dur,
            "--twinkle-delay": star.delay,
          }}
        />
      ))}
    </div>
  );
};

export default InterstellarBackground;
