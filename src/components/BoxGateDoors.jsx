import React from "react";

/**
 * BoxGateDoors — Individual rocket launch pod blast doors for each OTP box.
 * When the correct OTP is verified, these two heavy metallic blast doors slide
 * shut from left & right over the digit, sealing each box into an armored rocket pod
 * right before liftoff.
 *
 * Props:
 *  - isClosed: boolean — when true, doors slide shut to the center; when false, retracts off-screen
 */
export const BoxGateDoors = ({ isClosed }) => {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-[inherit] select-none">
      {/* 1. LEFT BLAST DOOR */}
      <div
        className={`absolute top-0 bottom-0 left-0 w-1/2 transition-transform duration-450 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isClosed ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background:
            "linear-gradient(145deg, rgba(36, 45, 62, 0.98) 0%, rgba(18, 24, 38, 0.99) 100%)",
          borderRight: "1.5px solid rgba(100, 116, 139, 0.75)",
          boxShadow:
            "inset 0 1px 1px 0 rgba(255,255,255,0.25), inset 0 -1px 2px 0 rgba(0,0,0,0.6), inset 1px 0 1px 0 rgba(255,255,255,0.12)",
        }}
      >
        {/* Horizontal reinforced armor ribs */}
        <div className="absolute top-[22%] left-1.5 right-1 h-[1.5px] bg-slate-800/90 shadow-[0_1px_0_rgba(255,255,255,0.12)]" />
        <div className="absolute top-[50%] left-1.5 right-1 h-[1.5px] bg-slate-800/90 shadow-[0_1px_0_rgba(255,255,255,0.12)]" />
        <div className="absolute top-[78%] left-1.5 right-1 h-[1.5px] bg-slate-800/90 shadow-[0_1px_0_rgba(255,255,255,0.12)]" />

        {/* Top/bottom corner rivets */}
        <div className="absolute top-2 left-2 w-1 h-1 rounded-full bg-slate-500/50 shadow-[inset_0_0.5px_0.5px_rgba(255,255,255,0.4)]" />
        <div className="absolute bottom-2 left-2 w-1 h-1 rounded-full bg-slate-500/50 shadow-[inset_0_0.5px_0.5px_rgba(255,255,255,0.4)]" />

        {/* Left-half of central status indicator notch */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1 h-3 rounded-l-sm bg-sky-400/90 shadow-[0_0_8px_rgba(56,189,248,0.95)]" />
      </div>

      {/* 2. RIGHT BLAST DOOR */}
      <div
        className={`absolute top-0 bottom-0 right-0 w-1/2 transition-transform duration-450 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isClosed ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background:
            "linear-gradient(215deg, rgba(36, 45, 62, 0.98) 0%, rgba(18, 24, 38, 0.99) 100%)",
          borderLeft: "1.5px solid rgba(100, 116, 139, 0.75)",
          boxShadow:
            "inset 0 1px 1px 0 rgba(255,255,255,0.25), inset 0 -1px 2px 0 rgba(0,0,0,0.6), inset -1px 0 1px 0 rgba(255,255,255,0.12)",
        }}
      >
        {/* Horizontal reinforced armor ribs */}
        <div className="absolute top-[22%] left-1 right-1.5 h-[1.5px] bg-slate-800/90 shadow-[0_1px_0_rgba(255,255,255,0.12)]" />
        <div className="absolute top-[50%] left-1 right-1.5 h-[1.5px] bg-slate-800/90 shadow-[0_1px_0_rgba(255,255,255,0.12)]" />
        <div className="absolute top-[78%] left-1 right-1.5 h-[1.5px] bg-slate-800/90 shadow-[0_1px_0_rgba(255,255,255,0.12)]" />

        {/* Top/bottom corner rivets */}
        <div className="absolute top-2 right-2 w-1 h-1 rounded-full bg-slate-500/50 shadow-[inset_0_0.5px_0.5px_rgba(255,255,255,0.4)]" />
        <div className="absolute bottom-2 right-2 w-1 h-1 rounded-full bg-slate-500/50 shadow-[inset_0_0.5px_0.5px_rgba(255,255,255,0.4)]" />

        {/* Right-half of central status indicator notch */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1 h-3 rounded-r-sm bg-sky-400/90 shadow-[0_0_8px_rgba(56,189,248,0.95)]" />
      </div>

      {/* 3. CENTER SEAL LOCK LINE (Glows when the 2 doors meet) */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[2px] h-[65%] rounded-full transition-all duration-300 ${
          isClosed
            ? "opacity-100 bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.9)] delay-350"
            : "opacity-0 scale-y-0"
        }`}
      />
    </div>
  );
};

export default BoxGateDoors;
