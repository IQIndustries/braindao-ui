import { env } from "@/env";
import { unstable_cache } from "next/cache";
import { HEX_BASE, WEI_TO_ETHER_DIVISOR, alchemyFetch } from "./alchemyFetch";
import { DATA_REVALIDATE_SECONDS } from "./cache";

const fetchTvl = unstable_cache(
	async () => {
		const data = await alchemyFetch("eth_call", [
			{
				from: "0x0000000000000000000000000000000000000000",
				to: env.NEXT_PUBLIC_IQ_ADDRESS,
				data: `0x70a08231000000000000000000000000${env.NEXT_PUBLIC_HIIQ_ADDRESS.replace(
					"0x",
					"",
				)}`,
			},
			"latest",
		]);

		const tvl = Number.parseInt(data, HEX_BASE) / WEI_TO_ETHER_DIVISOR;

		if (!Number.isFinite(tvl)) {
			throw new Error(`Malformed IQ balance response: ${data}`);
		}

		return Math.floor(tvl);
	},
	["iq-tvl"],
	{ revalidate: DATA_REVALIDATE_SECONDS },
);

export const getTvl = async () => {
	try {
		return await fetchTvl();
	} catch (error) {
		// A flaky RPC shouldn't take the page down with it: every consumer
		// renders its own placeholder when the figure is missing.
		console.error("🚨 Error getting TVL", error);
		return null;
	}
};
