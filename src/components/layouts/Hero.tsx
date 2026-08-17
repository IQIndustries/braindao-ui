import { getTranslations } from "next-intl/server";
import { HeroOrbits } from "./hero-orbits";
import { Container, Display, Eyebrow, PillLink } from "./section-kit";

export async function Hero() {
	const t = await getTranslations("introduction");

	return (
		<section className="relative isolate flex min-h-[27rem] flex-1 flex-col overflow-hidden sm:min-h-[34rem]">
			<video
				src="/images/hero-cosmic-mind-loop.mp4"
				autoPlay
				loop
				muted
				playsInline
				preload="auto"
				className="pointer-events-none absolute inset-0 -z-[6] size-full bg-canvas object-cover object-[50%_100%] [filter:saturate(.7)_brightness(.92)]"
			/>

			<div className="pointer-events-none absolute inset-0 -z-[5] bg-[linear-gradient(180deg,rgba(10,10,10,.88)_0%,rgba(10,10,10,.6)_34%,rgba(10,10,10,.22)_58%,rgba(10,10,10,.1)_86%,rgba(10,10,10,.92)_100%)]" />

			<HeroOrbits />

			<Container className="relative z-10 flex max-w-[880px] flex-1 flex-col justify-start pb-[10vh] pt-20 text-center sm:pb-[clamp(6rem,13vh,11rem)] sm:pt-[clamp(5rem,10.5vh,7rem)]">
				<Eyebrow icon="orbit" className="justify-center text-white">
					{t("eyebrow")}
				</Eyebrow>

				<Display as="h1" className="mt-5">
					{t.rich("title", {
						highlight: (chunks) => (
							<span className="text-primary">{chunks}</span>
						),
					})}
				</Display>

				<p className="mx-auto mt-6 max-w-[36rem] text-lg leading-relaxed text-neutral-300 text-pretty">
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
						variant="veil"
						className="h-12 px-7 text-[15px] font-semibold"
					>
						{t("secondary-cta")}
					</PillLink>
				</div>
			</Container>
		</section>
	);
}
