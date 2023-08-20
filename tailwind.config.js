import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "1000px",
      // => @media (min-width: 640px) { ... }

      md: "1056px",
      // => @media (min-width: 768px) { ... }
    },
  },
  plugins: [daisyui],
};
