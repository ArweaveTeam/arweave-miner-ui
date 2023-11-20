/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./renderer/pages/**/*.{js,ts,jsx,tsx}", "./renderer/components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderWidth: {
        DEFAULT: "0.2px",
      },
    },
  },
  plugins: [],
};
