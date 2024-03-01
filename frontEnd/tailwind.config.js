import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export const darkMode = "media";
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {},
};
export const plugins = [
  nextui({
    themes: {
      light: {
        layout: {},
        colors: {
          beige: "#E5D9B6",
          azul: "#1C2833",
          gris: "#333333",
        },
      },
      dark: {
        layout: {},
        colors: {
          azulOscuro: "#34495E",
          secondary: "#285430",
        },
      },
    },
  }),
];
