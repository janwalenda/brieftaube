import cx from "classnames";
import Tooltip from "../Tooltip/Tooltip";
import { HexColorPicker } from "react-colorful";
import Fieldset from "../Fieldset/Fieldset";
import { ColorInputProps } from "./ColorInputProps";

export default function ColorInput({
  variant,
  tooltip,
  className,
  color,
  onChange,
  ...props
}: ColorInputProps) {
  return (
    <Fieldset className="w-full">
      <Tooltip tooltip={tooltip} variant={variant} className="w-[inherit]">
        <div className={cx([
          'flex flex-row items-center justify-start gap-2 w-full',
          className
        ])}>
          <div className="flex flex-col gap-2 items-center justify-center w-full">
            <HexColorPicker color={color} onChange={onChange} style={{ width: '100%' }} {...props}/>
            <label className="input input-accent input-sm">
              <span>HEX</span>
              <input onChange={(event) => onChange(event.target.value)} value={color} />
            </label>
          </div>
        </div>
      </Tooltip>
    </Fieldset>
  )
} 