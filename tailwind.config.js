module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      inset: {
        30: "7.6rem",
        18: "4.5rem",
      },
      screens: {
        mobi: "560px",
        // => @media (min-width: 560px) { ... }
      },
      lineHeight: {
        "4-5": "1.125rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
