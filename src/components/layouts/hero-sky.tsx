// Positions are drawn from a fixed seed so the server and client agree; a live
// Math.random() here would hydrate as a mismatch.
const seeded = (seed: number) => {
	let state = seed;
	return () => {
		state = (state * 1664525 + 1013904223) % 4294967296;
		return state / 4294967296;
	};
};

const VIEW_W = 2000;
const VIEW_H = 1150;

const STARS = (() => {
	const rand = seeded(20240513);
	return Array.from({ length: 260 }, (_, i) => {
		const t = rand();
		return {
			id: i,
			cx: rand() * VIEW_W,
			// Biased upward: the field thins out as it approaches the horizon.
			cy: VIEW_H * 0.72 * t ** 1.7,
			r: 0.7 + rand() * 1.7,
			opacity: 0.18 + rand() * 0.72,
			pink: rand() > 0.72,
		};
	});
})();

// The design's dust field clumps into dense pink swarms rather than an even
// scatter. Each cluster is a diagonal streak of dots thinning outward.
const CLUSTER_CORES = [
	{ x: 545, y: 370, spread: 130, tilt: 0.5, count: 55 },
	{ x: 1500, y: 150, spread: 220, tilt: 0.65, count: 90 },
	{ x: 1660, y: 540, spread: 110, tilt: 0.4, count: 45 },
	{ x: 870, y: 90, spread: 100, tilt: 0.55, count: 35 },
	// Thickens the figure's head-dissolve so the first paint hints at it
	// before the scene video loads.
	{ x: 1090, y: 665, spread: 105, tilt: 0.35, count: 30 },
];

const CLUSTERS = (() => {
	const rand = seeded(1729);
	return CLUSTER_CORES.flatMap((core, c) =>
		Array.from({ length: core.count }, (_, i) => {
			// Sum of two rands ≈ triangular: dots pile up near the core.
			const d = (rand() + rand() - 1) * core.spread;
			const off = (rand() + rand() - 1) * core.spread * 0.35;
			return {
				id: `${c}-${i}`,
				cx: core.x + d,
				cy: core.y - d * core.tilt + off,
				r: 0.8 + rand() * 2.1,
				opacity: 0.25 + rand() * 0.7,
				bright: rand() > 0.8,
			};
		}),
	);
})();

const SPARKLES = [
	{ x: 1522, y: 34, s: 26 },
	{ x: 1637, y: 92, s: 15 },
	{ x: 1594, y: 570, s: 17 },
	{ x: 517, y: 372, s: 13 },
	{ x: 1051, y: 745, s: 11 },
	{ x: 296, y: 646, s: 9 },
];

export const HeroSky = () => (
	<div aria-hidden="true" className="absolute inset-0 -z-10 bg-canvas">
		<svg
			viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
			preserveAspectRatio="xMidYMid slice"
			className="absolute inset-0 size-full"
			role="presentation"
		>
			<defs>
				{/* Sampled off the design capture: the horizon glow is a muted plum
				    (~#261829 at its brightest) hugging the very bottom of the frame. */}
				<radialGradient id="sky-haze" cx="50%" cy="96%" r="70%">
					<stop offset="0%" stopColor="#8A4090" stopOpacity="0.3" />
					<stop offset="45%" stopColor="#3A1C46" stopOpacity="0.14" />
					<stop offset="100%" stopColor="#0E0E10" stopOpacity="0" />
				</radialGradient>
				{/* Deepens the top of the sky so the haze reads as a horizon glow. */}
				<linearGradient id="sky-vault" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stopColor="#05070C" stopOpacity="0.95" />
					<stop offset="55%" stopColor="#05070C" stopOpacity="0" />
				</linearGradient>
				<radialGradient id="sky-crown" cx="50%" cy="95%" r="34%">
					<stop offset="0%" stopColor="#FF2D94" stopOpacity="0.1" />
					<stop offset="100%" stopColor="#FF2D94" stopOpacity="0" />
				</radialGradient>
				{/* Ragged lower edge where the dust field breaks against the haze. */}
				<filter id="sky-tear" x="-15%" y="-15%" width="130%" height="130%">
					<feTurbulence
						type="fractalNoise"
						baseFrequency="0.004 0.009"
						numOctaves="4"
						seed="11"
						result="noise"
					/>
					<feDisplacementMap
						in="SourceGraphic"
						in2="noise"
						scale="230"
						xChannelSelector="R"
						yChannelSelector="G"
					/>
					<feGaussianBlur stdDeviation="6" />
				</filter>

				<filter id="sky-filament" x="-25%" y="-25%" width="150%" height="150%">
					<feTurbulence
						type="fractalNoise"
						baseFrequency="0.013"
						numOctaves="3"
						seed="4"
						result="noise"
					/>
					<feDisplacementMap
						in="SourceGraphic"
						in2="noise"
						scale="140"
						xChannelSelector="R"
						yChannelSelector="G"
					/>
					<feGaussianBlur stdDeviation="10" />
				</filter>

				<filter id="sky-bloom" x="-200%" y="-200%" width="500%" height="500%">
					<feGaussianBlur stdDeviation="3" result="b" />
					<feMerge>
						<feMergeNode in="b" />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>

				<mask id="sky-dust-mask">
					<rect
						x="-140"
						y="-300"
						width={VIEW_W + 280}
						height={VIEW_H * 0.66 + 300}
						fill="#fff"
						filter="url(#sky-tear)"
					/>
				</mask>
			</defs>

			<rect width={VIEW_W} height={VIEW_H} fill="url(#sky-vault)" />
			<rect width={VIEW_W} height={VIEW_H} fill="url(#sky-haze)" />
			<rect width={VIEW_W} height={VIEW_H} fill="url(#sky-crown)" />

			<g mask="url(#sky-dust-mask)">
				{/* The design's cloud masses lean blue-black, darker than the sky. */}
				<rect width={VIEW_W} height={VIEW_H} fill="#060C13" />

				<g filter="url(#sky-filament)" opacity="0.16">
					<ellipse cx="1330" cy="130" rx="290" ry="18" fill="#FF5AAC" />
					<ellipse cx="1560" cy="255" rx="170" ry="12" fill="#B26BE8" />
					<ellipse cx="545" cy="405" rx="150" ry="26" fill="#FF5AAC" />
					<ellipse cx="1015" cy="285" rx="120" ry="70" fill="#8E4BC8" />
				</g>
			</g>

			{STARS.map((star) => (
				<circle
					key={star.id}
					cx={star.cx}
					cy={star.cy}
					r={star.r}
					fill={star.pink ? "#FF7AC0" : "#FFFFFF"}
					opacity={star.opacity}
				/>
			))}

			{CLUSTERS.map((dot) => (
				<circle
					key={dot.id}
					cx={dot.cx}
					cy={dot.cy}
					r={dot.r}
					fill={dot.bright ? "#FFB7DB" : "#FF4FA3"}
					opacity={dot.opacity}
				/>
			))}

			<g filter="url(#sky-bloom)">
				{SPARKLES.map((sparkle) => (
					<path
						key={`${sparkle.x}-${sparkle.y}`}
						d={`M${sparkle.x} ${sparkle.y - sparkle.s}Q${sparkle.x} ${sparkle.y} ${sparkle.x + sparkle.s} ${sparkle.y}Q${sparkle.x} ${sparkle.y} ${sparkle.x} ${sparkle.y + sparkle.s}Q${sparkle.x} ${sparkle.y} ${sparkle.x - sparkle.s} ${sparkle.y}Q${sparkle.x} ${sparkle.y} ${sparkle.x} ${sparkle.y - sparkle.s}Z`}
						fill="#FFD9EC"
						opacity="0.85"
					/>
				))}
			</g>
		</svg>

		{/* Outside the SVG: preserveAspectRatio="slice" crops the viewBox edges, so
		    an in-SVG floor would land above the real bottom of the section. */}
		<div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-canvas" />

		<div
			className="absolute inset-0 opacity-[0.14] mix-blend-overlay"
			style={{
				backgroundImage:
					"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
			}}
		/>
	</div>
);
