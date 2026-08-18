// HiIQ over a lock's lifetime: one straight fall from the boost it was minted
// at down to parity at expiry, plus the dashed line an extension would put it
// back on. The multiplier axis is fixed at 4x..1x, so the plot is pure geometry
// — 52px of board per multiple.
const PLOT = { left: 78, right: 470, top: 44, bottom: 200 };
const MULTIPLES = [4, 3, 2, 1] as const;
const rowY = (multiple: number) => PLOT.bottom - (multiple - 1) * 52;

const MID = {
	x: (PLOT.left + PLOT.right) / 2,
	y: (PLOT.top + PLOT.bottom) / 2,
};

type DecayCurveLabels = {
	extend: string;
	start: string;
	expiry: string;
};

export const DecayCurve = ({ labels }: { labels: DecayCurveLabels }) => (
	<svg
		viewBox="0 0 520 268"
		className="ill h-auto w-full"
		role="img"
		aria-label={`${labels.start} 4× → ${labels.expiry} 1×. ${labels.extend}`}
	>
		<defs>
			<linearGradient id="decay-fill" x1="0" y1="0" x2="0" y2="1">
				<stop offset="0%" stopColor="var(--ill-pink)" stopOpacity="0.22" />
				<stop offset="100%" stopColor="var(--ill-pink)" stopOpacity="0" />
			</linearGradient>
		</defs>

		{MULTIPLES.map((multiple) => (
			<g key={multiple}>
				<path
					className="grid-line"
					d={`M${PLOT.left} ${rowY(multiple)} H${PLOT.right}`}
				/>
				<text className="lbl" x="64" y={rowY(multiple) + 4} textAnchor="end">
					{multiple}×
				</text>
			</g>
		))}

		<path
			className="area"
			d={`M${PLOT.left} ${PLOT.top} L${PLOT.right} ${PLOT.bottom} L${PLOT.left} ${PLOT.bottom} Z`}
			fill="url(#decay-fill)"
		/>

		<path
			className="curve"
			d={`M${PLOT.left} ${PLOT.top} L${PLOT.right} ${PLOT.bottom}`}
			pathLength="1"
		/>

		<path className="dash-lit" d={`M${MID.x} ${MID.y} L${PLOT.right} 60`} />
		<text className="lbl" x={PLOT.right} y="42" textAnchor="end">
			{labels.extend.toUpperCase()}
		</text>

		<circle className="dot" cx={PLOT.left} cy={PLOT.top} r="3.4" />
		<circle className="dotw" cx={MID.x} cy={MID.y} r="3" />
		<circle className="dotw" cx={PLOT.right} cy={PLOT.bottom} r="3" />

		<text className="lbl" x={PLOT.left} y="228">
			{labels.start.toUpperCase()}
		</text>
		<text className="lbl" x={PLOT.right} y="228" textAnchor="end">
			{labels.expiry.toUpperCase()}
		</text>
	</svg>
);
