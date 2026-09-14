import { env } from "@/env";

export const HEX_BASE = 16;
export const WEI_TO_ETHER_DIVISOR = 10e17;

interface EthCallParams {
	from?: string;
	to: string;
	data: string;
}

type RPCParams = [EthCallParams, string] | unknown[];

export const alchemyFetch = async (method: string, params: RPCParams) => {
	const response = await fetch(env.IQ_GATEWAY_ALCHEMY_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-api-key": env.IQ_GATEWAY_ALCHEMY_KEY,
		},
		body: JSON.stringify({
			jsonrpc: "2.0",
			id: 1,
			method: method,
			params: params,
		}),
	});

	if (!response.ok) {
		throw new Error(`Gateway responded ${response.status}`);
	}
	const data = await response.json();
	if (data.error) {
		throw new Error(data.error.message);
	}
	return data.result;
};
