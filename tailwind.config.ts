import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff9e8",
          100: "#ffefbd",
          300: "#ffd56b",
          400: "#f8bf44",
          500: "#fcb92d",
          600: "#e59d11",
          900: "#3a2507"
        },
        ink: "#181818",
        mist: "#f8f9fa",
        leaf: "#2f7d4a"
      },
      boxShadow: {
        soft: "0 14px 40px rgba(24, 24, 24, 0.09)",
        drawer: "0 24px 80px rgba(0, 0, 0, 0.22)"
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease both",
        "slide-in": "slideIn 0.28s ease both",
        "toast-in": "toastIn 0.26s ease both",
        "hero-cycle": "heroCycle 15s infinite"
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        slideIn: {
          "0%": { opacity: "0", transform: "translateX(28px)" },
          "100%": { opacity: "1", transform: "translateX(0)" }
        },
        toastIn: {
          "0%": { opacity: "0", transform: "translate(-50%, 18px)" },
          "100%": { opacity: "1", transform: "translate(-50%, 0)" }
        },
        heroCycle: {
          "0%, 28%": { opacity: "1", transform: "scale(1)" },
          "34%, 94%": { opacity: "0", transform: "scale(1.03)" },
          "100%": { opacity: "1", transform: "scale(1)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
