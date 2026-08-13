import type React from "react";

// Stroke-only on a 24 grid, painted at 14px. `currentColor` is the point: the
// eyebrow sets one colour and the icon and label move as a single unit.
const PATHS = {
	orbit: (
		<>
			<circle cx="12" cy="12" r="8.5" />
			<path d="M12 3.5v17M3.5 12h17" />
			<path d="M12 3.5c3 2.6 3 14.4 0 17M12 3.5c-3 2.6-3 14.4 0 17" />
		</>
	),
	token: (
		<>
			<circle cx="12" cy="12" r="8.5" />
			<circle cx="12" cy="12" r="3.2" />
		</>
	),
	swap: (
		<>
			<path d="M4 8h15l-4-4" />
			<path d="M20 16H5l4 4" />
		</>
	),
	bolt: <path d="M13 3 5.5 13.5h5L10 21l7.5-10.5h-5L13 3Z" />,
	vault: (
		<>
			<rect x="3" y="5" width="18" height="14" rx="2.4" />
			<circle cx="12" cy="12" r="3.4" />
			<path d="M12 10.2v3.6M10.2 12h3.6" />
		</>
	),
	grid: (
		<>
			<rect x="3.5" y="3.5" width="7" height="7" rx="1.6" />
			<rect x="13.5" y="3.5" width="7" height="7" rx="1.6" />
			<rect x="3.5" y="13.5" width="7" height="7" rx="1.6" />
			<rect x="13.5" y="13.5" width="7" height="7" rx="1.6" />
		</>
	),
	lock: (
		<>
			<rect x="4" y="10.5" width="16" height="10" rx="2.4" />
			<path d="M8 10.5V7.8a4 4 0 0 1 8 0v2.7" />
		</>
	),
} satisfies Record<string, React.ReactNode>;

export type EyebrowIconName = keyof typeof PATHS;

export const EyebrowIcon = ({ name }: { name: EyebrowIconName }) => (
	<svg
		width="14"
		height="14"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.5"
		strokeLinecap="round"
		strokeLinejoin="round"
		aria-hidden="true"
		className="shrink-0"
	>
		{PATHS[name]}
	</svg>
);
