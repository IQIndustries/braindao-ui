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
				<filter id="orbit-soften" x="-50%" y="-50%" width="200%" height="200%">
					<feGaussianBlur stdDeviation="12" />
				</filter>
				{/* The scene video renders below the rings, so the figure can't
				    occlude them; this soft column over her silhouette makes the
				    arcs read as passing behind her like the design. */}
				<mask id="orbit-occlude">
					<rect x="0" y="0" width="2000" height="400" fill="#fff" />
					<g filter="url(#orbit-soften)">
						<rect
							x="905"
							y="110"
							width="120"
							height="140"
							rx="55"
							fill="#000"
						/>
						<rect
							x="835"
							y="215"
							width="325"
							height="185"
							rx="70"
							fill="#000"
						/>
					</g>
				</mask>
			</defs>

			<g mask="url(#orbit-occlude)">
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
			</g>
		</svg>
	</div>
);
