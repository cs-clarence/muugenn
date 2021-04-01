module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === "production",
    preserveHtmlElements: true,
    layers: ["components", "utilities", "base"],
    content: [
      "./src/**/*.js",
      "./src/**/*.jsx",
      "./src/**/*.ts",
      "./src/**/*.tsx",
      "./src/**/*.vue",
      "./src/**/*.ejs",
    ],
  },
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ["disabled"],
      opacity: ["disabled"],
    },
  },
  plugins: [],
};
