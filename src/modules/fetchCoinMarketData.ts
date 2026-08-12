import { env } from "@/env";

const CACHE_TIME = 60 * 60 * 24;
export const formatNumber = new Intl.NumberFormat("en", {
	notation: "compact",
}).format;

export const fetchCoinMarketData = async () => {
	const proxyUrl = new URL(env.NEXT_PUBLIC_IQ_GATEWAY_URL);
	const targetUrl =
		"https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=everipedia";

	proxyUrl.searchParams.append("url", targetUrl);
	proxyUrl.searchParams.append("cacheDuration", CACHE_TIME.toString());

	try {
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
		const circulatingSupply = tokenDetails.circulating_supply;
		const marketCap = tokenDetails.market_cap;
		const volume = tokenDetails.total_volume;

		return {
			circulatingSupply,
			marketCap,
			volume,
		};
	} catch (error) {
		console.error("Error fetching data:", error);
		return null;
	}
};
