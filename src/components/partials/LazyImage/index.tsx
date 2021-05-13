import React, { useState } from "react";
import Spinner from "./three-dots.svg";
import cn from "classnames";

type Props = { src: string; alt?: string; load?: boolean };

function LazyImage({
  src = "https://myenglishmatters.com/wp-content/uploads/2020/11/placeholder.png",
  alt,
  load,
}: Props) {
  const [hideLoader, setHideLoader] = useState(false);
  function handeImageLoad() {
    setHideLoader(true);
  }

  return (
    <div className="relative overflow-hidden h-full w-full">
      <div
        className={cn(
          "z-10",
          "w-full",
          "h-full",
          "absolute",
          "bg-blue-300",
          "dark:bg-gray-900",
          "flex",
          "flex-row",
          "justify-center",
          "items-center",
          "duration-500",
          "ease-in-out",
          "transform",
          "translate-y-0",
          "transition-transform",
          { "-translate-y-full": hideLoader }
        )}
      >
        <img
          src={Spinner}
          alt="spinner"
          className="object-cover object-center w-20"
        />
      </div>
      {load && (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover object-center"
          onLoad={handeImageLoad}
        />
      )}
    </div>
  );
}

export { LazyImage as default };
