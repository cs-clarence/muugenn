import React, { useEffect, useState } from "react";
import SiteLogo from "./site-logo.svg";
import SettingsCog from "../../assets/settings-cog.svg";
import SettingsPanel from "../SettingsPanel";
import { throttle } from "lodash";
import cn from "classnames";
// import AccountLogo from "./account-logo.svg";

type Props = {};

let lastScrollPosition = window.scrollY;
const html = document.querySelector("html");
const result = window.matchMedia("(prefers-color-scheme: dark)");
const darkModeInitial = localStorage.getItem("darkMode");

function Header(props: Props) {
  const [showHeader, setShowHeader] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const [darkMode, setDarkMode] = useState(
    darkModeInitial !== null ? darkModeInitial === "true" : result.matches
  );

  useEffect(() => {
    // setup event listeners
    window.addEventListener(
      "scroll",
      throttle(() => {
        setShowHeader(lastScrollPosition > window.scrollY);
        lastScrollPosition = window.scrollY;
      }, 100)
    );
  }, []);

  useEffect(() => {
    if (darkMode) {
      html?.classList.add("dark");
    } else {
      html?.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header
      className={cn(
        `h-14  dark:bg-gray-700 bg-blue-300 sticky top-0 z-40 
      grid-flow-col-dense transition-opacity duration-150 
      opacity-50`,
        { "opacity-100": showHeader }
      )}
    >
      <div className="mx-auto container flex-row flex h-full items-center justify-between">
        <div className="h-full inline-flex flex-row items-center">
          <img
            src={SiteLogo}
            className="h-full p-2 cursor-pointer"
            alt="site logo"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
          <p
            className="font-bold px-2 text-xl cursor-pointer"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            MUUGENN
          </p>
        </div>
        <div className="h-full inline-flex flex-row items-center">
          <div
            onClick={() => {
              setDarkMode((last) => {
                localStorage.setItem("darkMode", (!last).toString());
                return !last;
              });
            }}
            className={cn(
              `border-2 border-solid border-black bg-black bg-opacity-50 dark:bg-opacity-50 dark:bg-white w-16 h-8 rounded-full relative`,
              { "border-white": darkMode }
            )}
          >
            <div
              className={cn(
                `
                rounded-full w-1/2 h-full absolute
                transition-all
                transform
                bg-black
                translate-x-0
                flex justify-center items-center
                `,
                { "translate-x-full bg-white": darkMode }
              )}
            >
              {(darkMode && (
                <span className="fas fa-moon text-yellow-300"></span>
              )) || <span className="fas fa-sun text-yellow-300"></span>}
            </div>
          </div>

          <img
            src={SettingsCog}
            alt="settings cog"
            className={cn(
              "w-8 mx-3 transition-transform transform active:animate-pulse",
              {
                "-rotate-180": showSettings,
              }
            )}
            style={{ filter: darkMode ? "inherit" : "invert(100%)" }}
            onClick={() => setShowSettings((prev) => !prev)}
          />
        </div>
        <SettingsPanel
          show={showSettings}
          onBack={() => setShowSettings(false)}
        />
      </div>
    </header>
  );
}

export { Header as default };
