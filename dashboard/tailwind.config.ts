import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        "gradient-morph": "gradient-morph 5s ease infinite",
      },
      keyframes: {
        "gradient-morph": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      transitionProperty: {
        "min-height": "min-height",
        opacity: "opacity",
      },
      colors: {
        primary: "#1D9ECD",
        secondary: "#1c1d1d",
        success: "#219653",
        danger: "#D34053",
        warning: "#FFA70B",
        pure_black: "#040537",
        menu_black: "#282528",
      },
    },
  },
  plugins: [],
};
export default config;
