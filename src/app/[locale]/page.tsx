import { Hero } from "@/components/layouts/Hero";
import Ecosystem from "@/components/layouts/ecosystem";
import Markets from "@/components/layouts/markets";
import TokenOverview from "@/components/layouts/token-overview";
import TokenUtility from "@/components/layouts/token-utility";
import Treasury from "@/components/layouts/treasury";
import { fetchCoinMarketData } from "@/modules/fetchCoinMarketData";
import { getTvl } from "@/modules/getTVL";
import { getIqStats } from "./_actions";
import { IQStats } from "./_components/iq-stat";

export default async function Home() {
	const [tvl, marketData, iqStatsData] = await Promise.all([
		getTvl(),
		fetchCoinMarketData(),
		getIqStats(),
	]);

	const circulatingSupply = marketData?.circulatingSupply ?? null;

	return (
		<main>
			{/* Hero and the stats strip share one viewport frame: the strip sits
			    below the scene, so the rings and figure end at its top edge. The
			    frame stops short of a full viewport so the next section breaks
			    the fold — without that peek the page reads as a dead end. */}
			<div className="flex min-h-[84svh] flex-col">
				<Hero />
				<IQStats
					iqStatsData={iqStatsData}
					circulatingSupply={circulatingSupply}
					totalIqLocked={tvl}
				/>
			</div>
			<TokenOverview />
			<Markets />
			<TokenUtility />
			<Treasury totalIqLocked={tvl} circulatingSupply={circulatingSupply} />
			<Ecosystem />
		</main>
	);
}
