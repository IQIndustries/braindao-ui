// The board renders at 1:1, so these units are the design's pixels: the arc
// runs out to the box's edges, with only the stroke's own width to spare.
const CENTER = { x: 92, y: 88 };
const R = 76;
// The design scatters a few faint points just off the tube, like stray light.
// Each sits over its own stretch of arc, so it takes the tube's colour once the
// sweep reaches it — the gauge reads as an instrument lighting up rather than a
// bar filling.
const SPARKS = [170, 118, 62, 10].map((deg) => {
	const rad = (deg * Math.PI) / 180;
	return {
		x: CENTER.x + 88 * Math.cos(rad),
		y: CENTER.y - 88 * Math.sin(rad),
		at: (180 - deg) / 180,
	};
});
const ARC = `M${CENTER.x - R} ${CENTER.y} A${R} ${R} 0 0 1 ${CENTER.x + R} ${CENTER.y}`;

// The same arc stopped at the sweep's head, for the light to run. Never more
// than a half turn, so the large-arc flag stays down.
const litArc = (fraction: number) => {
	const angle = Math.PI * (1 - fraction);
	const x = CENTER.x + R * Math.cos(angle);
	const y = CENTER.y - R * Math.sin(angle);
	return `M${CENTER.x - R} ${CENTER.y} A${R} ${R} 0 0 1 ${x} ${y}`;
};

// The arc takes the share as a dashoffset on a normalised pathLength, so the
// sweep transitions smoothly as the estimator's slider moves.
export const BoostGauge = ({
	fraction,
	value,
	caption,
	min,
	max,
}: {
	fraction: number;
	value: string;
	caption: string;
	min: string;
	max: string;
}) => (
	<svg
		viewBox="0 0 184 114"
		className="ill h-auto w-full max-w-[184px]"
		role="img"
		aria-label={`${caption}: ${value}`}
	>
		{/* The region is pinned in user space, and past the viewBox on every side,
		    rather than left to derive from the path's box: the swept arc's box
		    shrinks with the value, and a glow wider than the room its own box
		    leaves clips to a rectangle instead of fading out. */}
		<defs>
			<filter
				id="gauge-glow"
				filterUnits="userSpaceOnUse"
				x="-24"
				y="-24"
				width="232"
				height="162"
			>
				<feGaussianBlur stdDeviation="2.8" result="blur" />
				{/* Twice, so the halo carries past the blur's own falloff without
				    drowning the pink tube it sits on. */}
				<feMerge>
					<feMergeNode in="blur" />
					<feMergeNode in="blur" />
					<feMergeNode in="SourceGraphic" />
				</feMerge>
			</filter>
		</defs>

		{SPARKS.map((spark) => (
			<circle
				key={spark.x}
				className={spark.at <= fraction ? "spark spark-lit" : "spark"}
				cx={spark.x}
				cy={spark.y}
				r="1.6"
			/>
		))}
		<path className="gauge-track" d={ARC} />
		<path
			className="gauge-arc"
			d={ARC}
			pathLength="100"
			strokeDasharray="100"
			strokeDashoffset={100 - fraction * 100}
		/>

		<path
			className="gauge-light"
			d={litArc(fraction)}
			pathLength="100"
			filter="url(#gauge-glow)"
		/>

		{/* Inline, not a fontSize attribute: the .val class carries a font-size,
		    and a class beats a presentation attribute. */}
		<text
			className="val"
			x={CENTER.x}
			y="65"
			textAnchor="middle"
			style={{ fontSize: 30 }}
		>
			{value}
		</text>
		<text className="lbl" x={CENTER.x} y="85" textAnchor="middle">
			{caption.toUpperCase()}
		</text>

		<text className="lbl" x={CENTER.x - R} y="109" textAnchor="middle">
			{min}
		</text>
		<text className="lbl" x={CENTER.x + R} y="109" textAnchor="middle">
			{max}
		</text>
	</svg>
);
