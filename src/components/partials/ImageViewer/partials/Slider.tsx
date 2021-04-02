import React, { useEffect } from "react";

type Props = {
  min: number;
  max: number;
  value?: number;
  onChange?: (val: number) => void;
};

let isClicking = false;
let slideContainer: HTMLElement | null;

function getPercentFromMixMax(min: number, max: number, val: number) {
  console.log(
    `min: ${min} max: ${max} value: ${val} result: ${
      ((val - min) / (max - min)) * 100
    }`
  );
  return ((val - min) / (max - min)) * 100;
}

function Slider({ min, max, value, onChange }: Props) {
  useEffect(() => {
    slideContainer = document.querySelector("#slider-container");
    document.addEventListener("mouseup", () => (isClicking = false));
  }, []);

  return (
    <div
      id="slider-container"
      className="h-full w-full relative flex-col flex justify-center"
      onMouseDown={(ev) => {
        onChange?.(
          (getPercentFromMixMax(
            0,
            slideContainer?.offsetWidth ?? 0,
            ev.nativeEvent.offsetX
          ) /
            100) *
            (max - min)
        );
      }}
      onMouseMove={(ev) => {
        if (isClicking) {
          onChange?.(
            (getPercentFromMixMax(
              0,
              slideContainer?.offsetWidth ?? 0,
              ev.nativeEvent.offsetX
            ) /
              100) *
              (max - min)
          );
        }
      }}
    >
      <div
        className="rounded-full bg-white h-4 w-4 absolute border-white cursor-pointer z-10"
        style={{
          left: `${getPercentFromMixMax(min, max, value ?? 0)}%`,
        }}
        onMouseDown={(ev) => {
          isClicking = true;
        }}
      ></div>
      <div
        className="w-full h-2 bg-white rounded-lg opacity-50"
        id="slide"
      ></div>
    </div>
  );
}

export { Slider as default };
