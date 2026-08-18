import { Decay } from "@/components/layouts/hiiq/decay";
import { Estimator } from "@/components/layouts/hiiq/estimator";
import { HiIQHero } from "@/components/layouts/hiiq/hero";
import { Mechanism } from "@/components/layouts/hiiq/mechanism";
import { Rewards } from "@/components/layouts/hiiq/rewards";
import { HiIQStats } from "@/components/layouts/hiiq/stats";
import { getLockOverview } from "@/modules/getLockOverview";
import { getTvl } from "@/modules/getTVL";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

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
	const [totalIqLocked, lockOverview] = await Promise.all([
		getTvl(),
		getLockOverview(),
	]);

	return (
		<main>
			<HiIQHero />
			<HiIQStats
				totalIqLocked={totalIqLocked}
				totalHiiqSupply={lockOverview.totalHiiqSupply}
			/>
			<Mechanism />
			<Estimator />
			<Decay />
			<Rewards />
		</main>
	);
}
