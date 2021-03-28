import React, { MutableRefObject } from "react";
import InfoIcon from "../assets/info-logo.svg";
import "./global.scss";
import SettingsToggle from "./SettingsToggle";

type ChildrenModel = {
  fieldName: string;
  type: "toggleInput" | "stringInput" | "numberInput";
  value: MutableRefObject<string | number | boolean>;
  onValueChange?: (event: ChildrenModel["value"]) => void;
};
type Props = {
  children?: ChildrenModel[];
  groupName: string;
  toggleable?: boolean;
  toggled?: boolean;
  onToggle?: (event: boolean) => void;
  infoText?: string;
};

function SettingsGroup({
  groupName,
  toggleable,
  infoText,
  children,
  toggled,
  onToggle,
}: Props) {
  return (
    <div>
      <div className="h-8 flex flex-row justify-center items-center relative">
        <div className="flex flex-row justify-center items-center">
          {groupName}
          {infoText && (
            <img src={InfoIcon} alt="information icon" className="mx-3" />
          )}
        </div>
        {toggleable && (
          <div className="absolute right-3">
            <SettingsToggle toggled={toggled ?? false} onToggle={onToggle} />
          </div>
        )}
      </div>
      {children &&
        children.map((child) => (
          <div className="h-12 bg-black bg-opacity-20 px-3 flex flex-row items-center relative">
            <label htmlFor="#input" className="text-lg">
              {child.fieldName}
            </label>
            <div className="absolute right-3">
              {child.type === "toggleInput" && (
                <SettingsToggle toggled={child.value.current as boolean} />
              )}
              {(child.type === "numberInput" ||
                child.type === "stringInput") && (
                <input
                  type={child.type === "stringInput" ? "text" : "number"}
                  min="1"
                  minLength={1}
                  className="bg-transparent rounded-md text-right underline"
                  value={child.value.current as string}
                />
              )}
            </div>
          </div>
        ))}
    </div>
  );
}

export { SettingsGroup as default };
