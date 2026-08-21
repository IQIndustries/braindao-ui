// Decorative: the requirements themselves are spelled out as real text under
// this board, so the rows carry no lettering of their own.
const ROWS = [
	{ y: 9.5, width: 173 },
	{ y: 34.5, width: 145 },
	{ y: 59.5, width: 161 },
] as const;

export const StakeChecklist = () => (
	<svg
		viewBox="0 0 216 69"
		className="ill h-auto w-full max-w-[216px]"
		aria-hidden="true"
	>
		{ROWS.map((row) => (
			<g key={row.y}>
				<rect
					className="checkbox"
					x="0.6"
					y={row.y - 8.75}
					width="17.5"
					height="17.5"
					rx="4"
				/>
				<path
					className="tick"
					d={`M4.6 ${row.y + 0.9} l3.5 3.5 L15.2 ${row.y - 5.3}`}
				/>
				<rect
					className="track"
					x="30"
					y={row.y - 2.5}
					width={row.width}
					height="5"
					rx="2.5"
				/>
			</g>
		))}
	</svg>
);
