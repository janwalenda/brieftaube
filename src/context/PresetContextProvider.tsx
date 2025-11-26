"use client"
import { FC, ReactNode, useState } from "react";
import { PresetContext } from "./PresetContext";
import { Preset } from "../types/Preset";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useField } from "../hooks/useField";
import { Mail } from "../types/Mail";

const PresetContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { set, getAll, remove } = useLocalStorage();
  const { setMail, mail } = useField();

  const savedPresets = Object.keys(getAll()).map(key => {
    if(key.startsWith('preset')) {
      return JSON.parse(getAll()[key]);
    }
  });

  const [presets, setPresets] = useState<Preset[]>(savedPresets);

  const addPreset = (name: string) => {
    const preset: Preset = {
      id: `preset-${presets.length + 1}`,
      presetName: name,
      preset: mail,
    };

    set(preset.id, JSON.stringify(preset))
  }

  const getPreset = (id: string) => {
    return presets.find(field => field.id === id);
  }

  const editPreset = (id: string, name: string, preset: Mail) => {
    presets.map(mappedPreset => {
      if (mappedPreset.id === id) {
        const editedPreset: Preset = {
          ...mappedPreset,
          presetName: name,
          preset,
        };

        set(id, JSON.stringify(editedPreset));

        return mappedPreset;
      }
      return mappedPreset;
    });
  }

  const removePreset = (id: string) => {
    setPresets(presets.filter(preset => preset.id !== id));
    remove(id);
  }

  const setPresetGlobally = (id: string) => {
    const preset = getPreset(id);

    if(preset) {
      setMail(preset.preset);
    }
  }

  return (
    <PresetContext.Provider value={{
      addPreset,
      getPreset,
      editPreset,
      removePreset,
      setPresetGlobally,
      presets
    }}>
      {children}
    </PresetContext.Provider>
  )
}

export default PresetContextProvider;
