import cx from "classnames";
import { InputVariant } from "../types/InputVariant";
import Tooltip from "./Tooltip";
import { InputForm } from "../types/InputForm";
import { InputSize } from "../types/InputSize";
import { HexColorPicker } from "react-colorful";
import Fieldset from "./Fieldset";

type InputProps = & {
  variant?: InputVariant,
  tooltip?: string,
  size?: InputSize,
  form?: InputForm,
  className?: string,
  color: string,
  onChange: (newColor: string) => void,
}

export default function ColorInput({
  variant,
  tooltip,
  className,
  color,
  onChange
}: InputProps) {

  console.log(color)
  return (
    <Fieldset className="w-full">
      <Tooltip tooltip={tooltip} variant={variant} className="w-[inherit]">
        <div className={cx([
          'flex flex-row items-center justify-start gap-2 w-full',
          className
        ])}>
          <div className="flex flex-col gap-2 items-center justify-center w-full">
            <HexColorPicker color={color as string} onChange={onChange} style={{ width: '100%' }} />
            <label className="input input-accent input-sm">
              <span>HEX</span>
              <input onChange={(event) => onChange(event.target.value)} value={color as string} />
            </label>
          </div>
        </div>
      </Tooltip>
    </Fieldset>
  )
} 