import React from "react";
import ImageFeed from "../../pages/Feed";

function Main() {
  return (
    <main className="flex-grow">
      <div className="container mx-auto">
        <ImageFeed></ImageFeed>
      </div>
    </main>
  );
}

export { Main as default };
