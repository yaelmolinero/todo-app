/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#171717",   // neutral-900
          dark: "#f5f5f5"     // neutral-100
        },
        secondary: {
          light: "#262626",   // neutral-800
          dark: "#d4d4d4"     // neutral-300
        },
        placeholder: {
          light: "#404040",   // neutral-700
          dark: "#a3a3a3"     // neutral-400
        },
        border: {
          light: "#d4d4d4",   // neutral-300
          dark: "#262626"     // neutral-800
        },
        bg: {
          light: "#f5f5f5",   // neutral-100
          dark: "#0a0a0a"     // neutral-950
        },
        bgSecondary: {
          light: "#e5e5e5",   // neutral-200
          dark: "#171717"     // neutral-900
        },
        bgTertiary: {
          light: "#d4d4d4",   // neutral-300
          dark: "#262626"     // neutral-800
        },
        input: {
          light: "#d4d4d4",   // neutral-300
          dark: "#262626"     // neutral-800
        }
      },
      dropShadow: {
        icon: "0 0 6px rgba(220, 38, 38, 0.90)"
      }
    },
  },
  plugins: [],
}

