import { Hero } from "@/components/layouts/Hero";
import Ecosystem from "@/components/layouts/ecosystem";
import Markets from "@/components/layouts/markets";
import TokenOverview from "@/components/layouts/token-overview";
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
	const circulatingSupply = marketData?.circulatingSupply ?? null;

	return (
		<main>
			<Hero />
			<IQStats
				iqStatsData={iqStatsData}
				circulatingSupply={circulatingSupply}
				totalIqLocked={tvl}
			/>
			<TokenOverview />
			<Markets />
			<TokenUtility />
			<Treasury
				totalIqLocked={tvl}
				totalHiiqSupply={totalHiiqSupply}
				circulatingSupply={circulatingSupply}
			/>
			<Ecosystem />
		</main>
	);
}
