// Reference geometry on a 460-wide board, stretched to 560 so the outcome
// nodes fit translated prose instead of the mock's short data strings. Only the
// node width and the burn pings move; the rails, radii and endpoints are the
// export's own coordinates.
const NODE_X = 286;
const NODE_W = 258;

const NODES = [
	{ key: "governance", y: 18, rail: "M98 150 C170 150 200 47 286 47", cy: 47 },
	{ key: "staking", y: 121, rail: "M98 150 H286", cy: 150 },
	{ key: "burn", y: 224, rail: "M98 150 C170 150 200 253 286 253", cy: 253 },
] as const;

type FlowLabels = Record<
	(typeof NODES)[number]["key"],
	{ kicker: string; value: string }
>;

export const TokenFlow = ({
	source,
	labels,
}: { source: string; labels: FlowLabels }) => (
	<svg
		viewBox="0 0 560 300"
		className="ill h-auto w-full"
		role="img"
		aria-label={`${source}: ${NODES.map((n) => `${labels[n.key].kicker} — ${labels[n.key].value}`).join("; ")}`}
	>
		{NODES.map((node) => (
			<path key={node.key} className="rail" d={node.rail} />
		))}

		{/* Negative delays start each pulse mid-travel, so the three rails read as
		    one continuous outflow rather than a synchronised blink. */}
		{NODES.map((node, i) => (
			<path
				key={node.key}
				className="lit"
				d={node.rail}
				style={{ animationDelay: `${i * -1.5}s` }}
			/>
		))}

		<rect className="node" x="14" y="126" width="84" height="48" rx="12" />
		<text className="val-p" x="56" y="155" textAnchor="middle" fontSize="16">
			{source}
		</text>
		<circle className="dot" cx="98" cy="150" r="3.5" />

		{NODES.map((node) => (
			<g key={node.key}>
				<rect
					className="node"
					x={NODE_X}
					y={node.y}
					width={NODE_W}
					height="58"
					rx="12"
				/>
				<text className="lbl" x={NODE_X + 16} y={node.y + 22}>
					{labels[node.key].kicker.toUpperCase()}
				</text>
				<text className="val" x={NODE_X + 16} y={node.y + 47}>
					{labels[node.key].value}
				</text>
				<circle className="dotw" cx={NODE_X} cy={node.cy} r="2.6" />
			</g>
		))}

		{[
			{ cx: 504, r: 2.6, delay: "0s" },
			{ cx: 516, r: 2.2, delay: "-1s" },
			{ cx: 528, r: 1.8, delay: "-2s" },
		].map((p) => (
			<circle
				key={p.cx}
				className="dot ping"
				cx={p.cx}
				cy="243"
				r={p.r}
				style={{ animationDelay: p.delay }}
			/>
		))}
	</svg>
);
