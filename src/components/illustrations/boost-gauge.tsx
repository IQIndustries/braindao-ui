// The board renders at 1:1, so these units are the design's pixels: the arc is
// tightened rather than the whole gauge scaled down, which would take the
// value's type with it.
const CENTER = { x: 83, y: 86 };
const R = 58;
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
			viewBox="0 0 165 114"
			className="ill h-auto w-full max-w-[165px]"
			role="img"
			aria-label={`${caption}: ${value}`}
		>
			<path className="gauge-track" d={ARC} />
			<path
				className="gauge-arc"
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
				y="70"
				textAnchor="middle"
				style={{ fontSize: 26 }}
			>
				{value}
			</text>
			<text className="lbl" x={CENTER.x} y="86" textAnchor="middle">
				{caption.toUpperCase()}
			</text>

			<text className="lbl" x={CENTER.x - R} y="106" textAnchor="middle">
				{min}
			</text>
			<text className="lbl" x={CENTER.x + R} y="106" textAnchor="middle">
				{max}
			</text>
		</svg>
	);
};
