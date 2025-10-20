"use client"
import { FC, useEffect, useState, useCallback, useRef } from "react";
import { Theme } from "@/types/Theme";
import { ThemeContext } from "./ThemeContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const ThemeContextProvider: FC<{
  children: React.ReactNode;
}> = ({ 
  children, 
}) => {
  const { set, get } = useLocalStorage()
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true
  }, [])

  const getSystemTheme = useCallback(() => {
    if (isMounted.current) {
      const preferedColorScheme = window.matchMedia('(prefers-color-scheme: dark)');
      // Check if die dark-mode Media-Query matches
      if(preferedColorScheme.matches){
        return Theme.DARK
      } else {
        return Theme.LIGHT
      }
    } else {
      return Theme.SYSTEM
    }
  }, [])

  const [theme, setTheme] = useState<Theme>(getSystemTheme());

  // Initialer Load: Lokales Theme aus Storage übernehmen, falls vorhanden
  useEffect(() => {
    const localTheme = get('theme');
    if(localTheme) {
      setTheme(localTheme as Theme)
    } else {
      // Falls kein gespeichertes Theme existiert, System-Theme übernehmen
      setTheme(getSystemTheme());
    }
  // Abhängigkeiten so, dass nur beim initialen Mount / System-Theme-Change-Logik greift
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // System-Theme-Änderungen beobachten und ggf. re-render durchführen
  useEffect(() => {
    // Falls der Nutzer kein explizites Theme gesetzt hat, dem System-Theme folgen
    const currentLocal = get('theme');
    if (!currentLocal) {
      const sys = getSystemTheme();
      if (sys !== theme) {
        setTheme(sys);
      }
    }

    // Listener für Änderungen des System-Themes
    const mq = isMounted.current
      ? window.matchMedia('(prefers-color-scheme: dark)')
      : null;

    const systemThemeChange = (e: MediaQueryListEvent) => {
      // Wenn kein explizites Theme gesetzt ist, Theme aktualisieren
      const localTheme = get('theme');
      if (!localTheme) {
        const newTheme = e.matches ? Theme.DARK : Theme.LIGHT;
        setTheme(newTheme);
      }
    };

    if (mq?.addEventListener) {
      mq.addEventListener('change', systemThemeChange);
    } else if (mq?.addListener) {
      // Ältere Browser-Unterstützung
      mq.addListener(systemThemeChange);
    }

    return () => {
      if (mq?.removeEventListener) {
        mq.removeEventListener('change', systemThemeChange);
      } else if (mq?.removeListener) {
        mq.removeListener(systemThemeChange);
      }
    };
  // Abhängigkeiten: Theme und getSystemTheme gehören dazu, aber der Listener soll sich
  // nur bei System-Theme-Änderungen aktivieren; theme-Änderung via switchTheme ist separat
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, getSystemTheme]);

  const switchTheme = (newTheme: Theme) => {
    set('theme', newTheme);
    return setTheme(newTheme);
  }

  return (
    <ThemeContext.Provider value={{
      theme,
      switchTheme,
      getSystemTheme
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContextProvider;
