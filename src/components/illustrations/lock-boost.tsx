// The lock pipeline on a 624-wide board: deposit rail into the lock, mint rail
// out to the boosted balance, and a dashed tail for the decay the next section
// picks up. The lock is the focal node, so it carries the board's height while
// the two ends sit centred on the rail. Node widths are generous of the mock's
// so translated captions fit.
const RAIL_Y = 151;
const CAPTION_Y = 211;
const RING = { cx: 322, cy: RAIL_Y, r: 53 };
const SOURCE = { x: 20, y: 115, w: 111, h: 72 };
const LOCK = { x: 233, y: 70, w: 179, h: 163 };
const BOOST = { x: 494, y: 107, w: 110, h: 88 };

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
		viewBox="0 0 624 356"
		// Below its natural width the shared caption size would fall under 9px,
		// so the board scrolls in its wrapper instead of shrinking further.
		className="ill mx-auto h-auto w-full min-w-[620px] max-w-[765px]"
		role="img"
		aria-label={`${labels.source} → ${labels.lockCaption} → ${labels.boost} ${labels.boostUnit}. ${labels.decay}`}
	>
		<path className="rail" d={`M131 ${RAIL_Y} H${LOCK.x}`} />
		<path className="rail" d={`M412 ${RAIL_Y} H${BOOST.x}`} />

		{/* Offset delays keep the two rails reading as one continuous mint rather
		    than a synchronised blink. */}
		<path className="lit" d={`M131 ${RAIL_Y} H${LOCK.x}`} />
		<path
			className="lit"
			d={`M412 ${RAIL_Y} H${BOOST.x}`}
			style={{ animationDelay: "-2.3s" }}
		/>

		<rect
			className="node"
			x={SOURCE.x}
			y={SOURCE.y}
			width={SOURCE.w}
			height={SOURCE.h}
			rx="12"
		/>
		{/* Inline, not a fontSize attribute: the .val class carries a font-size,
		    and a class beats a presentation attribute. */}
		<text
			className="val"
			x="76"
			y="158"
			textAnchor="middle"
			style={{ fontSize: 17 }}
		>
			{labels.source}
		</text>
		<text className="lbl" x="76" y={CAPTION_Y} textAnchor="middle">
			{labels.deposit.toUpperCase()}
		</text>
		<circle className="dot" cx="131" cy={RAIL_Y} r="3.5" />

		<text className="lbl" x="182" y="134" textAnchor="middle">
			{labels.lock.toUpperCase()}
		</text>

		<rect
			className="node"
			x={LOCK.x}
			y={LOCK.y}
			width={LOCK.w}
			height={LOCK.h}
			rx="16"
		/>
		<circle className="dotw" cx={LOCK.x} cy={RAIL_Y} r="2.6" />
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
		<g className="glyph-ink">
			<rect x="310" y="144" width="24" height="20" rx="5" />
			<path d="M314 144v-6a8 8 0 0 1 16 0v6" />
		</g>
		<text className="lbl" x={RING.cx} y={CAPTION_Y} textAnchor="middle">
			{labels.lockCaption.toUpperCase()}
		</text>

		<text className="lbl" x="453" y="134" textAnchor="middle">
			{labels.mint.toUpperCase()}
		</text>

		<rect
			className="node"
			x={BOOST.x}
			y={BOOST.y}
			width={BOOST.w}
			height={BOOST.h}
			rx="12"
		/>
		<circle className="dot" cx="412" cy={RAIL_Y} r="3.5" />
		<circle className="dotw" cx={BOOST.x} cy={RAIL_Y} r="2.6" />
		<text
			className="val-p"
			x="549"
			y="150"
			textAnchor="middle"
			style={{ fontSize: 26 }}
		>
			{labels.boost}
		</text>
		{/* Not uppercased: it is the token's name, not a caption. */}
		<text className="lbl-p" x="549" y="176" textAnchor="middle">
			{labels.boostUnit}
		</text>
		<text className="lbl" x="549" y={CAPTION_Y} textAnchor="middle">
			{labels.boostCaption.toUpperCase()}
		</text>

		<circle className="dot" cx={BOOST.x} cy="255" r="3" />
		<path className="dash" d="M498 257 L598 290" />
		<text className="lbl" x="519" y="311" textAnchor="middle">
			{labels.decay.toUpperCase()}
		</text>
	</svg>
);
