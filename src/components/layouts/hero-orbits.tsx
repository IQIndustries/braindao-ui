// Ratios lifted from the design: three concentric rings on a shallow tilted
// plane. cy sits mid-viewBox with enough headroom that the outer ring never
// meets the edge, so the ellipses always read as closed.
const CX = 1000;
const CY = 200;

const ORBITS = [
	{ rx: 262, ry: 36, duration: "9s", delay: "-2.1s", opacity: 0.8 },
	{ rx: 474, ry: 64, duration: "14s", delay: "-6.4s", opacity: 0.68 },
	{ rx: 712, ry: 92, duration: "20s", delay: "-1.5s", opacity: 0.56 },
];

export const HeroOrbits = () => (
	<div
		aria-hidden="true"
		className="pointer-events-none absolute inset-x-0 bottom-[7%] -z-[5] flex justify-center"
	>
		{/* Never wider than the tallest ring needs: 116vw keeps the outer ring
		    inside the section on phones, where the parent clips overflow. */}
		<svg
			viewBox={`0 0 2000 ${CY * 2}`}
			className="h-auto w-[clamp(22rem,116vw,80rem)] max-w-none"
			fill="none"
			role="presentation"
		>
			<defs>
				<filter id="orbit-glow" x="-12%" y="-90%" width="124%" height="280%">
					<feGaussianBlur stdDeviation="6" result="blur" />
					<feMerge>
						<feMergeNode in="blur" />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
			</defs>

			<g transform={`rotate(1.4 ${CX} ${CY})`}>
				{ORBITS.map((orbit) => (
					<g key={orbit.rx}>
						<ellipse
							cx={CX}
							cy={CY}
							rx={orbit.rx}
							ry={orbit.ry}
							stroke="#FF1A88"
							strokeWidth="1.2"
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
							strokeWidth="1.8"
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
			</g>
		</svg>
	</div>
);
