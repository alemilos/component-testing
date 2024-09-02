/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        redLight: "rgba(240, 58, 61, 1)",
        redLight10: "rgba(240, 58, 61, 0.1)",
        redLight40: "rgba(240, 58, 61, 0.4)",
        redLight70: "rgba(240, 58, 61, 0.7)",
        redLight80: "rgba(240, 58, 61, 0.8)",
        primary: "#1E1E1E",
      },
    },
  },
  plugins: [],
};
