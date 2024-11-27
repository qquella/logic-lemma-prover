/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all source files in your React project
    "./public/index.html", // Include the public HTML file
  ],
  theme: {
    extend: {
      colors: {
        pumpkin: {
          DEFAULT: "#fa7921",
          100: "#fee4d2",
          200: "#fdc8a5",
          300: "#fcad78",
          400: "#fb924b",
          500: "#fa7921",
          600: "#dc5b04",
          700: "#a54403",
          800: "#6e2d02",
          900: "#371701",
        },
        steel_blue: {
          DEFAULT: "#2d82b7",
          100: "#d2e7f4",
          200: "#a5cfe9",
          300: "#78b7de",
          400: "#4a9fd3",
          500: "#2d82b7",
          600: "#246994",
          700: "#1b4f6f",
          800: "#12344a",
          900: "#091a25",
        },
        jet: {
          DEFAULT: "#353238",
          100: "#d7d4d9",
          200: "#aeaab3",
          300: "#867f8d",
          400: "#5e5863",
          500: "#353238",
          600: "#2b282d",
          700: "#201e22",
          800: "#151417",
          900: "#0b0a0b",
        },
        papaya_whip: {
          DEFAULT: "#fdf0d5",
          100: "#fffcf6",
          200: "#fef9ed",
          300: "#fef5e5",
          400: "#fdf2dc",
          500: "#fdf0d5",
          600: "#f9cf7b",
          700: "#f5ae22",
          800: "#b17908",
          900: "#593c04",
        },
        hot_pink: {
          DEFAULT: "#f564a9",
          100: "#fde0ee",
          200: "#fbc2dd",
          300: "#f9a3cd",
          400: "#f784bc",
          500: "#f564a9",
          600: "#f12487",
          700: "#c40c65",
          800: "#820843",
          900: "#410422",
        },
      },
    },
  },
  plugins: [],
};
