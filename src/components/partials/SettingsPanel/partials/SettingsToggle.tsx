import React from "react";
import cn from "classnames";

type Props = {
  toggled: boolean;
  onToggle?: (ev: boolean) => void;
  color?: string;
};
function SettingsToggle({ toggled, onToggle, color = "#ffffff" }: Props) {
  return (
    <div
      onClick={() => {
        if (onToggle) onToggle(!toggled);
      }}
      style={{
        backgroundColor: `${color}40`,
        borderColor: color,
      }}
      className={cn(
        `border-2 border-solid w-10 h-5 rounded-full relative opacity-50`,
        { "opacity-100": toggled }
      )}
    >
      <div
        className={cn(
          `
        rounded-full w-1/2 h-full absolute
        left-0
        transition-all
        `,
          { "left-1/2": toggled }
        )}
        style={{ backgroundColor: color }}
      ></div>
    </div>
  );
}

export { SettingsToggle as default };
