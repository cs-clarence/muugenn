import React, { useContext, useEffect } from "react";
import { createPortal } from "react-dom";
import SettingsBack from "./assets/settings-back.svg";
import SettingsGroup from "./partials/SettingsGroup";
import SettingsContext, {
  SettingsActions,
} from "../../contexts/settings-context";
import cn from "classnames";
import { isBoolean, isNumber } from "lodash";

type Props = { show: boolean; onBack?: (ev?: boolean) => void };

const html = document.querySelector("html");

function SettingsPanel({ show, onBack }: Props) {
  const { state, dispatch } = useContext(SettingsContext);

  useEffect(() => {
    if (html) html.style.overflow = show ? "hidden" : "auto";
  }, [show]);

  return createPortal(
    <div
      className={cn(
        `fixed w-full h-full
        bg-gradient-to-l
        duration-300
        from-black
        z-50 pointer-events-none transition-opacity`,
        { "opacity-0": !show, "pointer-events-auto": show },
      )}
    >
      <div
        className={cn(
          "right-0",
          "fixed",
          "z-50",
          "w-full",
          "sm:w-96",
          "h-full",
          "bg-blue-100",
          "dark:bg-gray-800",
          "z-50",
          "translate-x-0",
          "transform",
          "transition-transform",
          "duration-500",
          "ease-in-out",
          "pointer-events-auto",
          "overflow-auto",
          {
            "translate-x-full": !show,
          },
        )}
      >
        <div className="h-14 bg-blue-300 dark:bg-gray-700 sticky top-0 z-10">
          <div className="container mx-auto h-full text-lg flex flex-row justify-center items-center px-3">
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
          <div className="mx-5">
            <SettingsGroup
              groupName="Image Dimension"
              toggleable
              toggled={state.useImageDimension}
              onToggle={(ev) =>
                dispatch({
                  type: SettingsActions.toggleUseImageDimension,
                  payload: ev,
                })
              }
            >
              {[
                {
                  fieldName: "Width",
                  type: "numberInput",
                  value: state.idWidth,
                  onValueChange: (ev: string | boolean | number) => {
                    if (isNumber(ev)) {
                      dispatch({
                        type: SettingsActions.setIdWidth,
                        payload: ev,
                      });
                    }
                  },
                },
                {
                  fieldName: "Height",
                  type: "numberInput",
                  value: state.idHeight,
                  onValueChange: (ev: string | boolean | number) => {
                    if (isNumber(ev)) {
                      dispatch({
                        type: SettingsActions.setIdHeight,
                        payload: ev,
                      });
                    }
                  },
                },
                {
                  fieldName: "Maintain Aspect Ratio",
                  type: "toggleInput",
                  value: state.maintainAspectRatio,
                  onValueChange: (ev: string | boolean | number) => {
                    if (isBoolean(ev)) {
                      dispatch({
                        type: SettingsActions.toggleMaintainAspectRatio,
                        payload: ev,
                      });
                    }
                  },
                },
              ]}
            </SettingsGroup>
            <SettingsGroup
              groupName="Aspect Ratio"
              toggleable
              toggled={state.useAspectRatio}
              onToggle={(ev) =>
                dispatch({
                  type: SettingsActions.toggleUseAspectRatio,
                  payload: ev,
                })
              }
            >
              {[
                {
                  fieldName: "Width",
                  type: "numberInput",
                  value: state.arWidth,
                  onValueChange: (ev: string | boolean | number) => {
                    if (isNumber(ev)) {
                      dispatch({
                        type: SettingsActions.setArWidth,
                        payload: ev,
                      });
                    }
                  },
                },
                {
                  fieldName: "Height",
                  type: "numberInput",
                  value: state.arHeight,
                  onValueChange: (ev: string | boolean | number) => {
                    if (isNumber(ev)) {
                      dispatch({
                        type: SettingsActions.setArHeight,
                        payload: ev,
                      });
                    }
                  },
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
              toggled={state.useSearchTerms}
              onToggle={(ev) =>
                dispatch({
                  type: SettingsActions.toggleUseSearchTerms,
                  payload: ev,
                })
              }
              entries={state.searchTerms}
              onAddEntry={(ev) =>
                dispatch({
                  type: SettingsActions.addSearchTerm,
                  payload: ev,
                })
              }
              onRemoveEntry={(ev) =>
                dispatch({
                  type: SettingsActions.removeSearchTerm,
                  payload: ev,
                })
              }
            ></SettingsGroup>
            <div className="w-full flex flex-row justify-center my-8">
              <button
                className={cn(
                  `p-2 bg-green-300 dark:bg-blue-500 rounded-md w-40
              hover:shadow-lg transition-shadow focus:outline-none
              disabled:opacity-25
              `,
                )}
                onClick={() =>
                  dispatch({ type: SettingsActions.saveToLocalStorage })
                }
                disabled={!state.hasUnsavedChanges}
              >
                APPLY SETTINGS
              </button>
            </div>
            <div className="text-center">
              Created by{" "}
              <a
                href="https://clarencemanuel.netlify.app"
                className="font-bold"
                target="_blank"
                rel="noreferrer noorigin"
              >
                Clarence Manuel
              </a>
            </div>
            <div className="text-center">
              Powered By&nbsp;
              <a
                href="https://unsplash.com"
                className="font-bold"
                target="_blank"
                rel="noreferrer noorigin"
              >
                Unsplash
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector("#root") as HTMLElement,
  );
}

export { SettingsPanel as default };
