// The lock pipeline on a 620-wide board: deposit rail into the lock, mint rail
// out to the boosted balance, and a dashed tail for the decay the next section
// picks up. Node widths are generous of the mock's so translated captions fit.
const RAIL_Y = 120;
const RING = { cx: 266, cy: 112, r: 34 };

type LockBoostLabels = {
	source: string;
	deposit: string;
	lock: string;
	lockCaption: string;
	mint: string;
	boost: string;
	boostUnit: string;
	boostCaption: string;
	decay: string;
};

export const LockBoost = ({ labels }: { labels: LockBoostLabels }) => (
	<svg
		viewBox="0 0 620 300"
		className="ill h-auto w-full"
		role="img"
		aria-label={`${labels.source} → ${labels.lockCaption} → ${labels.boost} ${labels.boostUnit}. ${labels.decay}`}
	>
		<path className="rail" d={`M114 ${RAIL_Y} H214`} />
		<path className="rail" d={`M318 ${RAIL_Y} H418`} />

		{/* Offset delays keep the two rails reading as one continuous mint rather
		    than a synchronised blink. */}
		<path className="lit" d={`M114 ${RAIL_Y} H214`} />
		<path
			className="lit"
			d={`M318 ${RAIL_Y} H418`}
			style={{ animationDelay: "-2.3s" }}
		/>

		<rect className="node" x="22" y="94" width="92" height="52" rx="12" />
		<text className="val" x="68" y="126" textAnchor="middle" fontSize="17">
			{labels.source}
		</text>
		<text className="lbl" x="68" y="172" textAnchor="middle">
			{labels.deposit.toUpperCase()}
		</text>
		<circle className="dot" cx="114" cy={RAIL_Y} r="3.5" />

		<text className="lbl" x="164" y="111" textAnchor="middle">
			{labels.lock.toUpperCase()}
		</text>

		<rect className="node" x="214" y="52" width="104" height="136" rx="16" />
		<circle className="dotw" cx="214" cy={RAIL_Y} r="2.6" />
		<circle
			className="lock-ring"
			cx={RING.cx}
			cy={RING.cy}
			r={RING.r}
			opacity="0.28"
		/>
		<circle
			className="lock-ring lock-ring-lit"
			cx={RING.cx}
			cy={RING.cy}
			r={RING.r}
			pathLength="100"
		/>
		<g
			className="orbit"
			style={{ transformOrigin: `${RING.cx}px ${RING.cy}px` }}
		>
			<circle className="dot" cx={RING.cx} cy={RING.cy - RING.r} r="3.4" />
		</g>
		<g className="glyph-ink">
			<rect x="255" y="110" width="22" height="17" rx="4" />
			<path d="M260 110v-4.5a6 6 0 0 1 12 0V110" />
		</g>
		<text className="lbl" x="266" y="172" textAnchor="middle">
			{labels.lockCaption.toUpperCase()}
		</text>

		<text className="lbl" x="368" y="111" textAnchor="middle">
			{labels.mint.toUpperCase()}
		</text>

		<rect className="node" x="418" y="88" width="104" height="64" rx="12" />
		<circle className="dot" cx="318" cy={RAIL_Y} r="3.5" />
		<circle className="dotw" cx="418" cy={RAIL_Y} r="2.6" />
		<text className="val-p" x="436" y="120" fontSize="25">
			{labels.boost}
		</text>
		<text className="lbl-p" x="437" y="138">
			{labels.boostUnit.toUpperCase()}
		</text>
		<text className="lbl" x="470" y="172" textAnchor="middle">
			{labels.boostCaption.toUpperCase()}
		</text>

		<circle className="dot" cx="466" cy="186" r="3" />
		<path className="dash" d="M470 188 L566 226" />
		<text className="lbl" x="508" y="250" textAnchor="middle">
			{labels.decay.toUpperCase()}
		</text>
	</svg>
);
