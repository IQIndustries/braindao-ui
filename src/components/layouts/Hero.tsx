import { existsSync } from "node:fs";
import { join } from "node:path";
import { getTranslations } from "next-intl/server";
import { HeroOrbits } from "./hero-orbits";
import { HeroSky } from "./hero-sky";
import { Container, Display, Eyebrow, PillLink } from "./section-kit";

// The design centres a cut-out figure whose head dissolves into the dust field.
// Drop that PNG in and it composites between the rings and the copy; without it
// the sky and rings stand on their own.
const FIGURE_SRC = "/images/hero-figure.png";
const hasFigure = existsSync(join(process.cwd(), "public", FIGURE_SRC));

export async function Hero() {
	const t = await getTranslations("introduction");

	return (
		<section className="relative isolate flex min-h-[27rem] flex-1 flex-col overflow-hidden sm:min-h-[34rem]">
			<HeroSky />
			<HeroOrbits />

			{hasFigure && (
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-x-0 bottom-0 -z-[4] h-[62%] bg-contain bg-bottom bg-no-repeat"
					style={{ backgroundImage: `url(${FIGURE_SRC})` }}
				/>
			)}

			{/* Asymmetric padding: the copy centres in the space left over, and the
			    bottom reserve is where the orbit plane sits. */}
			<Container className="relative z-10 flex flex-1 flex-col justify-center pb-[13vh] pt-24 text-center sm:pb-[16vh] sm:pt-28">
				<Eyebrow glyph="⊕" className="justify-center text-neutral-300">
					{t("eyebrow")}
				</Eyebrow>

				<Display
					as="h1"
					className="mx-auto mt-5 max-w-[52rem] text-[clamp(2.35rem,4.7vw,5.6rem)] leading-[1.06] tracking-[-0.01em] text-pretty"
				>
					{t.rich("title", {
						highlight: (chunks) => (
							<span className="text-primary">{chunks}</span>
						),
					})}
				</Display>

				<p className="mx-auto mt-6 max-w-[34rem] text-[17px] leading-relaxed text-neutral-300 text-pretty">
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
