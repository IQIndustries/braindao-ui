import { env } from "@/env";
import { unstable_cache } from "next/cache";
import { DATA_REVALIDATE_SECONDS } from "./cache";

const CACHE_TIME = 60 * 60 * 24;
export const formatNumber = new Intl.NumberFormat("en", {
	notation: "compact",
}).format;

const fetchMarketData = unstable_cache(
	async () => {
		const proxyUrl = new URL(env.NEXT_PUBLIC_IQ_GATEWAY_URL);
		const targetUrl =
			"https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=everipedia";

		proxyUrl.searchParams.append("url", targetUrl);
		proxyUrl.searchParams.append("cacheDuration", CACHE_TIME.toString());

		const response = await fetch(proxyUrl.href, {
			headers: {
				"x-api-key": env.NEXT_PUBLIC_IQ_GATEWAY_KEY,
			},
		});

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const data = await response.json();
		const tokenDetails = data[0];

		if (!tokenDetails) {
			throw new Error("No token returned by the market data proxy");
		}

		return {
			circulatingSupply: tokenDetails.circulating_supply as number,
			marketCap: tokenDetails.market_cap as number,
			volume: tokenDetails.total_volume as number,
		};
	},
	["iq-coin-market-data"],
	{ revalidate: DATA_REVALIDATE_SECONDS },
);

export const fetchCoinMarketData = async () => {
	try {
		return await fetchMarketData();
	} catch (error) {
		console.error("Error fetching data:", error);
		return null;
	}
};
