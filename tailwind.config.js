/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "375px", // Add extra-small screen
      },
      fontFamily: {
        sourceSans3: ["'Source Sans 3'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
