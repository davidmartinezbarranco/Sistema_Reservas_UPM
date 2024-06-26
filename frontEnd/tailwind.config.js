import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export const darkMode = "media";
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    backgroundImage: {
      "custom-light": "url('/fondo_azul.jpg')",
      "custom-dark": "url('/fondo_azul.jpg')",
      azul: "url('/fondo_azul.jpg')", // Añade tu imagen azul aquí
    },
    colors: {
      azul: "#9FABD6",
    },
  },
};
export const plugins = [
  nextui({
    themes: {
      light: {
        layout: {
          backgroundColor: "var(--tw-bg-azul)",
        },
        colors: {
          beige: "#E5D9B6",
          azul: "#9FABD6",
          gris: "#333333",
        },
      },
      dark: {
        layout: {
          backgroundColor: "var(--tw-bg-azul)", // Asegúrate de usar la misma variable para ambos modos si quieres mantener el mismo fondo
        },
        colors: {
          azulOscuro: "#34495E",
          secondary: "#285430",
        },
      },
    },
  }),
];
