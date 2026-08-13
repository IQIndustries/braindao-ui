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

			{/* Top-anchored: bottom-anchoring pooled every extra pixel of a tall
			    viewport into the gap under the navbar. The bottom padding only
			    binds on short screens, holding the copy off the figure. */}
			<Container className="relative z-10 flex flex-1 flex-col justify-start pb-[10vh] pt-20 text-center sm:pb-[clamp(10rem,23vh,16rem)] sm:pt-[clamp(5rem,10.5vh,7rem)]">
				{/* White, not pink: the headline keyword already spends the accent
				    here, so a pink eyebrow above it doubles up. Section eyebrows
				    below the fold keep the pink. */}
				<Eyebrow icon="orbit" className="justify-center text-white">
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
