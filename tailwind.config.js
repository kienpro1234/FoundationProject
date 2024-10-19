/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "about-values-img":
          "url('https://static.tastykitchen.vn/images/pc/bg-about.jpg')",
      },
      screens: {
        md: "770px",
      },
    },
  },
  plugins: [],
};
