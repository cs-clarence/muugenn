import React, { useEffect, useState } from "react";
import Slider from "./partials/Slider";
import cn from "classnames";
import { clamp } from "lodash";

type Props = {
  open?: boolean;
  src: string;
  alt?: string;
  onClose?: (close: boolean) => void;
};

const minZoom = 25;
const maxZoom = 200;

function ImageViewer({ src, open, onClose, alt }: Props) {
  const [zoom, setZoom] = useState(75);
  const [rotation, setRotation] = useState(0);
  const imageStyle = {
    transform: `rotate(${rotation}deg) scale(${zoom / 100}, ${zoom / 100})`,
  };
  // console.log(imageStyle);
  useEffect(() => {
    setZoom(75);
    setRotation(0);
  }, [open]);
  return (
    <>
      {open && (
        <div
          className={cn(
            `fixed top-0 left-0 bg-white dark:bg-black bg-opacity-80 w-full h-full z-50`
          )}
        >
          <img
            src={src}
            alt={alt}
            className={`object-contain w-full h-full object-center absolute 
            transition-transform transform ease-in-out`}
            style={imageStyle}
          ></img>
          <div className="absolute w-full h-full flex-col flex justify-end items-center">
            <div className="h-12 bg-white dark:bg-gray-800 inline-flex flex-row justify-center items-center p-3 rounded-lg">
              <span
                className={cn(`fas fa-search-minus mx-2 fa-lg cursor-pointer`, {
                  "pointer-events-none opacity-50": zoom <= minZoom,
                })}
                onClick={() =>
                  setZoom((prev) => clamp(prev - 25, minZoom, maxZoom))
                }
                title="zoom by -25%"
              ></span>
              {false && (
                <div className="h-4 w-44">
                  <Slider
                    min={minZoom}
                    max={maxZoom}
                    value={zoom}
                    onChange={setZoom}
                  />
                </div>
              )}
              <span
                className={cn(`fas fa-search-plus mx-2 fa-lg cursor-pointer`, {
                  "pointer-events-none opacity-50": zoom >= maxZoom,
                })}
                onClick={() =>
                  setZoom((prev) => clamp(prev + 25, minZoom, maxZoom))
                }
                title="zoom by 25%"
              ></span>

              <span
                className={`fas fa-undo mx-2 fa-lg cursor-pointer`}
                onClick={() => setRotation((prev) => prev - 90)}
                title="rotate by -90 degrees"
              ></span>
              <span
                className={`fas fa-redo mx-2 fa-lg cursor-pointer`}
                onClick={() => {
                  console.log("rotate");
                  setRotation((prev) => prev + 90);
                }}
                title="rotate by 90 degrees"
              ></span>
            </div>
          </div>
          <span
            className="fas fa-times mx-2 fa-3x cursor-pointer absolute right-3 top-3"
            onClick={() => onClose?.(true)}
          ></span>
        </div>
      )}
    </>
  );
}

export { ImageViewer as default };
