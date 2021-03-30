import React from "react";
import Header from "./partials/Header";
import Main from "./partials/Main";
import Footer from "./partials/Footer";
import { SettingsProvider } from "./contexts/settings-context";

function App() {
  return (
    <SettingsProvider>
      <div className="min-h-screen flex flex-col">
        <Header></Header>
        <Main></Main>
        <Footer></Footer>
      </div>
    </SettingsProvider>
  );
}

export default App;
