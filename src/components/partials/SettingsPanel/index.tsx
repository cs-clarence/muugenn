import React, { useContext, useEffect } from "react";
import { createPortal } from "react-dom";
import SettingsBack from "./assets/settings-back.svg";
import SettingsGroup from "./partials/SettingsGroup";
import SettingsContext from "../../contexts/settings-context";
import cn from "classnames";

type Props = { show: boolean; onBack?: (ev?: boolean) => void };

const html = document.querySelector("html");

function SettingsPanel({ show, onBack }: Props) {
  const settings = useContext(SettingsContext);

  useEffect(() => {
    if (html) html.style.overflow = show ? "hidden" : "auto";
  }, [show]);

  return createPortal(
    <div
      className={cn(
        "fixed",
        "w-full",
        "h-full",
        "bg-blue-100",
        "dark:bg-gray-700",
        "z-50",
        "translate-x-0",
        "transform",
        "transition-transform",
        "duration-500",
        "ease-in-out",
        "overflow-auto",
        {
          "translate-x-full": !show,
        }
      )}
    >
      <div className="h-14 bg-blue-300 dark:bg-gray-800">
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
        <SettingsGroup
          groupName="Image Dimension"
          toggleable
          toggled={settings.useImageDimension}
          onToggle={settings.toggleUseImageDimension}
        >
          {[
            {
              fieldName: "Width",
              type: "numberInput",
              value: settings.idWidth,
              onValueChange: settings.setIdWidth as () => void,
            },
            {
              fieldName: "Height",
              type: "numberInput",
              value: settings.idHeight,
              onValueChange: settings.setIdHeight as () => void,
            },
            {
              fieldName: "Maintain Aspect Ratio",
              type: "toggleInput",
              value: settings.maintainAspectRatio,
              onValueChange: settings.toggleMaintainAspectRatio as () => void,
            },
          ]}
        </SettingsGroup>
        <SettingsGroup
          groupName="Aspect Ratio"
          toggleable
          toggled={settings.useAspectRatio}
          onToggle={settings.toggleUseAspectRatio}
        >
          {[
            {
              fieldName: "Width",
              type: "numberInput",
              value: settings.arWidth,
              onValueChange: settings.setArWidth as () => void,
            },
            {
              fieldName: "Height",
              type: "numberInput",
              value: settings.arHeight,
              onValueChange: settings.setArHeight as () => void,
            },
          ]}
        </SettingsGroup>
        {/* <SettingsGroup groupName="Sources">
          {settings.sources.map((item, index) => ({
            fieldName: item.displayName,
            value: item.toggled,
            type: "toggleInput",
            onValueChange: (ev) =>
              settings.toggleSource(item.sourceID, ev as boolean),
          }))}
        </SettingsGroup> */}
        <SettingsGroup
          groupName="Search Terms"
          toggleable
          toggled={settings.useSearchTerms}
          onToggle={settings.toggleUseSearchTerms}
          entries={settings.searchTerms}
          onAddEntry={settings.addSearchTerm}
          onRemoveEntry={settings.removeSearchTerm}
        ></SettingsGroup>
        <div className="w-full flex flex-row justify-center my-8">
          <button className="p-2 bg-green-300 dark:bg-blue-500 rounded-md w-40 hover:shadow-lg transition-shadow focus:outline-none">
            APPLY SETTINGS
          </button>
        </div>
      </div>
    </div>,
    document.querySelector("#root") as HTMLElement
  );
}

export { SettingsPanel as default };
