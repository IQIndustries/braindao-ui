import { IqWikiIcon } from "@/components/icons/iq-wiki";
import { numFormatter } from "@/modules/helpers/numFormatter";
import { getTranslations } from "next-intl/server";
import { FaCoins, FaLock } from "react-icons/fa6";
import { RiGlobalLine } from "react-icons/ri";
import type { getIqStats } from "../_actions";
import { TokenCard } from "./token-metric";

type IQStatsData = Awaited<ReturnType<typeof getIqStats>>;

interface IQStatsProps {
	iqStatsData: IQStatsData;
	circulatingSupply: number | null;
	totalIqLocked: number;
}

export async function IQStats({
	iqStatsData,
	circulatingSupply,
	totalIqLocked,
}: IQStatsProps) {
	const t = await getTranslations("introduction");
	const {
		price,
		iqPriceChange,
		mcap,
		iqMCapChange,
		formattedPriceChange,
		formattedMCapChange,
	} = iqStatsData;

	return (
		<section className="relative w-full -mt-8 md:-mt-12 lg:-mt-16 py-4 md:py-6 lg:py-4">
			<div className="relative z-10 max-w-7xl mx-auto p-4">
				<div className="flex flex-col md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-4 text-foreground">
					<TokenCard
						title={t("stats.iq-price-title")}
						value={price}
						change={{
							iqChange: iqPriceChange,
							formattedChange: formattedPriceChange,
						}}
						icon={<IqWikiIcon className="w-6 h-6" aria-hidden="true" />}
						link="https://iq.iqai.com/dashboard"
						errorMessage={t("stats.errors.iq-price")}
					/>

					<TokenCard
						title={t("stats.market-cap-title")}
						value={mcap}
						change={{
							iqChange: iqMCapChange ?? null,
							formattedChange: formattedMCapChange ?? null,
						}}
						icon={
							<RiGlobalLine
								size="1.5em"
								className="text-primary"
								aria-hidden="true"
							/>
						}
						link="https://iq.iqai.com/dashboard"
						errorMessage={t("stats.errors.market-cap")}
					/>

					<TokenCard
						title={t("stats.circulating-supply-title")}
						value={
							circulatingSupply ? `${numFormatter(circulatingSupply)} IQ` : null
						}
						icon={
							<FaCoins
								size="1.5em"
								className="text-primary"
								aria-hidden="true"
							/>
						}
						link="https://iq.iqai.com/dashboard"
						errorMessage={t("stats.errors.circulating-supply")}
					/>

					<TokenCard
						title={t("stats.total-locked-title")}
						value={totalIqLocked ? `${numFormatter(totalIqLocked)} IQ` : null}
						icon={
							<FaLock
								size="1.5em"
								className="text-primary"
								aria-hidden="true"
							/>
						}
						link="/hiiq"
						external={false}
						errorMessage={t("stats.errors.total-locked")}
					/>
				</div>
			</div>
		</section>
	);
}
