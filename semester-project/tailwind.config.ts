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
        inter: ["var(--font-inter)"]
      },
      colors: {
        "primary-purple": {
          50: "#EAE6ED",
          100: "#BCB1C8",
          200: "#9C8BAD",
          300: "#6F5588",
          400: "#533571",
          500: "#28024D",
          600: "#240246",
          700: "#1C0137",
          800: "#16012A",
          900: "#110120",
        },
        "secondary-purple": {
          50: "#EFE6FD",
          100: "#CEB0FA",
          200: "#B78AF7",
          300: "#9654F4",
          400: "#8133F1",
          500: "#6200EE",
          600: "#5900D9",
          700: "#4600A9",
          800: "#360083",
          900: "#290064",
        },
        "primary-violet": {
          50: "#FAF5FE",
          100: "#F0E0FD",
          200: "#E8D1FC",
          300: "#DEBDFA",
          400: "#D7B0F9",
          500: "#CD9CF8",
          600: "#BB8EE2",
          700: "#926FB0",
          800: "#715688",
          900: "#564268",
        },
        "primary-white": {
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#FFFFFF",
          300: "#FFFFFF",
          400: "#FFFFFF",
          500: "#FFFFFF",
          600: "#E8E8E8",
          700: "#B5B5B5",
          800: "#8C8C8C",
          900: "#6B6B6B",
        }
      },
    },
  },
  plugins: [],
};
export default config;