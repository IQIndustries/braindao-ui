// Decorative: the share it draws is spelled out as real text in the caption
// stacked over it. pathLength="1" lets the arc take the share as a dasharray
// directly, so no circumference arithmetic is needed here.
export const TreasuryRing = ({ share }: { share: number | null }) => (
	<svg viewBox="0 0 180 180" className="ill size-[180px]" aria-hidden="true">
		<circle className="ring ring-spin" cx="90" cy="90" r="82" />
		<circle className="ring-track" cx="90" cy="90" r="66" />
		{share !== null && (
			<circle
				className="ring-arc"
				cx="90"
				cy="90"
				r="66"
				pathLength="1"
				transform="rotate(-90 90 90)"
				style={{ strokeDasharray: `${share} 1` }}
			/>
		)}
		<circle className="ring ring-inner" cx="90" cy="90" r="50" />
	</svg>
);
