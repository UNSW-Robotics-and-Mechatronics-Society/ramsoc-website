import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./documentation/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          "50": "#effcfc",
          "100": "#d5f4f8",
          "200": "#b1e9f0",
          "300": "#7ad7e6",
          "400": "#3dbcd3",
          "500": "#21a0b9",
          "600": "#1e809c",
          "700": "#1f687f",
          "800": "#225568",
          "900": "#204859",
          "950": "#0d2631",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
      screens: {
        xs: "425px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
