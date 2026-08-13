const ORBITS = [
	{ rx: 168, ry: 40, duration: "8s", delay: "-1.2s", opacity: 0.55 },
	{ rx: 252, ry: 60, duration: "11s", delay: "-4s", opacity: 0.45 },
	{ rx: 344, ry: 82, duration: "14s", delay: "-2.4s", opacity: 0.36 },
	{ rx: 444, ry: 106, duration: "18s", delay: "-6.5s", opacity: 0.28 },
	{ rx: 552, ry: 132, duration: "23s", delay: "-9s", opacity: 0.2 },
];

export const HeroOrbits = () => (
	<div
		aria-hidden="true"
		className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center"
	>
		<svg
			viewBox="0 0 1200 420"
			className="h-auto w-[880px] max-w-none sm:w-[1080px] lg:w-[1240px]"
			fill="none"
			role="presentation"
		>
			<defs>
				<filter id="orbit-glow" x="-20%" y="-60%" width="140%" height="220%">
					<feGaussianBlur stdDeviation="4" result="blur" />
					<feMerge>
						<feMergeNode in="blur" />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
				<radialGradient id="orbit-core" cx="50%" cy="50%" r="50%">
					<stop offset="0%" stopColor="#FF1A88" stopOpacity="0.34" />
					<stop offset="100%" stopColor="#FF1A88" stopOpacity="0" />
				</radialGradient>
			</defs>

			<ellipse cx="600" cy="286" rx="290" ry="72" fill="url(#orbit-core)" />

			<g transform="rotate(-5 600 286)">
				{ORBITS.map((orbit) => (
					<g key={orbit.rx}>
						<ellipse
							cx="600"
							cy="286"
							rx={orbit.rx}
							ry={orbit.ry}
							stroke="#FF1A88"
							strokeWidth="1"
							strokeOpacity={orbit.opacity}
							className="orbit-pulse"
							style={{ "--orbit-delay": orbit.delay } as React.CSSProperties}
						/>
						<ellipse
							cx="600"
							cy="286"
							rx={orbit.rx}
							ry={orbit.ry}
							pathLength={100}
							stroke="#FFB3D9"
							strokeWidth="1.6"
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
