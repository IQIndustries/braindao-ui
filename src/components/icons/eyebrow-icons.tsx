import type { IconType } from "react-icons";
import {
	RiCoinLine,
	RiFlashlightFill,
	RiGlobalLine,
	RiLayoutGridLine,
	RiLockLine,
	RiSafe2Line,
	RiTokenSwapLine,
} from "react-icons/ri";

const ICONS = {
	orbit: RiGlobalLine,
	token: RiCoinLine,
	swap: RiTokenSwapLine,
	bolt: RiFlashlightFill,
	vault: RiSafe2Line,
	grid: RiLayoutGridLine,
	lock: RiLockLine,
} satisfies Record<string, IconType>;

export type EyebrowIconName = keyof typeof ICONS;

// White, not the eyebrow's pink: the label already spends the accent, and the
// contrast is what separates the mark from the lettering at this size.
export const EyebrowIcon = ({ name }: { name: EyebrowIconName }) => {
	const Icon = ICONS[name];

	return <Icon size={14} aria-hidden="true" className="shrink-0 text-white" />;
};
