import React from "react";
import ImageFeed from "../../pages/Feed";

class Main extends React.Component {
  render() {
    return (
      <main className="flex-grow">
        <div className="container mx-auto">
          <ImageFeed></ImageFeed>
        </div>
      </main>
    );
  }
}

export { Main as default };
