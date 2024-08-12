import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["var(--font-roboto)"]
      },
      colors: {
        "base-colors": {
          50: "#FFFFFF",
          100: "#F3F3F3",
          200: "#1C1C1C",
          300: "#C9313B",
          400: "#334155"
        },
        "navbar-palette": {
          50: "#C21106",
          100: "#D6551C",
          200: "#EB8A29",
          300: "#84AB87",
          400: "#68B35F",
          500: "#318959",
          600: "#39635A",
          700: "#527FBE",
          800: "#71A1D4",
          900: "#95C8DB",
        }
      },
      flexGrow: {
        8: "8",
      },
    },
  },
  plugins: [],
};

export default config;