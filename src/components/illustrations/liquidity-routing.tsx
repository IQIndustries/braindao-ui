const RAIL_X1 = 98;
const RAIL_X2 = 330;
const ROW_GAP = 56;
const rowY = (i: number) => 34 + i * ROW_GAP;

// One pulse threads every chain in sequence, stepping down at each hop. Built
// rather than pasted so the board still lines up if a chain is added: each hop
// shifts 90 to the right, which is the export's own spacing.
const snake = (rows: number) => {
	let d = `M${RAIL_X1} ${rowY(0)}`;
	for (let i = 1; i < rows; i++) {
		const x = 150 + (i - 1) * 90;
		d += ` H${x} C${x + 32} ${rowY(i - 1)} ${x + 26} ${rowY(i)} ${x + 58} ${rowY(i)}`;
	}
	return `${d} H${RAIL_X2}`;
};

export const LiquidityRouting = ({
	rows,
	label,
}: { rows: { key: string; from: string; to: string }[]; label: string }) => {
	const path = snake(rows.length);

	return (
		<svg
			viewBox={`0 0 470 ${rowY(rows.length - 1) + 32}`}
			className="ill h-auto w-full"
			role="img"
			aria-label={`${label}: ${rows.map((r) => `${r.from} — ${r.to}`).join("; ")}`}
		>
			{rows.map((row, i) => (
				<path
					key={row.key}
					className="rail"
					d={`M${RAIL_X1} ${rowY(i)} H${RAIL_X2}`}
				/>
			))}

			<path className="rail rail-lead" d={path} />
			<path className="lit" d={path} />

			{rows.map((row, i) => (
				<g key={row.key}>
					<text className="lbl" x="88" y={rowY(i) + 4} textAnchor="end">
						{row.from.toUpperCase()}
					</text>
					<text className={i === 0 ? "lbl-p" : "lbl"} x="342" y={rowY(i) + 4}>
						{row.to.toUpperCase()}
					</text>
				</g>
			))}

			<circle className="dot" cx={RAIL_X1} cy={rowY(0)} r="3.4" />
			<circle className="dot" cx={RAIL_X2} cy={rowY(rows.length - 1)} r="3.4" />
			{rows.slice(1, -1).map((row, i) => (
				<circle
					key={row.key}
					className="dot ping"
					cx={208 + i * 90}
					cy={rowY(i + 1)}
					r="3"
				/>
			))}
		</svg>
	);
};
