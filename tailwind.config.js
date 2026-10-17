/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
        "glass-shake": "glass-shake 0.35s cubic-bezier(.36,.07,.19,.97) both",
      },
      keyframes: {
        "border-beam": {
          "100%": {
            offsetDistance: "100%",
          },
        },
        "glass-shake": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "20%": { transform: "translate(-3px, 2px) scale(0.98)" },
          "40%": { transform: "translate(3px, -2px) scale(0.99)" },
          "60%": { transform: "translate(-2px, -1px) scale(0.995)" },
          "80%": { transform: "translate(1px, 1px) scale(1)" },
        },
      },
    },
  },
  plugins: [],
}
