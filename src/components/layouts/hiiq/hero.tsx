import {
	Container,
	Display,
	Eyebrow,
	PillLink,
} from "@/components/layouts/section-kit";
import { getTranslations } from "next-intl/server";

const CHIPS = ["boost", "model", "transfer", "rewards"] as const;

export const HiIQHero = async () => {
	const t = await getTranslations("hiiq");

	return (
		<section className="relative isolate overflow-hidden">
			<div aria-hidden="true" className="absolute inset-0 -z-10">
				<div className="absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(ellipse_48%_58%_at_50%_-6%,rgba(255,26,136,0.2),transparent_72%)]" />
				{/* The grid is the only thing standing in for the homepage's hero video,
				    so it stays faint and is masked off well before the stats band. */}
				<div className="absolute left-1/2 top-0 h-[420px] w-[min(960px,100%)] -translate-x-1/2 [background-image:linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_58%_62%_at_50%_16%,black,transparent_74%)]" />
			</div>

			<Container className="max-w-[880px] pb-20 pt-32 text-center sm:pt-40">
				{/* Neutral, not the sections' pink: the glow behind the title is
				    already carrying the colour up here. */}
				<Eyebrow icon="lock" className="justify-center text-neutral-400">
					{t("eyebrow")}
				</Eyebrow>

				<Display as="h1" className="mt-5">
					{t.rich("title", {
						highlight: (chunks) => (
							<span className="text-primary">{chunks}</span>
						),
					})}
				</Display>

				<p className="mx-auto mt-6 max-w-[34rem] text-base leading-[1.75] text-neutral-400 text-pretty">
					{t("description")}
				</p>

				{/* The hero's pair sits a size above the shared pill, which is scaled
				    for section footers rather than a centred hero. */}
				<div className="mt-9 flex flex-wrap items-center justify-center gap-3">
					<PillLink
						href="https://iq.iqai.com/dashboard/stake"
						external
						analyticsKey="hiiq-stake-iq"
						className="h-11 px-7 text-[15px]"
					>
						{t("primary-cta")}
					</PillLink>
					<PillLink
						href="https://iq.wiki/wiki/hiiq"
						variant="outline"
						external
						analyticsKey="hiiq-wiki"
						className="h-11 px-7 text-[15px]"
					>
						{t("secondary-cta")}
					</PillLink>
				</div>

				<div className="mt-11 flex flex-wrap items-center justify-center gap-3">
					{CHIPS.map((chip) => (
						<span
							key={chip}
							className="rounded-lg border border-rule-control bg-surface-raised px-3.5 py-2 font-mono text-[13px] leading-4 text-neutral-400"
						>
							{t.rich(`chips.${chip}`, {
								iq: (chunks) => <span className="text-primary">{chunks}</span>,
							})}
						</span>
					))}
				</div>
			</Container>
		</section>
	);
};
