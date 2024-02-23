/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        cairo: ["Cairo", "sans-serif"],
      },
      colors: {
        valhalla: {
          50: "#ecefff",
          100: "#dce1ff",
          200: "#bfc6ff",
          300: "#99a1ff",
          400: "#7271ff",
          500: "#5d4fff",
          600: "#5130fb",
          700: "#4524de",
          800: "#3820b3",
          900: "#31238c",
          950: "#1e1450",
        },
      },
    },
    keyframes: {
      loading: {
        "0%": { transform: "translateX(-100%);" },
        "100%": { transform: "translateX(100%);" },
      },
    },
    animation: {
      loading: "loading 1s ease-in-out infinite",
    },
   
  },
  plugins: [],
};
