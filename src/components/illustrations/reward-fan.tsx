// Stakers' balances gathering into one pool. Four rays, not the row count of
// any real payout — the fan is the point, so the staker dots stay unlabelled
// past the one caption. Each ray leaves the arrowhead flat and arrives flat at
// its dot, and the apex sits on the dot column's centre, so the bottom ray
// sweeps down exactly as the top one sweeps up. The arrow points into the
// node, the design's way of saying the payout is keyed off the balances.
const DOTS = [13, 35, 57, 79];
const APEX = { x: 78.5, y: 46 };
const RAYS = DOTS.map(
	(y) => `M192 ${y} C 150 ${y}, 122 ${APEX.y}, ${APEX.x} ${APEX.y}`,
);

export const RewardFan = ({
	source,
	target,
}: { source: string; target: string }) => (
	<svg
		viewBox="0 0 224 100"
		className="ill h-auto w-full max-w-[224px]"
		role="img"
		aria-label={`${source} ← ${target}`}
	>
		{RAYS.map((d) => (
			<path key={d} className="ray" d={d} />
		))}

		<rect className="node" x="0" y="30" width="68" height="32" rx="9" />
		<text className="lbl-p" x="34" y="49.5" textAnchor="middle">
			{source.toUpperCase()}
		</text>
		<path
			className="dot"
			d={`M68 ${APEX.y} L${APEX.x} ${APEX.y - 3.75} V${APEX.y + 3.75} Z`}
		/>

		{DOTS.map((y) => (
			<circle key={y} className="dot" cx="197" cy={y} r="3.4" />
		))}

		<text className="lbl" x="197" y="96" textAnchor="middle">
			{target.toUpperCase()}
		</text>
	</svg>
);
