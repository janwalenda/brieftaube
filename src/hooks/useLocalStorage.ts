"use client"

import { useEffect, useRef, useState } from "react";

type Storage = {
  [key: string]: string;
};

export function useLocalStorage() {
  const [storage, setStorage] = useState<Storage>({});
  const isMounted = useRef(false);

  // Initialisiere storage nach Mount aus localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const entries: Storage = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) entries[key] = localStorage.getItem(key) || "";
      }
      setStorage(entries);
    }
    isMounted.current = true;
  }, []);

  const get = (key: string) => {
    if (key in storage) return storage[key];
    return typeof window !== "undefined" ? localStorage.getItem(key) : null;
  };

  const set = (key: string, value: string) => {
    setStorage(prev => ({ ...prev, [key]: value }));
    if (isMounted.current && typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
  };

  const remove = (key: string) => {
    setStorage(prev => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
    if (isMounted.current && typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  };

  const clear = () => {
    setStorage({});
    if (isMounted.current && typeof window !== "undefined") {
      localStorage.clear();
    }
  };

  const getAll = () => ({ ...storage });

  return {
    get,
    set,
    remove,
    clear,
    getAll,
    length: Object.keys(storage).length
  };
}