import { Hero } from "@/components/layouts/Hero";
import Markets from "@/components/layouts/markets";
import TokenUtility from "@/components/layouts/token-utility";
import Treasury from "@/components/layouts/treasury";
import { fetchCoinMarketData } from "@/modules/fetchCoinMarketData";
import { getLockOverview } from "@/modules/getLockOverview";
import { getTvl } from "@/modules/getTVL";
import { getIqStats } from "./_actions";
import { IQStats } from "./_components/iq-stat";

export default async function Home() {
	const [tvl, marketData, lockOverview, iqStatsData] = await Promise.all([
		getTvl(),
		fetchCoinMarketData(),
		getLockOverview(),
		getIqStats(),
	]);

	const { totalHiiqSupply } = lockOverview;

	return (
		<div className="max-w-7xl mx-auto">
			<Hero />
			<IQStats
				iqStatsData={iqStatsData}
				circulatingSupply={marketData?.circulatingSupply ?? null}
				totalIqLocked={tvl}
			/>
			<TokenUtility />
			<Markets />
			<Treasury totalIqLocked={tvl} totalHiiqSupply={totalHiiqSupply} />
		</div>
	);
}
