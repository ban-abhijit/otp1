import React, { useState } from "react";
import GlassOtpBoxes from "./components/GlassOtpBoxes";
import GlassVerifyButton, {
  playLiftoffWhooshSound,
  playErrorBuzzerSound,
  playGateSealSound,
} from "./components/GlassVerifyButton";
import InterstellarBackground from "./components/InterstellarBackground";

export function App() {
  // Correct OTP is 286363 (pre-filled so you can test correct launch or edit any digit to test vibration)
  const [otp, setOtp] = useState(["2", "8", "6", "3", "6", "3"]);
  const [isGatesClosed, setIsGatesClosed] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVibrating, setIsVibrating] = useState(false);

  const CORRECT_OTP = "286363";

  const handleVerify = () => {
    // If already launched or gates closed, click resets the scene
    if (isLaunching || isGatesClosed) {
      setIsLaunching(false);
      setIsGatesClosed(false);
      setIsLoading(false);
      return;
    }

    const enteredOtp = otp.join("");

    // 1. If OTP is incorrect, trigger vibration & error buzzer
    if (enteredOtp !== CORRECT_OTP) {
      playErrorBuzzerSound();
      setIsVibrating(true);
      setTimeout(() => setIsVibrating(false), 520);
      return;
    }

    // 2. Correct OTP (286363): Sequence liftoff!
    // Step 1: Gates on all 6 individual boxes slide shut
    playGateSealSound();
    setIsGatesClosed(true);

    // Step 2: As soon as gates lock shut (~480ms), ignite rocket thrusters & liftoff!
    setTimeout(() => {
      playLiftoffWhooshSound();
      setIsLaunching(true);
      setIsLoading(true);
    }, 480);
  };

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#020205] flex flex-col items-center justify-center px-3 py-6 sm:p-6 overflow-hidden select-none">
      {/* 1. Deep Space Starfield & Nebulae Background */}
      <InterstellarBackground />

      {/* 2. Main Glass Authentication Card Floating in Orbit */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-lg px-2 sm:px-0">
        {/* The 6 Frosted Glass OTP Boxes:
            - Arranged in a symmetrical parabola crown over the button
            - Vibrates on wrong OTP with red warning glow
            - Individual rocket blast doors seal shut over each box
            - Rockets take off into 6 omnidirectional curved paths on correct OTP (286363) */}
        <GlassOtpBoxes
          otp={otp}
          setOtp={setOtp}
          isPushedOut={isLaunching}
          isGatesClosed={isGatesClosed}
          isVibrating={isVibrating}
          onEnter={handleVerify}
        />

        {/* The Glass Verify Button (Expands 1.2x and centers only when Loading) */}
        <GlassVerifyButton
          isLoading={isLoading}
          onClick={handleVerify}
        />
      </div>
    </div>
  );
}

export default App;
