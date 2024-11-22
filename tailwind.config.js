/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "about-values-img": "url('https://static.tastykitchen.vn/images/pc/bg-about.jpg')",
      },
      screens: {
        bmd: "567px",
        md: "770px",
      },
      boxShadow: {
        1: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
      },
      colors: {
        "pink-red": "rgb(245, 245, 220)",
      },
    },
  },
  plugins: [],
};
