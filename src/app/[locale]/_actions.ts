import config from "@/config";
import { formatNumber } from "@/modules/helpers/numFormatter";
import axios, { AxiosError } from "axios";
import { type CMCTokenData, cmcTokenDataSchema } from "./_schema";

const CACHE_DURATION_SECONDS_12_HR_IN_SECONDS = 12 * 60 * 60;

export async function getIqStats() {
	try {
		const cmcData = await fetchMarketCapData();

		if (!cmcData) {
			return {
				price: null,
				mcap: null,
				iqPriceChange: null,
				formattedPriceChange: null,
				iqMCapChange: null,
				formattedMCapChange: null,
			};
		}

		const price = formatNumber(cmcData.current_price, {
			minDecimals: 4,
			maxDecimals: 4,
		});

		const mcap = formatNumber(cmcData.market_cap, {
			minDecimals: 2,
			maxDecimals: 2,
			compact: true,
		});

		const iqPriceChange = cmcData.price_change_percentage_24h;
		const iqMCapChange = cmcData.market_cap_change_percentage_24h;

		const formattedPriceChange = formatNumber(iqPriceChange, {
			minDecimals: 2,
			maxDecimals: 2,
			signed: true,
		});

		const formattedMCapChange = formatNumber(iqMCapChange, {
			minDecimals: 2,
			maxDecimals: 2,
			signed: true,
		});

		return {
			price,
			mcap,
			iqPriceChange,
			formattedPriceChange,
			iqMCapChange,
			formattedMCapChange,
		};
	} catch (error) {
		console.error("Error in getIqDetails:", error);
		return {
			price: null,
			mcap: null,
			iqPriceChange: null,
			formattedPriceChange: null,
			iqMCapChange: null,
			formattedMCapChange: null,
		};
	}
}

async function fetchMarketCapData(): Promise<CMCTokenData> {
	try {
		const response = await axios.get(`${config.iqGatewayUrl}`, {
			headers: {
				"x-api-key": config.iqGatewayKey,
			},
			params: {
				url: "https://pro-api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=everipedia",
				cacheDuration: CACHE_DURATION_SECONDS_12_HR_IN_SECONDS,
			},
		});

		return cmcTokenDataSchema.parse(response.data[0]);
	} catch (error) {
		if (error instanceof AxiosError) {
			throw new Error(`CoinMarketCap API error: ${error.message}`);
		}
		throw error;
	}
}
