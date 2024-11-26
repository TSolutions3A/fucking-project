/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light_blue: "#9EB4FF",
        dark_blue: "#0F42F2",
        light_yellow: "#FFF483",
        dark_yellow: "#F9E727",
        dark_lime: "#CBFB45",
      },
      maxWidth: {
        "8xl": "95rem",
      },
      keyframes: {
        pulse: {
          "0%": {
            color: "rgb(238, 75, 43)",
          },
          "33%": {
            color: "rgb(255, 234, 0)",
          },
          "66%": {
            color: "rgb(0, 150, 255)",
          },
          "100%": {
            color: "rgb(238, 75, 43)",
          },
        },
        scrollCards: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        pulse: "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        scrollCards: "scrollCards 20s linear infinite",
      },
    },
  },
  plugins: [],
};
