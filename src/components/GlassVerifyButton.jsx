import React from "react";
import BorderBeam from "./BorderBeam";

/**
 * Web Audio API synthesizer for hydraulic gate seal (metallic thud + pneumatic hiss)
 */
export function playGateSealSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    // 1. Deep metallic thud (low sine + impact)
    const thudOsc = ctx.createOscillator();
    const thudGain = ctx.createGain();
    thudOsc.type = "sine";
    thudOsc.frequency.setValueAtTime(80, ctx.currentTime);
    thudOsc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.3);
    thudGain.gain.setValueAtTime(0.5, ctx.currentTime);
    thudGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    thudOsc.connect(thudGain);
    thudGain.connect(ctx.destination);
    thudOsc.start();
    thudOsc.stop(ctx.currentTime + 0.35);

    // 2. Pneumatic hiss (filtered noise)
    const bufferSize = Math.floor(ctx.sampleRate * 0.6);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const hissFilter = ctx.createBiquadFilter();
    hissFilter.type = "highpass";
    hissFilter.frequency.setValueAtTime(3000, ctx.currentTime);
    hissFilter.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.5);
    const hissGain = ctx.createGain();
    hissGain.gain.setValueAtTime(0.01, ctx.currentTime);
    hissGain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.08);
    hissGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55);
    noise.connect(hissFilter);
    hissFilter.connect(hissGain);
    hissGain.connect(ctx.destination);
    noise.start();

    // 3. Metallic clank at seal point (delayed 0.5s)
    const clankOsc = ctx.createOscillator();
    const clankGain = ctx.createGain();
    clankOsc.type = "square";
    clankOsc.frequency.setValueAtTime(220, ctx.currentTime + 0.5);
    clankOsc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.58);
    clankGain.gain.setValueAtTime(0, ctx.currentTime);
    clankGain.gain.setValueAtTime(0.3, ctx.currentTime + 0.5);
    clankGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.62);
    clankOsc.connect(clankGain);
    clankGain.connect(ctx.destination);
    clankOsc.start(ctx.currentTime + 0.5);
    clankOsc.stop(ctx.currentTime + 0.62);
  } catch {
    // Autoplay fallback
  }
}

/**
 * Web Audio API synthesizer for error vibration buzzer on wrong OTP
 */
export function playErrorBuzzerSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    // Double buzz pulse (sawtooth at 145Hz)
    [0, 0.18].forEach((startTime) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(145, ctx.currentTime + startTime);
      osc.frequency.linearRampToValueAtTime(120, ctx.currentTime + startTime + 0.12);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.setValueAtTime(0.35, ctx.currentTime + startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + startTime);
      osc.stop(ctx.currentTime + startTime + 0.12);
    });
  } catch {
    // Autoplay fallback
  }
}

/**
 * Web Audio API synthesizer for rocket thruster ignition & ascending whoosh sweep (tuned to 2.9s flight)
 */
export function playLiftoffWhooshSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    // 1. Crystal confirmation chime
    const chimeOsc = ctx.createOscillator();
    const chimeGain = ctx.createGain();
    chimeOsc.type = "sine";
    chimeOsc.frequency.setValueAtTime(587.33, ctx.currentTime);
    chimeOsc.frequency.exponentialRampToValueAtTime(1174.66, ctx.currentTime + 0.14);
    chimeGain.gain.setValueAtTime(0.35, ctx.currentTime);
    chimeGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
    chimeOsc.connect(chimeGain);
    chimeGain.connect(ctx.destination);
    chimeOsc.start();
    chimeOsc.stop(ctx.currentTime + 0.22);

    // 2. Rocket thruster ignition kick
    const kickOsc = ctx.createOscillator();
    const kickGain = ctx.createGain();
    kickOsc.type = "triangle";
    kickOsc.frequency.setValueAtTime(120, ctx.currentTime);
    kickOsc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.25);
    kickGain.gain.setValueAtTime(0.5, ctx.currentTime);
    kickGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
    kickOsc.connect(kickGain);
    kickGain.connect(ctx.destination);
    kickOsc.start();
    kickOsc.stop(ctx.currentTime + 0.25);

    // 3. Ascending energetic rocket thrust whoosh sweep (extended to 2.9s)
    const bufferSize = Math.floor(ctx.sampleRate * 2.9);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(260, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(2200, ctx.currentTime + 1.2);
    filter.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 2.9);
    filter.Q.setValueAtTime(2.6, ctx.currentTime);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.01, ctx.currentTime);
    noiseGain.gain.linearRampToValueAtTime(0.65, ctx.currentTime + 0.4);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.9);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start();
  } catch {
    // Autoplay restrictions fallback
  }
}

export const GlassVerifyButton = ({
  isLoading,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`relative z-30 inline-flex items-center justify-center overflow-hidden cursor-pointer transition-all duration-700 ease-out active:scale-[0.985] focus:outline-none hover:shadow-[0_0_45px_rgba(56,189,248,0.35),0_20px_50px_rgba(0,0,0,0.55)] shadow-[0_20px_50px_rgba(0,0,0,0.55),inset_0_1px_1px_rgba(255,255,255,0.45)] touch-manipulation ${
        isLoading
          ? "w-full max-w-[340px] min-[360px]:max-w-[390px] sm:max-w-[470px] h-[92px] min-[360px]:h-[104px] sm:h-[126px] rounded-[26px] min-[360px]:rounded-[30px] sm:rounded-[38px] -translate-y-8 sm:-translate-y-[60px]"
          : "w-full max-w-[280px] min-[360px]:max-w-[320px] sm:max-w-[390px] h-[76px] min-[360px]:h-[88px] sm:h-[105px] rounded-[22px] min-[360px]:rounded-[26px] sm:rounded-[32px] translate-y-0"
      }`}
      style={{
        // Deep dark frosted glass
        background: "linear-gradient(180deg, rgba(34, 38, 50, 0.78) 0%, rgba(18, 21, 28, 0.9) 100%)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        border: "2.5px solid rgba(255, 255, 255, 0.28)",
        boxShadow:
          "inset 0 1px 1px 0 rgba(255, 255, 255, 0.55), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.5), 0 24px 50px -10px rgba(0, 0, 0, 0.7)",
      }}
    >
      {/* 1. Curved Glass Specular Highlight Dome */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 via-white/5 to-transparent rounded-t-[inherit]" />

      {/* 2. Glass Sheen Reflection */}
      <div className="pointer-events-none absolute -inset-full w-[250%] h-[250%] -rotate-45 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent translate-x-[-80%] hover:translate-x-[40%] transition-transform duration-1000 ease-out" />

      {/* 3. Magic UI Border Beam - ONLY shown in Loading State */}
      {isLoading && (
        <BorderBeam
          size={160}
          duration={5}
          colorFrom="#38bdf8"
          colorTo="#c084fc"
          borderWidth={3}
          reverse={false}
        />
      )}

      {/* 4. Button Content: "Verify" -> "Loading..." with Buffering SVG */}
      <div className="relative z-10 flex items-center justify-center transition-all duration-300">
        {!isLoading ? (
          /* Initial State: Verify (Original 1.0x Size) */
          <span className="text-white font-sans text-xl min-[360px]:text-2xl sm:text-3xl font-extrabold tracking-widest uppercase select-none transition-all duration-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)] hover:text-white">
            Verify
          </span>
        ) : (
          /* Transformed State: Loading (Expanded 1.2x Size with BorderBeam & Buffering SVG) */
          <div className="flex items-center justify-center gap-3 sm:gap-4 text-white transition-all duration-300 animate-in fade-in zoom-in-95">
            {/* Buffering SVG Spinner */}
            <svg
              className="animate-spin w-6 h-6 min-[360px]:w-7 min-[360px]:h-7 sm:w-9 sm:h-9 text-sky-400 drop-shadow-[0_0_12px_rgba(56,189,248,0.85)]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-20"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3.5"
              />
              <path
                className="opacity-95"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>

            {/* Loading Text */}
            <span className="text-white font-sans text-2xl min-[360px]:text-3xl sm:text-4xl font-bold tracking-wider select-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
              Loading<span className="inline-block animate-pulse">...</span>
            </span>
          </div>
        )}
      </div>
    </button>
  );
};

export default GlassVerifyButton;
