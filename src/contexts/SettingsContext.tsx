import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Settings = {
  showFooter: boolean;
  heroRobot: boolean;
  heroValueProp: boolean;
  heroTestimonials: boolean;
  heroNews: boolean;
  maxServices: number;
  maxBundles: number;
  maxPosts: number;
  maintenance: boolean;
};

const DEFAULT_SETTINGS: Settings = {
  showFooter: true,
  heroRobot: true,
  heroValueProp: true,
  heroTestimonials: true,
  heroNews: true,
  maxServices: 5,
  maxBundles: 5,
  maxPosts: 4,
  maintenance: false,
};

const STORAGE_KEY = "gigaease_settings";

type CtxValue = {
  settings: Settings;
  setSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
};

const SettingsContext = createContext<CtxValue | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) } as Settings;
    } catch (_) {}
    return DEFAULT_SETTINGS;
  });

  // Persist on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  function setSetting(key: keyof Settings, value: Settings[typeof key]) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <SettingsContext.Provider value={{ settings, setSetting }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used inside SettingsProvider");
  return ctx;
}
