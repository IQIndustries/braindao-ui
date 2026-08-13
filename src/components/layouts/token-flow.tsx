const NODES = [
	{ key: "governance", y: 30 },
	{ key: "staking", y: 118 },
	{ key: "burn", y: 206 },
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
		viewBox="0 0 600 300"
		className="h-auto w-full"
		fill="none"
		role="img"
		aria-label={`${source}: ${NODES.map((n) => labels[n.key].kicker).join(", ")}`}
	>
		<title>{source}</title>
		{NODES.map((node) => (
			<path
				key={node.key}
				d={`M132 150 C 200 150, 212 ${node.y + 32}, 288 ${node.y + 32}`}
				stroke="#FF1A88"
				strokeWidth="1.25"
				strokeOpacity="0.75"
				vectorEffect="non-scaling-stroke"
			/>
		))}

		<rect
			x="40"
			y="126"
			width="92"
			height="48"
			rx="8"
			fill="#FF1A88"
			fillOpacity="0.08"
			stroke="#FF1A88"
			strokeOpacity="0.5"
			vectorEffect="non-scaling-stroke"
		/>
		<text
			x="86"
			y="155"
			textAnchor="middle"
			className="fill-primary font-mono"
			fontSize="15"
		>
			{source}
		</text>

		{NODES.map((node) => (
			<g key={node.key}>
				<rect
					x="288"
					y={node.y}
					width="272"
					height="64"
					rx="8"
					fill="#0E0E11"
					stroke="#FF1A88"
					strokeOpacity="0.28"
					vectorEffect="non-scaling-stroke"
				/>
				<text
					x="306"
					y={node.y + 26}
					className="fill-neutral-500 font-mono"
					fontSize="10"
					letterSpacing="1.6"
				>
					{labels[node.key].kicker.toUpperCase()}
				</text>
				<text
					x="306"
					y={node.y + 47}
					className="fill-white font-mono"
					fontSize="13"
				>
					{labels[node.key].value}
				</text>
			</g>
		))}
	</svg>
);
