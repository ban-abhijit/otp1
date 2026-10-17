import React from "react";

/**
 * RocketThruster component accurately styled after the user reference image:
 * Metallic dark nozzle, 3-prong orange flame, bright yellow core, and floating ember sparks.
 */
export const RocketThruster = () => {
  return (
    <div className="flex flex-col items-center origin-top select-none pointer-events-none">
      <svg
        viewBox="0 0 36 68"
        className="w-6 min-[360px]:w-7 sm:w-8 h-10 min-[360px]:h-12 sm:h-14 overflow-visible drop-shadow-[0_0_12px_rgba(249,115,22,0.85)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Rocket Engine Nozzle (Dark metallic trapezoid with lip) */}
        <polygon
          points="9,0 27,0 30,10 6,10"
          fill="#334155"
          stroke="#1e293b"
          strokeWidth="1.5"
        />
        {/* Nozzle Bottom Lip */}
        <rect x="5.5" y="9" width="25" height="2.5" rx="0.5" fill="#1e293b" />

        {/* Outer Flame (Orange 3-prong rocket flame matching reference image) */}
        <path
          d="M 9 11 C 7 24 3 30 5 38 L 10 32 C 11 41 14 51 18 65 C 22 51 25 41 26 32 L 31 38 C 33 30 29 24 27 11 Z"
          fill="#f97316"
          stroke="#ea580c"
          strokeWidth="0.8"
        />

        {/* Inner Core Flame (Bright Yellow Arrowhead spear) */}
        <path
          d="M 13 11 C 12 20 10 24 11 28 L 14 24 C 15 32 16 38 18 47 C 20 38 21 32 22 24 L 25 28 C 26 24 24 20 23 11 Z"
          fill="#fef08a"
        />

        {/* Ember / Spark particles below flame */}
        <circle cx="12" cy="53" r="1.3" fill="#ea580c" opacity="0.9" />
        <circle cx="19" cy="59" r="1" fill="#f97316" opacity="0.95" />
        <circle cx="24" cy="51" r="1.2" fill="#ea580c" opacity="0.85" />
        <circle cx="16" cy="67" r="0.9" fill="#fde047" opacity="0.95" />
      </svg>
    </div>
  );
};

export default RocketThruster;
