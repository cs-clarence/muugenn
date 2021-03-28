import React, { useEffect, useState } from "react";
import SiteLogo from "./site-logo.svg";
import SettingsCog from "../../assets/settings-cog.svg";
import SettingsPanel from "../SettingsPanel";
import { throttle } from "lodash";
import cn from "classnames";
// import AccountLogo from "./account-logo.svg";

type Props = {};

let lastScrollPosition = window.scrollY;

function Header(props: Props) {
  const [showHeader, setShowHeader] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

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
    console.log(`showSettings: ${showSettings}`);
  }, [showSettings]);

  return (
    <header
      className={cn(
        `h-14 bg-blue-300 dark:bg-gray-700 sticky top-0 z-40 
      grid-flow-col-dense transition-opacity duration-150 
      opacity-50`,
        { "opacity-100": showHeader }
      )}
    >
      <div className="mx-auto container flex-row flex h-full items-center justify-between">
        <div className="h-full inline-flex flex-row items-center">
          <img src={SiteLogo} className="h-full p-2" alt="site logo" />
          <p className="font-bold px-2 text-xl">MUUGENN</p>
        </div>
        <div className="h-full inline-flex flex-row items-center">
          <img
            src={SettingsCog}
            alt="settings cog"
            className="w-8 mx-3"
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
