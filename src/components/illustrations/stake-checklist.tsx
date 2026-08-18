// Decorative: the requirements themselves are spelled out as real text under
// this board, so the rows carry no lettering of their own.
const ROWS = [
	{ y: 10, width: 148 },
	{ y: 34, width: 176 },
	{ y: 58, width: 126 },
] as const;

export const StakeChecklist = () => (
	<svg
		viewBox="0 0 200 74"
		className="ill h-auto w-full max-w-[200px]"
		aria-hidden="true"
	>
		{ROWS.map((row, index) => (
			<g key={row.y}>
				<path
					className="check"
					d={`M2 ${row.y + 4} l3.6 3.6 L14 ${row.y - 3}`}
					pathLength="1"
					style={{ animationDelay: `${index * 0.9}s` }}
				/>
				<rect
					className="track"
					x="24"
					y={row.y - 1}
					width={row.width}
					height="5"
					rx="2.5"
				/>
			</g>
		))}
	</svg>
);
