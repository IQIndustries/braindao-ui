// Ratios lifted from the design: three concentric rings on a shallow tilted
// plane, the outer one spanning ~71% of the viewport.
const ORBITS = [
	{ rx: 262, ry: 36, duration: "9s", delay: "-2.1s", opacity: 0.8 },
	{ rx: 474, ry: 64, duration: "14s", delay: "-6.4s", opacity: 0.68 },
	{ rx: 712, ry: 92, duration: "20s", delay: "-1.5s", opacity: 0.56 },
];

export const HeroOrbits = () => (
	<div
		aria-hidden="true"
		className="pointer-events-none absolute inset-x-0 bottom-[14%] -z-[5] flex justify-center"
	>
		<svg
			viewBox="0 0 2000 460"
			className="h-auto w-[42rem] max-w-none sm:w-[130%] lg:w-full"
			fill="none"
			role="presentation"
		>
			<defs>
				<filter id="orbit-glow" x="-10%" y="-80%" width="120%" height="260%">
					<feGaussianBlur stdDeviation="5" result="blur" />
					<feMerge>
						<feMergeNode in="blur" />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
			</defs>

			<g transform="rotate(1.4 1000 230)">
				{ORBITS.map((orbit) => (
					<g key={orbit.rx}>
						<ellipse
							cx="1000"
							cy="230"
							rx={orbit.rx}
							ry={orbit.ry}
							stroke="#FF1A88"
							strokeWidth="1.8"
							strokeOpacity={orbit.opacity}
						/>
						<ellipse
							cx="1000"
							cy="230"
							rx={orbit.rx}
							ry={orbit.ry}
							pathLength={100}
							stroke="#FFC2E1"
							strokeWidth="2.2"
							strokeLinecap="round"
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
