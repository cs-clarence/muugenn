import React, { useCallback, useState } from "react";
import InfoIcon from "../assets/info-logo.svg";
import "./global.scss";
import cn from "classnames";
import SettingsToggle from "./SettingsToggle";
import AddIcon from "../assets/settings-add.svg";
import MinusIcon from "../assets/settings-minus.svg";

type ChildrenModel = {
  fieldName: string;
  type: "toggleInput" | "stringInput" | "numberInput";
  value: string | number | boolean;
  onValueChange?: (event: ChildrenModel["value"]) => void;
};
type Props = {
  children?: ChildrenModel[];
  groupName: string;
  toggleable?: boolean;
  toggled?: boolean;
  onToggle?: (event: boolean) => void;
  onAddEntry?: (event: string) => void;
  onRemoveEntry?: (event: string) => void;
  entries?: string[];
  infoText?: string;
};

function SettingsGroup({
  entries,
  groupName,
  toggleable,
  infoText,
  children,
  toggled,
  onToggle,
  onAddEntry,
  onRemoveEntry,
}: Props) {
  const [addableEntry, setAddableEntry] = useState("");
  const addCurrentAddableEntry = useCallback(() => {
    const entry = addableEntry.trim();
    if (entries && entries.indexOf(entry) < 0 && entry.length) {
      onAddEntry?.(entry);
      setAddableEntry("");
    }
  }, [entries, addableEntry, onAddEntry]);

  return (
    <div>
      <div className="h-8 flex flex-row justify-center items-center relative bg-gray-400 bg-opacity-20 dark:bg-transparent">
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
      <div
        className={cn(`opacity-50 pointer-events-none transition-opacity`, {
          "opacity-100 pointer-events-auto": toggled,
        })}
      >
        {children &&
          children.map((child, index) => (
            <div
              className="h-12 bg-gray-500 dark:bg-black bg-opacity-20 px-3 flex flex-row items-center relative"
              key={index}
            >
              <label htmlFor="#input" className="text-lg">
                {child.fieldName}
              </label>
              <div className="absolute right-3">
                {child.type === "toggleInput" && (
                  <SettingsToggle
                    toggled={child.value as boolean}
                    onToggle={child.onValueChange}
                  />
                )}
                {(child.type === "numberInput" ||
                  child.type === "stringInput") && (
                  <input
                    type={child.type === "stringInput" ? "text" : "number"}
                    min={1}
                    minLength={1}
                    className="bg-transparent rounded-md text-right underline"
                    value={child.value as string}
                    onChange={(ev) => {
                      const val =
                        child.type === "numberInput"
                          ? Number(ev.target.value)
                          : ev.target.value;

                      child.onValueChange?.(val);
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        {entries &&
          entries.map((entry, index) => {
            const id = `search-term-entry-${index}`;
            return (
              <form
                onSubmit={(ev) => {
                  ev.preventDefault();
                  const entryToRemove = (document.querySelector(
                    `#${id}`
                  ) as HTMLElement)?.innerHTML;

                  if (entryToRemove) {
                    // console.log(`removing id ${id} : ${entryToRemove}`);
                    onRemoveEntry?.(entryToRemove);
                  }
                }}
                className="h-12 bg-gray-500 dark:bg-black bg-opacity-20 px-3 flex flex-row items-center relative"
                key={index}
              >
                <p className="text-lg" id={id}>
                  {entry}
                </p>
                <button className="absolute right-5">
                  <img src={MinusIcon} alt="minus" />
                </button>
              </form>
            );
          })}
        {entries && (
          <div className="h-12 bg-gray-500 dark:bg-black bg-opacity-20 px-3 flex flex-row items-center relative">
            <input
              type="text"
              min={1}
              value={addableEntry}
              minLength={1}
              className="bg-transparent rounded-md underline"
              placeholder="Add search term..."
              onChange={(ev) => {
                setAddableEntry(ev.target.value);
              }}
              onKeyDown={(ev) => {
                if (ev.code === "NumpadEnter" || ev.code === "Enter") {
                  addCurrentAddableEntry();
                }
              }}
            ></input>
            <button className="absolute right-5">
              <img src={AddIcon} alt="add" onClick={addCurrentAddableEntry} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export { SettingsGroup as default };
