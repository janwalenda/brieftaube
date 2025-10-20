"use client"
import { IoList, IoTrash } from "react-icons/io5";
import { usePreset } from "../../../hooks/usePreset";
import { InputVariant } from "../../Base/types/InputVariant";
import Button from "../../Base/components/Button";

export default function PresetDrawer() {
  const { presets, setPresetGlobally, removePreset } = usePreset();

  return (
    <div className="drawer w-fit">
      <input id="presetDrawer" type="checkbox" className="drawer-toggle" />
        {/* Page content here */}
        <label htmlFor="presetDrawer" className="btn btn-accent drawer-button">
          <IoList />
        </label>

      <div className="drawer-side">
        <label htmlFor="presetDrawer" aria-label="close sidebar" className="drawer-overlay">
          Schließen
        </label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <li className="bg-primary rounded-box text-primary-content">
            <h3 className="text-xl">Vorlagen</h3>
          </li>
          {/* Sidebar content here */}
          {presets.map(preset => {
            return (
              <li key={preset.id} className="flex flex-row items-center justify-center gap-2">
                <Button variant={InputVariant.Ghost} className="justify-start flex-1" onClick={() => setPresetGlobally(preset.id)}>
                  {preset.presetName}
                </Button>
                <Button variant={InputVariant.Secondary}
                  className="btn-circle btn-sm"
                  onClick={() => removePreset(preset.id)}
                >
                  <IoTrash/>
                </Button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  );
}
