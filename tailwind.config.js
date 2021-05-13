module.exports = {
  mode: "jit",
  purge: {
    enabled: process.env.NODE_ENV === "production",
    preserveHtmlElements: true,
    layers: ["components", "utilities", "base"],
    content: [
      "./src/**/*.js",
      "./src/**/*.html",
      "./src/**/*.jsx",
      "./src/**/*.ts",
      "./src/**/*.tsx",
      "./src/**/*.vue",
      "./src/**/*.ejs",
      "./public/**/*.html",
    ],
  },
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ["disabled", "active"],
      backgroundOpacity: ["disabled", "active"],
      opacity: ["disabled", "active"],
    },
  },
  plugins: [],
};
