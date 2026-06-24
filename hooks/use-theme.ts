import * as React from "react";

export type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "interface-theme";

function applyTheme(theme: Theme) {
  if (typeof window === "undefined") return;
  const root = document.documentElement;
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const resolved = theme === "system" ? (systemDark ? "dark" : "light") : theme;
  root.classList.toggle("dark", resolved === "dark");
}

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "system";
  return (window.localStorage.getItem(STORAGE_KEY) as Theme | null) ?? "system";
}

// External store so the persisted theme is read without setState-in-effect and
// stays SSR-safe (the server snapshot is always "system").
function subscribe(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) onChange();
  };
  const onMedia = () => {
    // Re-resolve the DOM class when the OS preference flips while on "system".
    applyTheme(getStoredTheme());
    onChange();
  };
  window.addEventListener("storage", onStorage);
  media.addEventListener("change", onMedia);
  return () => {
    window.removeEventListener("storage", onStorage);
    media.removeEventListener("change", onMedia);
  };
}

/**
 * Persisted Light/Dark/System theme. Applies the `dark` class to <html> and
 * re-resolves when the OS preference changes while set to "system".
 */
export function useTheme() {
  const theme = React.useSyncExternalStore(
    subscribe,
    getStoredTheme,
    () => "system" as Theme,
  );

  // Effect only pushes state out to an external system (the DOM) — allowed.
  React.useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const setTheme = React.useCallback((next: Theme) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
    // `storage` events don't fire in the same tab; dispatch one to notify
    // this tab's own subscribers.
    window.dispatchEvent(new StorageEvent("storage", { key: STORAGE_KEY }));
  }, []);

  return { theme, setTheme };
}
