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
		<section className="relative isolate flex min-h-[92svh] flex-col overflow-hidden pb-24 sm:pb-28">
			<HeroSky />
			<HeroOrbits />

			{hasFigure && (
				<div
					aria-hidden="true"
					className="pointer-events-none absolute inset-x-0 bottom-0 -z-[4] h-[62%] bg-contain bg-bottom bg-no-repeat"
					style={{ backgroundImage: `url(${FIGURE_SRC})` }}
				/>
			)}

			<Container className="relative z-10 pt-[15vh] text-center">
				<Eyebrow glyph="⊕" className="justify-center text-neutral-300">
					{t("eyebrow")}
				</Eyebrow>

				<Display
					as="h1"
					className="mx-auto mt-6 max-w-[54rem] text-[clamp(2.5rem,4.9vw,6.5rem)] leading-[1.08] tracking-[-0.015em] text-pretty"
				>
					{t.rich("title", {
						highlight: (chunks) => (
							<span className="text-primary">{chunks}</span>
						),
					})}
				</Display>

				<p className="mx-auto mt-7 max-w-[34rem] text-[17px] leading-relaxed text-neutral-300 text-pretty">
					{t("description")}
				</p>

				<div className="mt-9 flex flex-wrap items-center justify-center gap-3">
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
						className="h-12 border-white/20 bg-black/40 px-7 text-[15px] font-semibold backdrop-blur-sm"
					>
						{t("secondary-cta")}
					</PillLink>
				</div>
			</Container>
		</section>
	);
}
