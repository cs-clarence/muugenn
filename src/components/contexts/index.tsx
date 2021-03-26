import React from "react";

const themes = {
  dark: {
    foreground: "#000000",
    background: "#ffffff",
  },
  light: {
    foreground: "#000000",
    background: "#ffffff",
  },
};

export const ThemeContext = React.createContext(themes.dark);
