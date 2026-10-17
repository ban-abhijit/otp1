import React, { useRef, useState } from "react";
import BorderBeam from "./BorderBeam";
import RocketThruster from "./RocketThruster";
import BoxGateDoors from "./BoxGateDoors";

// Symmetrical Parabola curve offsets & tangent angles for the 6 boxes:
// Forms an arching parabolic crown over the Verify button (Boxes 2 & 3 at the apex)
const PARABOLIC_SHAPE = [
  { y: 16, rot: -8 },   // Box 0 (Left base)
  { y: 4,  rot: -3.5 }, // Box 1 (Mid-left slope)
  { y: -6, rot: -1 },   // Box 2 (Center-left apex)
  { y: -6, rot: 1 },    // Box 3 (Center-right apex)
  { y: 4,  rot: 3.5 },  // Box 4 (Mid-right slope)
  { y: 16, rot: 8 },    // Box 5 (Right base)
];

export const GlassOtpBoxes = ({
  otp,
  setOtp,
  isPushedOut,
  isGatesClosed,
  isVibrating,
  onEnter,
}) => {
  const inputRefs = useRef([]);
  const [focusedIndex, setFocusedIndex] = useState(null);

  // Active box calculation (cursor focus or first empty slot)
  const firstEmptyIndex = otp.findIndex((v) => !v);
  const activeIndex = focusedIndex !== null
    ? focusedIndex
    : (firstEmptyIndex !== -1 ? firstEmptyIndex : 5);

  const handleChange = (e, index) => {
    if (isPushedOut) return;
    const val = e.target.value;

    // Handle paste of 6 digits
    if (val.length > 1) {
      const cleanDigits = val.replace(/\D/g, "").slice(0, 6).split("");
      const updatedOtp = [...otp];
      cleanDigits.forEach((digit, i) => {
        if (i < 6) updatedOtp[i] = digit;
      });
      setOtp(updatedOtp);
      const nextIndex = Math.min(cleanDigits.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    // Single digit input
    const cleanChar = val.replace(/\D/g, "");
    const updated = [...otp];
    updated[index] = cleanChar;
    setOtp(updated);

    if (cleanChar && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (isPushedOut) return;

    // Trigger verify when pressing Enter anywhere in the OTP boxes
    if (e.key === "Enter") {
      e.preventDefault();
      if (onEnter) onEnter();
      return;
    }

    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div
      className={`relative z-20 flex items-center justify-center gap-1.5 min-[360px]:gap-2 sm:gap-3.5 mb-8 sm:mb-10 transition-transform [--para-scale:0.7] min-[360px]:[--para-scale:0.85] sm:[--para-scale:1] ${
        isVibrating ? "animate-error-vibrate" : ""
      }`}
    >
      {otp.map((digit, index) => {
        const isCurrentActive = index === activeIndex && !isPushedOut && !isVibrating;
        const parabola = PARABOLIC_SHAPE[index];

        const flyClass = isPushedOut
          ? `animate-fly-${index}`
          : "scale-100 transition-all duration-700 cubic-bezier(0.34, 1.56, 0.64, 1)";

        return (
          <div
            key={index}
            className={`relative ${flyClass}`}
            style={{
              // Symmetrical Parabola position when resting, scaled responsively
              transform: !isPushedOut
                ? `translateY(calc(${parabola.y}px * var(--para-scale))) rotate(calc(${parabola.rot}deg * var(--para-scale)))`
                : undefined,
            }}
          >
            {/* 1. Glass Box Container - ALWAYS overflow-hidden */}
            <div
              className={`relative w-10 h-14 min-[360px]:w-11 min-[360px]:h-16 sm:w-14 sm:h-20 rounded-xl min-[360px]:rounded-2xl flex items-center justify-center overflow-hidden select-none transition-all duration-300 ${
                isVibrating
                  ? "border-rose-500 shadow-[0_0_25px_rgba(244,63,94,0.6),inset_0_1px_1px_rgba(255,255,255,0.6)]"
                  : isCurrentActive
                  ? "border-sky-400 shadow-[0_0_25px_rgba(56,189,248,0.4),inset_0_1px_1px_rgba(255,255,255,0.7)]"
                  : "border-white/20 hover:border-white/35 shadow-[0_12px_25px_-5px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.4)]"
              }`}
              style={{
                // Frosted glass appearance with error tint if vibrating
                background: isVibrating
                  ? "linear-gradient(145deg, rgba(80, 20, 30, 0.75) 0%, rgba(30, 10, 15, 0.9) 100%)"
                  : "linear-gradient(145deg, rgba(32, 38, 52, 0.72) 0%, rgba(16, 20, 30, 0.88) 100%)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                border: isVibrating
                  ? "2px solid rgba(244, 63, 94, 0.85)"
                  : isCurrentActive
                  ? "2px solid rgba(56, 189, 248, 0.85)"
                  : "2px solid rgba(255, 255, 255, 0.24)",
                boxShadow: isVibrating
                  ? "inset 0 1px 1px 0 rgba(255, 255, 255, 0.6), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.4), 0 0 25px rgba(244, 63, 94, 0.45)"
                  : "inset 0 1px 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.4), 0 12px 25px -5px rgba(0, 0, 0, 0.6)",
              }}
            >
              {/* Curved Glass Specular Highlight Dome */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 via-white/5 to-transparent rounded-t-[inherit]" />

              {/* Glass Sheen */}
              <div className="pointer-events-none absolute -inset-full w-[250%] h-[250%] -rotate-45 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent translate-x-[-80%] hover:translate-x-[40%] transition-transform duration-1000 ease-out" />

              {/* High-Visibility Magic UI Border Beam ONLY on active box */}
              {isCurrentActive && (
                <BorderBeam
                  size={46}
                  duration={3}
                  colorFrom="#38bdf8"
                  colorTo="#c084fc"
                  borderWidth={2.4}
                />
              )}

              {/* The OTP Input Digit */}
              <input
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                autoComplete="one-time-code"
                maxLength={1}
                value={digit}
                disabled={isPushedOut || isGatesClosed}
                onFocus={() => setFocusedIndex(index)}
                onBlur={() => setFocusedIndex(null)}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`relative z-10 w-full h-full text-center font-mono text-xl min-[360px]:text-2xl sm:text-3xl font-bold bg-transparent outline-none caret-sky-400 select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] touch-manipulation ${
                  isVibrating ? "text-rose-200" : "text-white"
                }`}
              />

              {/* Individual Rocket Launch Pod Blast Doors for this Box */}
              <BoxGateDoors isClosed={isGatesClosed} />
            </div>

            {/* 2. Rocket Thruster Nozzle & Flame (Ignites when launched) */}
            {isPushedOut && (
              <div className="pointer-events-none absolute top-[calc(100%-2px)] left-1/2 -translate-x-1/2 animate-thruster origin-top z-30">
                <RocketThruster />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default GlassOtpBoxes;
