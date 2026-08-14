import { getTranslations } from "next-intl/server";
import { HeroOrbits } from "./hero-orbits";
import { Container, Display, Eyebrow, PillLink } from "./section-kit";

export async function Hero() {
	const t = await getTranslations("introduction");

	return (
		<section className="relative isolate flex min-h-[27rem] flex-1 flex-col overflow-hidden sm:min-h-[34rem]">
			{/* The whole scene — sky, dust dissolve and figure — is one clip,
			    pre-baked as a seamless loop: its tail is crossfaded back into
			    its head in the encode, so a plain `loop` restart is a clean
			    one-frame step. Do not re-trim or re-encode it. Oversized and
			    bottom-anchored so the top of the frame never shows. */}
			<video
				src="/images/hero-cosmic-mind-loop.mp4"
				autoPlay
				loop
				muted
				playsInline
				preload="auto"
				className="pointer-events-none absolute inset-x-0 bottom-0 -z-[6] h-[137%] w-full bg-canvas object-cover object-[50%_100%] [filter:saturate(.7)_brightness(.92)]"
			/>

			{/* Legibility at the top, and a dark bottom edge that hands off to
			    the stats strip. */}
			<div className="pointer-events-none absolute inset-0 -z-[5] bg-[linear-gradient(180deg,rgba(10,10,11,.88)_0%,rgba(10,10,11,.6)_34%,rgba(10,10,11,.22)_58%,rgba(10,10,11,.1)_86%,rgba(10,10,11,.92)_100%)]" />

			<HeroOrbits />

			{/* Top-anchored: bottom-anchoring pooled every extra pixel of a tall
			    viewport into the gap under the navbar. The bottom padding only
			    binds on short screens, holding the copy off the figure. */}
			<Container className="relative z-10 flex max-w-[880px] flex-1 flex-col justify-start pb-[10vh] pt-20 text-center sm:pb-[clamp(10rem,23vh,16rem)] sm:pt-[clamp(5rem,10.5vh,7rem)]">
				{/* White, not pink: the headline keyword already spends the accent
				    here, so a pink eyebrow above it doubles up. Section eyebrows
				    below the fold keep the pink. */}
				<Eyebrow icon="orbit" className="justify-center text-white">
					{t("eyebrow")}
				</Eyebrow>

				<Display as="h1" className="mt-5">
					{t.rich("title", {
						highlight: (chunks) => (
							<span className="italic text-primary">{chunks}</span>
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
