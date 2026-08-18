// The board renders at 1:1, so these units are the design's pixels: the arc
// runs out to the box's edges, with only the stroke's own width to spare.
const CENTER = { x: 92, y: 88 };
const R = 76;
// The design scatters a few faint points just off the tube, like stray light.
const SPARKS = [170, 118, 62, 10].map((deg) => {
	const rad = (deg * Math.PI) / 180;
	return { x: CENTER.x + 88 * Math.cos(rad), y: CENTER.y - 88 * Math.sin(rad) };
});
const ARC = `M${CENTER.x - R} ${CENTER.y} A${R} ${R} 0 0 1 ${CENTER.x + R} ${CENTER.y}`;

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
}) => {
	const angle = Math.PI * (1 - fraction);

	return (
		<svg
			viewBox="0 0 184 114"
			className="ill h-auto w-full max-w-[184px]"
			role="img"
			aria-label={`${caption}: ${value}`}
		>
			{SPARKS.map((spark) => (
				<circle
					key={spark.x}
					className="dotw"
					opacity="0.45"
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
				className="gauge-core"
				d={ARC}
				pathLength="100"
				strokeDasharray="100"
				strokeDashoffset={100 - fraction * 100}
			/>

			<circle
				className="dotw"
				cx={CENTER.x + R * Math.cos(angle)}
				cy={CENTER.y - R * Math.sin(angle)}
				r="3.4"
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
};
