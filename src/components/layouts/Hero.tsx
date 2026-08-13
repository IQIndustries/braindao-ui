import { getTranslations } from "next-intl/server";
import { HeroOrbits } from "./hero-orbits";
import { Container, Display, Eyebrow, PillLink } from "./section-kit";

const GRAIN =
	"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export async function Hero() {
	const t = await getTranslations("introduction");

	return (
		<section className="relative isolate overflow-hidden">
			<div aria-hidden="true" className="absolute inset-0 -z-10">
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_58%_46%_at_50%_30%,rgba(255,26,136,0.20),transparent_72%)]" />
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_34%_28%_at_50%_10%,rgba(150,60,255,0.16),transparent_70%)]" />
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_32%_20%_at_50%_80%,rgba(255,26,136,0.10),transparent_72%)]" />
				<div
					className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
					style={{ backgroundImage: GRAIN }}
				/>
				<div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-black" />
			</div>

			<Container className="relative z-10 pb-56 pt-32 text-center sm:pb-64 sm:pt-36 lg:pb-72 lg:pt-40">
				<Eyebrow glyph="◉" className="justify-center">
					{t("eyebrow")}
				</Eyebrow>

				<Display as="h1" className="mx-auto mt-6 max-w-4xl">
					{t.rich("title", {
						highlight: (chunks) => (
							<span className="text-primary">{chunks}</span>
						),
					})}
				</Display>

				<p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-neutral-400 text-pretty">
					{t("description")}
				</p>

				<div className="mt-9 flex flex-wrap items-center justify-center gap-3">
					<PillLink
						href="https://iq.iqai.com/dashboard/stake"
						external
						analyticsKey="stake-iq"
					>
						{t("primary-cta")}
					</PillLink>
					<PillLink href="/hiiq" variant="outline">
						{t("secondary-cta")}
					</PillLink>
				</div>
			</Container>

			<HeroOrbits />
		</section>
	);
}
