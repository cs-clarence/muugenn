import { clone, isBoolean, isNumber, isString } from "lodash";
import React, { ReactNode, useReducer } from "react";

type Source = {
  sourceID: string;
  displayName: string;
  toggled: boolean;
  api: string;
};
export class SettingsState {
  hasUnsavedChanges = false;
  useImageDimension = true;
  idWidth = 1366;
  idHeight = 768;
  useAspectRatio = false;
  arWidth = 16;
  arHeight = 9;
  maintainAspectRatio = true;
  useSearchTerms = false;
  searchTerms: string[] = [];
  searchTermsFallBack = [
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
  ];
  sources: Source[] = [
    { sourceID: "0", displayName: "Unsplash", toggled: true, api: "" },
  ];
  getSearchTerms() {
    if (this.searchTerms.length > 0) return this.searchTerms;
    return this.searchTermsFallBack;
  }
}

export enum SettingsActions {
  setIdWidth,
  setIdHeight,
  setArWidth,
  setArHeight,
  toggleUseAspectRatio,
  toggleMaintainAspectRatio,
  toggleUseImageDimension,
  toggleUseSearchTerms,
  addSearchTerm,
  removeSearchTerm,
  saveToLocalStorage,
}

type Action = {
  type: SettingsActions;
  payload?: unknown;
};

function getSettingsState() {
  const state = JSON.parse(localStorage.getItem("muugenn/settings") ?? "{}");
  return Object.assign(new SettingsState(), state);
}

function settingsReducer(
  prevState: SettingsState,
  action: Action
): SettingsState {
  switch (action.type) {
    case SettingsActions.setIdWidth:
      if (isNumber(action.payload)) {
        if (prevState.maintainAspectRatio) {
          prevState.idHeight =
            Math.floor(
              action.payload * (prevState.arHeight / prevState.arWidth)
            ) || 1;
        }
        prevState.idWidth = Math.floor(action.payload) || 1;
      }
      break;
    case SettingsActions.setIdHeight:
      if (isNumber(action.payload)) {
        if (prevState.maintainAspectRatio) {
          prevState.idWidth =
            Math.floor(
              action.payload * (prevState.arWidth / prevState.arHeight)
            ) || 1;
        }
        prevState.idHeight = Math.floor(action.payload) || 1;
      }
      break;
    case SettingsActions.setArWidth:
      if (isNumber(action.payload)) prevState.arWidth = action.payload || 1;
      break;
    case SettingsActions.setArHeight:
      if (isNumber(action.payload)) prevState.arHeight = action.payload || 1;
      break;
    case SettingsActions.toggleUseAspectRatio:
      if (typeof action.payload !== "undefined" && isBoolean(action.payload)) {
        prevState.useImageDimension = !action.payload;
        prevState.useAspectRatio = action.payload;
      } else {
        prevState.useImageDimension = !prevState.useImageDimension;
        prevState.useAspectRatio = !prevState.useAspectRatio;
      }
      break;
    case SettingsActions.toggleMaintainAspectRatio:
      if (typeof action.payload !== "undefined" && isBoolean(action.payload)) {
        prevState.maintainAspectRatio = action.payload;
      } else {
        prevState.maintainAspectRatio = !prevState.maintainAspectRatio;
      }
      break;
    case SettingsActions.toggleUseImageDimension:
      if (typeof action.payload !== "undefined" && isBoolean(action.payload)) {
        prevState.useImageDimension = action.payload;
        prevState.useAspectRatio = !action.payload;
      } else {
        prevState.useImageDimension = !prevState.useImageDimension;
        prevState.useAspectRatio = !prevState.useAspectRatio;
      }
      break;
    case SettingsActions.toggleUseSearchTerms:
      if (typeof action.payload !== "undefined" && isBoolean(action.payload)) {
        prevState.useSearchTerms = action.payload;
      } else {
        prevState.useSearchTerms = !prevState.useSearchTerms;
      }
      break;
    case SettingsActions.addSearchTerm:
      if (isString(action.payload)) {
        if (
          prevState.searchTerms.indexOf(action.payload) < 0 &&
          action.payload.length > 0
        ) {
          prevState.searchTerms.push(action.payload);
        }
      }
      break;
    case SettingsActions.removeSearchTerm:
      if (isString(action.payload)) {
        const index = prevState.searchTerms.indexOf(action.payload);
        if (index > -1) {
          prevState.searchTerms.splice(index, 1);
        }
      }
      break;
    case SettingsActions.saveToLocalStorage:
      localStorage.setItem("muugenn/settings", JSON.stringify(prevState));
      document.location.reload();
      break;
    default:
      throw new Error("Unknown Action");
  }
  return clone(prevState);
}

type Props = {
  children?: ReactNode;
};

const SettingsContext = React.createContext({
  state: getSettingsState(),
  dispatch: (v: Action): void => {},
});

function SettingsProvider({ children }: Props) {
  const [state, dispatch] = useReducer(settingsReducer, getSettingsState());
  function monitorChanges(action: Action) {
    if (action.type === SettingsActions.saveToLocalStorage) {
      state.hasUnsavedChanges = false;
    } else {
      state.hasUnsavedChanges = true;
    }
    dispatch(action);
  }

  return (
    <SettingsContext.Provider value={{ state, dispatch: monitorChanges }}>
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsContext as default, SettingsProvider };
