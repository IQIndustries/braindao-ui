import { env } from "@/env";
import { unstable_cache } from "next/cache";
import { HEX_BASE, WEI_TO_ETHER_DIVISOR, alchemyFetch } from "./alchemyFetch";
import { DATA_REVALIDATE_SECONDS } from "./cache";

const fetchTotalHiiqSupply = unstable_cache(
	async () => {
		const data = await alchemyFetch("eth_call", [
			{
				to: env.NEXT_PUBLIC_HIIQ_ADDRESS,
				data: "0x18160ddd",
			},
			"latest",
		]);

		const totalHiiq = Number.parseInt(data, HEX_BASE) / WEI_TO_ETHER_DIVISOR;

		if (!Number.isFinite(totalHiiq)) {
			throw new Error(`Malformed hiIQ supply response: ${data}`);
		}

		return totalHiiq;
	},
	["hiiq-total-supply"],
	{ revalidate: DATA_REVALIDATE_SECONDS },
);

const getTotalHiiqSupply = async () => {
	try {
		return await fetchTotalHiiqSupply();
	} catch (error) {
		console.error("🚨 Error getting total hiIQ supply", error);
		return null;
	}
};

export const getLockOverview = async () => {
	const totalHiiqSupply = await getTotalHiiqSupply();

	return {
		totalSupplyError: !totalHiiqSupply,
		isFetchingTotalSupply: false,
		totalHiiqSupply,
	};
};
