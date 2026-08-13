import { getTranslations } from "next-intl/server";
import { HeroOrbits } from "./hero-orbits";
import { HeroScene } from "./hero-scene";
import { HeroSky } from "./hero-sky";
import { Container, Display, Eyebrow, PillLink } from "./section-kit";

export async function Hero() {
	const t = await getTranslations("introduction");

	return (
		<section className="relative isolate flex min-h-[27rem] flex-1 flex-col overflow-hidden sm:min-h-[34rem]">
			<HeroSky />

			{/* The design's whole scene — sky, dust dissolve and figure — is a
			    video loop. It sits over the SVG sky, which covers the first
			    paint, and under the rings. Bottom-anchored so the horizon glow
			    meets the stats strip at every aspect ratio. */}
			<HeroScene />

			<HeroOrbits />

			{/* Bottom padding sized so the hero plus the stats strip close at
			    100svh on the design's 1440x800 frame, with the CTA row settling
			    into the rings just above the figure. */}
			<Container className="relative z-10 flex flex-1 flex-col justify-end pb-[10vh] pt-20 text-center sm:pb-[13vw]">
				<Eyebrow glyph="⊕" className="justify-center text-neutral-300">
					{t("eyebrow")}
				</Eyebrow>

				<Display
					as="h1"
					className="mx-auto mt-5 max-w-[10.5em] text-[clamp(2.6rem,6.4vw,5.75rem)] leading-[1.06] tracking-[-0.01em] text-pretty sm:text-[clamp(2.6rem,6.4vw,5.75rem)] lg:text-[clamp(2.6rem,6.4vw,5.75rem)]"
				>
					{t.rich("title", {
						highlight: (chunks) => (
							<span className="text-primary">{chunks}</span>
						),
					})}
				</Display>

				<p className="mx-auto mt-6 max-w-[36rem] text-[clamp(1.0625rem,1.25vw,1.125rem)] leading-relaxed text-neutral-300 text-pretty">
					{t("description")}
				</p>

				<div className="mt-8 flex flex-wrap items-center justify-center gap-3">
					<PillLink
						href="https://iq.iqai.com/dashboard/stake"
						external
						analyticsKey="stake-iq"
						className="h-12 px-7 text-[15px] font-semibold"
					>
						{t("primary-cta")}
					</PillLink>
					<PillLink
						href="/hiiq"
						variant="outline"
						className="h-12 border-white/25 bg-transparent px-7 text-[15px] font-semibold hover:bg-white/[0.06]"
					>
						{t("secondary-cta")}
					</PillLink>
				</div>
			</Container>
		</section>
	);
}
