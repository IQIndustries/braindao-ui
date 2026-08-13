"use client";

import { useEffect, useRef } from "react";

// The loop's last frame (a bright plume) doesn't match its first (calm sky),
// so a native `loop` restart lands as a visible cut. Two staggered copies
// crossfade over the final stretch instead: the fresh one starts underneath
// while the ending one fades out over it.
const FADE_S = 1.4;

export function HeroScene() {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const videos = Array.from(
			containerRef.current?.querySelectorAll("video") ?? [],
		);
		if (videos.length < 2) return;

		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			for (const v of videos) v.pause();
			return;
		}

		let front = 0;
		let fadeTimer: number | undefined;

		const onTimeUpdate = (event: Event) => {
			const ending = event.currentTarget as HTMLVideoElement;
			const fresh = videos[1 - front];
			if (
				ending !== videos[front] ||
				!ending.duration ||
				ending.currentTime < ending.duration - FADE_S
			) {
				return;
			}
			fresh.currentTime = 0;
			fresh.style.zIndex = "0";
			// Snap the incoming copy opaque; animating it under the fading
			// one would dip the pair below full coverage mid-fade.
			fresh.style.transitionDuration = "0s";
			fresh.style.opacity = "1";
			fresh.play().catch(() => {});
			ending.style.zIndex = "1";
			ending.style.transitionDuration = `${FADE_S}s`;
			ending.style.opacity = "0";
			fadeTimer = window.setTimeout(() => ending.pause(), FADE_S * 1000);
			front = 1 - front;
		};

		for (const v of videos) v.addEventListener("timeupdate", onTimeUpdate);
		videos[0].play().catch(() => {});
		return () => {
			for (const v of videos) v.removeEventListener("timeupdate", onTimeUpdate);
			window.clearTimeout(fadeTimer);
		};
	}, []);

	return (
		<div
			ref={containerRef}
			className="pointer-events-none absolute inset-0 -z-[6]"
		>
			{[0, 1].map((i) => (
				<video
					key={i}
					muted
					playsInline
					preload="auto"
					autoPlay={i === 0}
					className="absolute inset-0 size-full object-cover object-bottom transition-opacity ease-linear"
					style={{ transitionDuration: `${FADE_S}s`, opacity: i === 0 ? 1 : 0 }}
				>
					<source
						src="/images/hero-scene-hevc.mp4"
						type='video/mp4; codecs="hvc1"'
					/>
					<source src="/images/hero-scene.mp4" type="video/mp4" />
				</video>
			))}
		</div>
	);
}
