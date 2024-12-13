/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: "#4364b7",
        "accent-hover": "#3a5193",
        "accent-hover-light": "#e2ebf7",
        bg: "#f1f1f1",
        text: "#363636",
        "sec-text": "#828282",
      },
      fontFamily: {
        poppins: ["Poppins"],
      },
    },
  },
  plugins: [],
};
