import { env } from "@/env";
import { HEX_BASE, WEI_TO_ETHER_DIVISOR, alchemyFetch } from "./alchemyFetch";

export const getTvl = async () => {
	try {
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

		let tvl = Number.parseInt(data, HEX_BASE);
		tvl = tvl / WEI_TO_ETHER_DIVISOR;
		return Math.floor(tvl);
	} catch (error) {
		console.error("🚨 Error getting TVL", error);
		throw new Error("🚨 Error getting TVL");
	}
};
