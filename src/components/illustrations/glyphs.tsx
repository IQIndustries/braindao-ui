import { cn } from "@/lib/utils";
import type React from "react";

// Stroke-only on a 24 grid, same contract as the eyebrow icons but painted
// large. The three utility glyphs each carry one moving part, animated from the
// `.ill` scope in globals.css.
const PATHS = {
	governance: (
		<>
			<path d="M12 4.5v15" />
			<path d="M6.5 20.5h11" />
			<g className="tipper">
				<path d="M4 8h16" />
				<path d="M4 8 2 12.4h4z" />
				<path d="M20 8l-2 4.4h4z" />
			</g>
		</>
	),
	staking: (
		<>
			<rect x="4.5" y="11" width="15" height="9.5" rx="2.4" />
			<path className="shackle" d="M8 11V7.6a4 4 0 0 1 8 0V11" pathLength="1" />
			<path d="M12 14.8v2.2" />
		</>
	),
	burn: (
		<>
			<path d="M3.5 20.5h17" />
			<rect className="burnbar" x="6" y="4" width="12" height="4" rx="1.2" />
			<rect x="6" y="9.5" width="12" height="4" rx="1.2" />
			<rect x="6" y="15" width="12" height="4" rx="1.2" />
		</>
	),
	wiki: (
		<g className="sway">
			<path d="M12 6.6S10 4.4 4.4 5v13.4c5.6-.6 7.6 1.6 7.6 1.6s2-2.2 7.6-1.6V5C14 4.4 12 6.6 12 6.6Z" />
			<path d="M12 6.6V20" />
		</g>
	),
	iqai: (
		<>
			<rect x="6" y="6" width="12" height="12" rx="3" />
			<circle className="ping" cx="12" cy="12" r="2.2" />
			<path d="M12 2.5v3.5M12 18v3.5M2.5 12H6M18 12h3.5" />
		</>
	),
	industries: (
		<>
			<path d="M3.5 20.5h17" />
			<rect x="5" y="13" width="4" height="7.5" rx="1" />
			<rect x="10" y="9" width="4" height="11.5" rx="1" />
			<rect className="growbar" x="15" y="4.5" width="4" height="16" rx="1" />
		</>
	),
} satisfies Record<string, React.ReactNode>;

export type GlyphName = keyof typeof PATHS;

export const Glyph = ({
	name,
	className,
}: { name: GlyphName; className?: string }) => (
	<svg
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.5"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
		className={cn("ill size-[34px] shrink-0 text-primary", className)}
	>
		{PATHS[name]}
	</svg>
);
