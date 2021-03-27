import React from "react";
import Header from "./partials/Header";
import Main from "./partials/Main";
import Footer from "./partials/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header></Header>
      <Main></Main>
      <Footer></Footer>
    </div>
  );
}

export default App;
