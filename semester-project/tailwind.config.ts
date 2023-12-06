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
        inter: ["var(--font-inter)"],
        roboto: ["var(--font-roboto)"],
        pacifico: ["var(--font-pacifico)"]
      },
      colors: {
        "primary-brown": {
          50: "#F3ECEA",
          100: "#DBC3BF",
          200: "#C9A6A0",
          300: "#B17E74",
          400: "#A16559",
          500: "#8A3E30",
          600: "#72E82C",
          700: "#622C22",
          800: "#4C221A",
          900: "#3A1A14",
        },
        "secondary-brown": {
          50: "#F6F0EE",
          100: "#E3D0CB",
          200: "#D6BAB1",
          300: "#C39A8E",
          400: "#B88678",
          500: "#A66856",
          600: "#975F4E",
          700: "#764A3D",
          800: "#5B392F",
          900: "#462C24",
        },
        "primary-beige": {
          50: "#FFFCF6",
          100: "#FFF5E4",
          200: "#FFF0D7",
          300: "#FFE9C5",
          400: "#FFE5BA",
          500: "#FFDEA9",
          600: "#E8CA9A",
          700: "#B59E78",
          800: "#8C7A5D",
          900: "#6B5D47",
        },
        "primary-grey": {
          50: "#EEEEEE",
          100: "#CCCCCC",
          200: "#B3B3B3",
          300: "#909090",
          400: "#7A7A7A",
          500: "#595959",
          600: "#515151",
          700: "#3F3F3F",
          800: "#313131",
          900: "#252525",
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