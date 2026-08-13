// Geometry lifted from the design: two wide concentric rings wrapped around
// the figure at CTA height, the outer one spanning ~85% of the viewport on a
// much deeper plane (ry/rx ≈ 0.23) than a near-flat pancake.
const CX = 1000;
const CY = 250;

const ORBITS = [
	{ rx: 480, ry: 112, duration: "11s", delay: "-3.2s", opacity: 0.75 },
	{ rx: 845, ry: 196, duration: "18s", delay: "-9s", opacity: 0.55 },
];

export const HeroOrbits = () => (
	<div
		aria-hidden="true"
		className="pointer-events-none absolute inset-x-0 top-[82%] -z-[5] flex -translate-y-1/2 justify-center"
	>
		{/* The outer ring is 84.5% of the svg, so 105vw keeps it just inside the
		    section's overflow clip at every width. */}
		<svg
			viewBox={`0 0 2000 ${CY * 2}`}
			className="h-auto w-[clamp(26rem,105vw,125rem)] max-w-none"
			fill="none"
			role="presentation"
		>
			<defs>
				<filter id="orbit-glow" x="-12%" y="-45%" width="124%" height="190%">
					<feGaussianBlur stdDeviation="6" result="blur" />
					<feMerge>
						<feMergeNode in="blur" />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
			</defs>

			{ORBITS.map((orbit) => (
				<g key={orbit.rx}>
					<ellipse
						cx={CX}
						cy={CY}
						rx={orbit.rx}
						ry={orbit.ry}
						stroke="#E64C8C"
						strokeWidth="1.1"
						strokeOpacity={orbit.opacity}
						vectorEffect="non-scaling-stroke"
					/>
					<ellipse
						cx={CX}
						cy={CY}
						rx={orbit.rx}
						ry={orbit.ry}
						pathLength={100}
						stroke="#FFC2E1"
						strokeWidth="1.6"
						strokeLinecap="round"
						vectorEffect="non-scaling-stroke"
						filter="url(#orbit-glow)"
						className="orbit-trace"
						style={
							{
								"--orbit-duration": orbit.duration,
								"--orbit-delay": orbit.delay,
							} as React.CSSProperties
						}
					/>
				</g>
			))}
		</svg>
	</div>
);
