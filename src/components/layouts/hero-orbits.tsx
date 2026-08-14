import type React from "react";

// Authored in the video's own pixel space and painted over the exact same box
// (xMidYMax slice mirrors object-cover + object-position 50% 100%), so the rings
// stay welded to the figure at every viewport instead of being re-tuned per width.
// They read as one tilted plane, so ry tracks rx at a fixed ratio and cy drifts
// down as they widen — break either and they stop looking concentric.
const RINGS = [
	{ rx: 400, ry: 99, cy: 683, duration: "10s", delay: "0s" },
	{ rx: 790, ry: 195, cy: 719, duration: "18s", delay: "-6s" },
];

export const HeroOrbits = () => (
	<svg
		viewBox="0 0 1756 986"
		preserveAspectRatio="xMidYMax slice"
		aria-hidden="true"
		role="presentation"
		className="pointer-events-none absolute inset-0 -z-[5] size-full"
	>
		<defs>
			<filter id="hero-head-soft" x="-40%" y="-40%" width="180%" height="180%">
				<feGaussianBlur stdDeviation="24" />
			</filter>
			{/* Rings dim toward the top of their band and vanish behind her head,
			    which is what sells them as orbiting rather than overlaid. */}
			<linearGradient
				id="hero-ring-fade"
				x1="0"
				y1="560"
				x2="0"
				y2="775"
				gradientUnits="userSpaceOnUse"
			>
				<stop offset="0" stopColor="#3a3a3a" />
				<stop offset="1" stopColor="#ffffff" />
			</linearGradient>
			<mask id="hero-ring-mask">
				<rect
					x="-200"
					y="-200"
					width="2160"
					height="1400"
					fill="url(#hero-ring-fade)"
				/>
				<ellipse
					cx="869"
					cy="718"
					rx="115"
					ry="153"
					fill="#000"
					filter="url(#hero-head-soft)"
				/>
			</mask>
		</defs>

		<g mask="url(#hero-ring-mask)">
			{RINGS.map((ring) => (
				<g key={ring.rx}>
					<ellipse
						cx="869"
						cy={ring.cy}
						rx={ring.rx}
						ry={ring.ry}
						fill="none"
						stroke="rgba(255,255,255,.13)"
						strokeWidth="1.2"
					/>
					<ellipse
						cx="869"
						cy={ring.cy}
						rx={ring.rx}
						ry={ring.ry}
						pathLength={1000}
						fill="none"
						stroke="#FF1A88"
						strokeWidth="2"
						strokeLinecap="round"
						opacity="0.85"
						className="hero-ring-lit"
						style={
							{
								"--ring-duration": ring.duration,
								"--ring-delay": ring.delay,
							} as React.CSSProperties
						}
					/>
				</g>
			))}
		</g>
	</svg>
);
