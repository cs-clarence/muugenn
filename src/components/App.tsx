import React from "react";
import Header from "./partials/Header";
import Main from "./partials/Main";
import Footer from "./partials/Footer";

type Props = {
  className?: string | object;
};

class App extends React.Component<Props> {
  constructor(public props: Props) {
    super(props);
  }
  render() {
    return (
      <div className="min-h-screen flex flex-col">
        <Header></Header>
        <Main></Main>
        <Footer></Footer>
      </div>
    );
  }
}

export default App;
