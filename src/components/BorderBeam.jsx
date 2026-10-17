import React from "react";

/**
 * BorderBeam component inspired by Magic UI
 * https://magicui.design/docs/components/border-beam
 */
export const BorderBeam = ({
  className = "",
  size = 100,
  duration = 6,
  borderWidth = 2.5,
  anchor = 90,
  colorFrom = "#38bdf8", // Vibrant Cyan
  colorTo = "#c084fc",   // Radiant Violet
  delay = 0,
  reverse = false,
  style = {},
}) => {
  return (
    <div
      style={{
        "--size": size,
        "--duration": duration,
        "--anchor": anchor,
        "--border-width": borderWidth,
        "--color-from": colorFrom,
        "--color-to": colorTo,
        "--delay": `-${delay}s`,
        ...style,
      }}
      className={`pointer-events-none absolute inset-0 rounded-[inherit] [border:calc(var(--border-width)*1px)_solid_transparent] ![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)] [-webkit-mask-composite:destination-in] ${className}`}
    >
      <div
        className={`absolute aspect-square w-[calc(var(--size)*1px)] filter drop-shadow-[0_0_8px_var(--color-from)] ${
          reverse
            ? "bg-gradient-to-r from-[var(--color-from)] via-[var(--color-to)] to-transparent [offset-anchor:0%_50%]"
            : "bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent [offset-anchor:100%_50%]"
        } [offset-path:rect(0_auto_auto_0_round_calc(var(--size)*1px))]`}
        style={{
          animation: `border-beam calc(var(--duration)*1s) linear infinite ${reverse ? "reverse" : "normal"}`,
          animationDelay: "var(--delay)",
        }}
      />
    </div>
  );
};

export default BorderBeam;
