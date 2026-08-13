import { existsSync } from "node:fs";
import { join } from "node:path";
import { getTranslations } from "next-intl/server";
import { HeroOrbits } from "./hero-orbits";
import { HeroSky } from "./hero-sky";
import { Container, Display, Eyebrow, PillLink } from "./section-kit";

// The design centres a cut-out figure whose head dissolves into the dust field.
// Drop that export in (any of these formats) and it composites between the
// rings and the copy; without it the sky and rings stand on their own.
const figureSrc = ["gif", "webp", "png"]
	.map((ext) => `/images/hero-figure.${ext}`)
	.find((src) => existsSync(join(process.cwd(), "public", src)));

export async function Hero() {
	const t = await getTranslations("introduction");

	return (
		<section className="relative isolate flex min-h-[27rem] flex-1 flex-col overflow-hidden sm:min-h-[34rem]">
			<HeroSky />
			<HeroOrbits />

			{figureSrc && (
				<div
					aria-hidden="true"
					className="pointer-events-none absolute bottom-0 left-[55.5vw] -z-[4] w-[clamp(15rem,33vw,41.25rem)] -translate-x-1/2"
				>
					{/* The crop is a rectangle out of the design frame, so its edges are
					    faded into the sky; the dust clusters continue the dissolve above. */}
					<img
						src={figureSrc}
						alt=""
						className="w-full"
						style={{
							WebkitMaskImage:
								"linear-gradient(to bottom, transparent 0%, black 22%), linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
							WebkitMaskComposite: "source-in",
							maskImage:
								"linear-gradient(to bottom, transparent 0%, black 22%), linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
							maskComposite: "intersect",
						}}
					/>
				</div>
			)}

			{/* Bottom padding in vw keeps the CTA row riding just above the inner
			    ring's top arc, which is drawn 19.25vw above the hero's bottom edge. */}
			<Container className="relative z-10 flex flex-1 flex-col justify-end pb-[15vh] pt-20 text-center sm:pb-[21vw] sm:pt-24">
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
