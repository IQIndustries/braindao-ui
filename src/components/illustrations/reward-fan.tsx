// Stakers' balances gathering into one pool. Four rays, not the row count of
// any real payout — the fan is the point, so the staker dots stay unlabelled
// past the one caption. Each ray leaves the arrowhead flat and arrives flat at
// its dot, and the apex sits on the dot column's centre, so the bottom ray
// sweeps down exactly as the top one sweeps up. The arrow points into the
// node, the design's way of saying the payout is keyed off the balances.
const DOTS = [13, 35, 57, 79];
const APEX = { x: 78.5, y: 46 };
const bend = (y: number) => `C 150 ${y}, 122 ${APEX.y}, ${APEX.x} ${APEX.y}`;
const RAYS = DOTS.map((y) => `M192 ${y} ${bend(y)}`);
// The route each staker dot rides: its own ray, started at the dot rather than
// under it and carried on past the arrowhead to inside the node. Beginning 5
// units out from the line's tip pulls the dot at most 0.7 off the line it
// follows, which is a fifth of its radius.
const TRIPS = DOTS.map((y) => `M197 ${y} ${bend(y)} L 62 ${APEX.y}`);

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

		{/* Ahead of the node, so the card's own fill takes each dot in as it
		    arrives — there is no room inside the node to park a dot beside the
		    lettering, and a ball slipping behind the edge is the clearer read
		    anyway. At the origin, not at the dot's position: the offset path does
		    the placing, and its own start is where the design puts the dot. */}
		{DOTS.map((y, i) => (
			<circle
				key={y}
				className="dot staker"
				cx="0"
				cy="0"
				r="3.4"
				style={{ offsetPath: `path("${TRIPS[i]}")` }}
			/>
		))}

		<rect className="node" x="0" y="30" width="68" height="32" rx="9" />
		<text className="lbl-p" x="34" y="49.5" textAnchor="middle">
			{source.toUpperCase()}
		</text>
		<path
			className="dot"
			d={`M68 ${APEX.y} L${APEX.x} ${APEX.y - 3.75} V${APEX.y + 3.75} Z`}
		/>

		<text className="lbl" x="197" y="96" textAnchor="middle">
			{target.toUpperCase()}
		</text>
	</svg>
);
