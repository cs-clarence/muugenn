import React from "react";

type Props = {};

function Footer(props: Props) {
  return (
    <footer className="h-20 bg-blue-300 dark:bg-gray-700">
      <div className="container mx-auto h-full flex-col flex justify-center items-center">
        <p className="text-sm">© {new Date().getFullYear()} - Muugenn</p>
        <p className="text-sm">Created by Clarence Manuel</p>
      </div>
    </footer>
  );
}

export { Footer as default };
