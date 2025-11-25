import { TooltipPosition } from "@/components/UI/Shared/TooltipPosition";
import { InputVariant } from "../Shared/InputVariant";


export type TooltipProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  variant?: InputVariant;
  tooltip?: string;
  tooltipPosition?: TooltipPosition;
  children: React.ReactNode;
};
