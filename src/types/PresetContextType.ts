import { type Mail } from "./Mail";
import { type Preset } from "./Preset";

export type PresetContextType = {
  addPreset: (name: string) => void;
  getPreset: (id: string) => Preset | undefined;
  editPreset: (id: string, name: string, preset: Mail) => void;
  removePreset: (id: string) => void;
  setPresetGlobally: (id: string) => void;
  presets: Preset[];
}
