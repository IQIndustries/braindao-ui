// Geometry measured off the design capture (2000px frame): inner ring
// rx 445 / ry 90 centred 363px above the hero's bottom edge, outer ring
// rx 694 / ry 134 on a plane 18px lower. Bottom-anchoring in vw keeps the
// rings locked to the bottom-anchored figure at every viewport width.
const ORBITS = [
	{ rx: 445, ry: 90, cy: 180, duration: "11s", delay: "-3.2s", opacity: 0.8 },
	{ rx: 694, ry: 134, cy: 198, duration: "18s", delay: "-9s", opacity: 0.6 },
];

export const HeroOrbits = () => (
	<div
		aria-hidden="true"
		className="pointer-events-none absolute inset-x-0 bottom-[7.15vw] -z-[5] flex justify-center"
	>
		<svg
			viewBox="0 0 2000 400"
			className="h-auto w-[clamp(26rem,100vw,125rem)] max-w-none"
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
						cx={1000}
						cy={orbit.cy}
						rx={orbit.rx}
						ry={orbit.ry}
						stroke="#C23370"
						strokeWidth="1.1"
						strokeOpacity={orbit.opacity}
						vectorEffect="non-scaling-stroke"
					/>
					<ellipse
						cx={1000}
						cy={orbit.cy}
						rx={orbit.rx}
						ry={orbit.ry}
						pathLength={100}
						stroke="#FF9DCB"
						strokeWidth="1.4"
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
