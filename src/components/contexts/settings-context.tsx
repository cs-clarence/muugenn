import React, { ReactNode, useState } from "react";

type Source = {
  sourceID: string;
  displayName: string;
  toggled: boolean;
  api: string;
};
// I think this is better for a reducer function as it contains a lot of
// methods
interface ISettingsManager {
  useImageDimension: boolean;
  toggleUseImageDimension(param?: boolean): void;

  idWidth: number;
  setIdWidth(param: number): void;

  idHeight: number;
  setIdHeight(param: number): void;

  useAspectRatio: boolean;
  toggleUseAspectRatio(param?: boolean): void;

  arWidth: number;
  setArWidth(param: number): void;

  arHeight: number;
  setArHeight(param: number): void;

  maintainAspectRatio: boolean;
  toggleMaintainAspectRatio(param?: boolean): void;

  useSearchTerms: boolean;
  toggleUseSearchTerms(param?: boolean): void;

  searchTerms: string[];
  searchTermsFallBack: string[];
  addSearchTerm(param: string): void;
  removeSearchTerm(param: string): void;
  getSearchTerms(): string[];

  sources: Source[];
  toggleSource(sourceID: string, toggled?: boolean): void;
  getSourceByID(souceID: string): Source | null;
}

const settingsManager: ISettingsManager = {
  useImageDimension: true,
  idWidth: 1366,
  idHeight: 768,
  useAspectRatio: false,
  arWidth: 16,
  arHeight: 9,
  maintainAspectRatio: true,
  useSearchTerms: false,
  searchTerms: [],
  searchTermsFallBack: [
    "illustrations",
    "fashion",
    "beauty",
    "nature",
    "drawings",
    "graphics",
    "flowers",
    "ocean",
    "anime",
    "japan",
    "pets",
    "cats",
    "dogs",
    "tattoo",
  ],
  sources: [{ sourceID: "0", displayName: "Unsplash", toggled: true, api: "" }],
  addSearchTerm(searchTerm: string) {},
  removeSearchTerm(searchTerm: string) {},
  toggleUseImageDimension(val?: boolean) {},
  setIdWidth(w: number) {},
  setIdHeight(h: number) {},
  toggleUseAspectRatio: function (val?: boolean) {},
  setArWidth(w: number) {},
  setArHeight(h: number) {},
  toggleUseSearchTerms(val?: boolean) {},
  toggleMaintainAspectRatio(val?: boolean) {},
  toggleSource(souceID: string, toggled?: boolean) {},
  getSourceByID(sourceID: string) {
    return this.sources[0];
  },
  getSearchTerms() {
    return [];
  },
};

const SettingsContext = React.createContext(settingsManager);

type Props = {
  children?: ReactNode;
};

function SettingsProvider({ children }: Props) {
  const [useAspectRatio, setUseAspectRatio] = useState(
    settingsManager.useAspectRatio
  );
  const [useImageDimension, setUseImageDimension] = useState(
    settingsManager.useImageDimension
  );
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(
    settingsManager.maintainAspectRatio
  );
  const [arWidth, setArWidth] = useState(settingsManager.arWidth);
  const [idWidth, setIdWidth] = useState(settingsManager.idWidth);
  const [arHeight, setArHeight] = useState(settingsManager.arHeight);
  const [idHeight, setIdHeight] = useState(settingsManager.idHeight);
  const [searchTerms, setSearchTerms] = useState(settingsManager.searchTerms);
  const [useSearchTerms, setUseSearchTerms] = useState(
    settingsManager.useSearchTerms
  );
  const [sources, setSources] = useState(settingsManager.sources);

  const reactiveSettingsManager: ISettingsManager = {
    useImageDimension,
    toggleUseImageDimension(p?: boolean) {
      if (typeof p !== "undefined") {
        setUseImageDimension(p);
        setUseAspectRatio(!p);
      } else {
        setUseImageDimension((v) => !v);
        setUseAspectRatio((v) => !v);
      }
    },
    useAspectRatio,
    toggleUseAspectRatio(p?: boolean) {
      if (typeof p !== "undefined") {
        setUseAspectRatio(p);
        setUseImageDimension(!p);
      } else {
        setUseAspectRatio((v) => !v);
        setUseImageDimension((v) => !v);
      }
    },
    useSearchTerms,
    toggleUseSearchTerms(p?: boolean) {
      if (typeof p !== "undefined") {
        setUseSearchTerms(p);
      } else {
        setUseSearchTerms((v) => !v);
      }
    },
    maintainAspectRatio,
    toggleMaintainAspectRatio(p?: boolean) {
      if (typeof p !== "undefined") {
        setMaintainAspectRatio(p);
      } else {
        setMaintainAspectRatio((v) => !v);
      }
    },
    arWidth,
    setArWidth,
    arHeight,
    setArHeight,
    idHeight,
    setIdHeight(h: number) {
      if (maintainAspectRatio) {
        setIdWidth(Math.floor(h * (arWidth / arHeight) || 1));
      }

      setIdHeight(h || 1);
    },
    idWidth,
    setIdWidth(w: number) {
      if (maintainAspectRatio) {
        setIdHeight(Math.floor(w * (arHeight / arWidth) || 1));
      }
      setIdWidth(w || 1);
    },
    searchTerms,
    addSearchTerm(st: string) {
      if (searchTerms.indexOf(st) < 0 && st.length > 0) {
        setSearchTerms((prev) => {
          prev.push(st);
          return [...prev];
        });
      }
    },
    removeSearchTerm(st: string) {
      setSearchTerms((prev) => {
        const index = prev.indexOf(st);
        if (index > -1) {
          prev.splice(index, 1);
        }
        return [...prev];
      });
    },
    getSearchTerms() {
      if (searchTerms.length && useSearchTerms) {
        return searchTerms;
      }
      return this.searchTermsFallBack;
    },
    searchTermsFallBack: settingsManager.searchTermsFallBack,
    sources,
    toggleSource(sourceID: string, toggled?: boolean) {
      setSources((prev) => {
        for (const el of prev) {
          if (el.sourceID === sourceID) {
            if (typeof toggled === "undefined") {
              el.toggled = !el.toggled;
            } else {
              el.toggled = toggled;
            }
          }
        }
        // for some reason, if the same array is returned,
        // react wont 'react'
        // so this solution copies the content of the previous array
        // to force react to rerender
        // it could be because this particular array isn't really getting modified
        //    by this function
        // the function instead just modifies the some property of an object
        //    inside the array
        // so just copy the content of an array to a new array
        return [...prev];
      });
    },
    getSourceByID(sourceID: string) {
      for (const source of sources) {
        if (source.sourceID === sourceID) {
          return source;
        }
      }
      return null;
    },
  };

  return (
    <SettingsContext.Provider value={reactiveSettingsManager}>
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsContext as default, SettingsProvider };
