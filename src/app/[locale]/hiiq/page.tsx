import { StatsPointers } from "@/components/layouts/stats-pointer";
import InViewAnimateBottom from "@/components/transitions/InViewAnimateBottom";
import { Button } from "@/components/ui/button";
import { getLockOverview } from "@/modules/getLockOverview";
import { getTvl } from "@/modules/getTVL";
import { numFormatter } from "@/modules/helpers/numFormatter";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

const SECTIONS = [
	"what",
	"how",
	"non-transferable",
	"decay",
	"rewards",
	"requirements",
] as const;

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("hiiq.meta");

	return {
		title: t("title"),
		description: t("description"),
		openGraph: {
			title: t("title"),
			description: t("description"),
			url: "https://braindao.org/hiiq",
			type: "website",
		},
	};
}

export default async function HiIQPage() {
	const [totalIqLocked, lockOverview, t] = await Promise.all([
		getTvl(),
		getLockOverview(),
		getTranslations("hiiq"),
	]);

	return (
		<div className="max-w-7xl mx-auto text-muted-foreground">
			<div className="px-4 xl:px-4 pt-32 md:pt-40 pb-12 sm:pb-20">
				<div className="max-w-3xl">
					<InViewAnimateBottom>
						<h1 className="text-foreground font-semibold font-satoshi text-4xl sm:text-5xl xl:text-6xl">
							{t("title")}
						</h1>
					</InViewAnimateBottom>
					<InViewAnimateBottom>
						<p className="mt-6 text-base xl:text-lg">{t("description")}</p>
					</InViewAnimateBottom>
					<InViewAnimateBottom>
						<Button asChild size="lg" className="mt-8">
							<Link
								href="https://iq.iqai.com/dashboard/stake"
								target="_blank"
								rel="noopener noreferrer"
								data-ph-capture-attribute-product-link-clicked="stake-iq"
							>
								{t("cta")}
							</Link>
						</Button>
					</InViewAnimateBottom>
				</div>

				<div className="grid sm:grid-cols-2 gap-12 xl:gap-6 mt-16">
					<StatsPointers
						title={`${numFormatter(totalIqLocked)} IQ`}
						content={t("stats.locked")}
						className="h-[80px] xl:h-[95px] justify-between"
					/>
					<StatsPointers
						title={`${numFormatter(lockOverview.totalHiiqSupply)} HiIQ`}
						content={t("stats.supply")}
						className="h-[80px] xl:h-[95px] justify-between"
					/>
				</div>

				<div className="grid md:grid-cols-2 gap-8 mt-20">
					{SECTIONS.map((section) => (
						<InViewAnimateBottom key={section}>
							<div className="h-full border border-neutral-800 rounded-2xl p-6 bg-neutral-950/60">
								<h2 className="text-foreground font-semibold font-satoshi text-xl xl:text-2xl">
									{t(`sections.${section}.title`)}
								</h2>
								<p className="mt-3 text-sm xl:text-base">
									{t(`sections.${section}.description`)}
								</p>
							</div>
						</InViewAnimateBottom>
					))}
				</div>

				<InViewAnimateBottom>
					<p className="mt-12 text-sm">
						{t.rich("source", {
							link: (chunks) => (
								<a
									href="https://iq.wiki/wiki/hiiq"
									target="_blank"
									rel="noopener noreferrer"
									className="text-primary hover:underline"
								>
									{chunks}
								</a>
							),
						})}
					</p>
				</InViewAnimateBottom>
			</div>
		</div>
	);
}
