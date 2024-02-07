const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "media",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          layout: {},
          colors: {
            beige: "#E5D9B6",
            azul: "#E6F7FF",
            gris: "#333333",
          },
        },
        dark: {
          layout: {},
          colors: {
            beige: "#E5D9B6",
            secondary: "#285430",
          },
        },
      },
    }),
  ],
};
