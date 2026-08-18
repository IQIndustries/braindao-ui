// Rewards leaving one pool for many balances. Four rails, not the row count of
// any real payout — the fan is the point, so the target dots stay unlabelled
// past the one caption.
const RAILS = [
	{ y: 16, d: "M70 52 C118 52 128 16 174 16" },
	{ y: 40, d: "M70 52 C118 52 128 40 174 40" },
	{ y: 64, d: "M70 52 C118 52 128 64 174 64" },
	{ y: 88, d: "M70 52 C118 52 128 88 174 88" },
] as const;

export const RewardFan = ({
	source,
	target,
}: { source: string; target: string }) => (
	<svg
		viewBox="0 0 240 112"
		className="ill h-auto w-full max-w-[240px]"
		role="img"
		aria-label={`${source} → ${target}`}
	>
		{RAILS.map((rail) => (
			<path key={rail.y} className="rail" d={rail.d} />
		))}

		{RAILS.map((rail, index) => (
			<path
				key={rail.y}
				className="lit"
				d={rail.d}
				style={{ animationDelay: `${index * -1.15}s` }}
			/>
		))}

		<rect className="node" x="6" y="36" width="64" height="32" rx="9" />
		<text className="lbl-p" x="38" y="55" textAnchor="middle">
			{source.toUpperCase()}
		</text>
		<circle className="dot" cx="70" cy="52" r="3" />

		{RAILS.map((rail) => (
			<circle key={rail.y} className="dotw" cx="176" cy={rail.y} r="2.8" />
		))}

		<text className="lbl" x="176" y="108" textAnchor="middle">
			{target.toUpperCase()}
		</text>
	</svg>
);
