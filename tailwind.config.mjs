/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#bcee45",
        background: "#000000",
        foreground: "#ffffff",
        muted: {
          DEFAULT: "#171717",
          foreground: "#a3a3a3",
        },
        card: {
          DEFAULT: "#111111",
          foreground: "#ffffff",
        },
        border: "#262626",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default tailwindConfig;
