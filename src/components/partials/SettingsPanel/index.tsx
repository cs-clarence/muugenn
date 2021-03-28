import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import SettingsBack from "./assets/settings-back.svg";
import SettingsGroup from "./partials/SettingsGroup";
import cn from "classnames";

type Props = { show: boolean; onBack?: (ev?: boolean) => void };

const html = document.querySelector("html");

function SettingsPanel({ show, onBack }: Props) {
  const maintainAspectRatio = useRef(true);
  const dimWidth = useRef(1366);
  const dimHeight = useRef(768);

  const arWidth = useRef(16);
  const arHeight = useRef(9);

  useEffect(() => {
    if (html) html.style.overflow = show ? "hidden" : "auto";
  }, [show]);

  return createPortal(
    <div
      className={cn(
        "fixed",
        "w-full",
        "h-full",
        "bg-gray-700",
        "z-50",
        "translate-x-0",
        "transform",
        "transition-transform",
        "duration-500",
        "ease-in-out",
        {
          "translate-x-full": !show,
        }
      )}
    >
      <div className="h-14 bg-gray-800">
        <div className="container mx-auto h-full text-lg flex flex-row justify-center items-center px-3 relative">
          SETTINGS
          <img
            src={SettingsBack}
            alt="settings back button"
            className="h-5 absolute right-3"
            onClick={() => {
              if (onBack) onBack(true);
            }}
          />
        </div>
      </div>
      <div className="container mx-auto">
        <SettingsGroup groupName="Image Dimension" toggleable>
          {[
            { fieldName: "Width", type: "numberInput", value: dimWidth },
            { fieldName: "Height", type: "numberInput", value: dimHeight },
            {
              fieldName: "Main Aspect Ratio",
              type: "toggleInput",
              value: maintainAspectRatio,
            },
          ]}
        </SettingsGroup>
        <SettingsGroup groupName="Aspect Ratio" toggleable>
          {[
            { fieldName: "Width", type: "numberInput", value: arWidth },
            { fieldName: "Height", type: "numberInput", value: arHeight },
          ]}
        </SettingsGroup>
      </div>
    </div>,
    document.querySelector("#root") as HTMLElement
  );
}

export { SettingsPanel as default };
