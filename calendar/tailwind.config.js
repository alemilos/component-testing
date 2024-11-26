/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        full: "0 0 20px 1px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
};
