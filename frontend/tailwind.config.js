/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        redMain: "#FF3131",
        backgroundColor: "#1f2937",
      },
      fontFamily: {
        rajdhani: ["Rajdhani", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
