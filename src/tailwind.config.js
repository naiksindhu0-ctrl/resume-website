/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        indigo: {
          DEFAULT: "#635BFF",
        },
        cyan: {
          DEFAULT: "#00CFFF",
        },
      },
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "slide-up": "slide-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "pulse-slow": "pulse-slow 6s ease-in-out infinite",
        "pulse-slower": "pulse-slower 8s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
      },
      keyframes: {
        "slide-up": {
          from: { opacity: 0, transform: "translateY(24px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: 0.08, transform: "scale(1)" },
          "50%": { opacity: 0.15, transform: "scale(1.05)" },
        },
        "pulse-slower": {
          "0%, 100%": { opacity: 0.06, transform: "scale(1)" },
          "50%": { opacity: 0.12, transform: "scale(1.08)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      transitionDuration: {
        400: "400ms",
      },
    },
  },
  plugins: [],
};