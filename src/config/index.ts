const config = {
	iqAddress:
		process.env.NEXT_PUBLIC_IQ_ADDRESS ||
		"0x0552D756a3E92Aa874EF60F61b7a29030373e869",
	hiiqAddress:
		process.env.NEXT_PUBLIC_HIIQ_ADDRESS ||
		"0xC03bCACC5377b7cc6634537650A7a1D14711c1A3",
	alchemyApiKey: String(process.env.NEXT_PUBLIC_ALCHEMY_API_KEY),
	alchemyChain: process.env.NEXT_PUBLIC_ALCHEMY_CHAIN || "goerli",
	chainId: process.env.NEXT_PUBLIC_CHAIN_ID || "5",
	walletConnectProjectId:
		process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ||
		"e6567b95-7acb-4954-8673-76d34981e18f",
	posthogApiKey: process.env.NEXT_PUBLIC_POSTHOG_KEY || "",
	iqGatewayUrl: process.env.NEXT_PUBLIC_IQ_GATEWAY_URL || "",
	iqGatewayKey: process.env.NEXT_PUBLIC_IQ_GATEWAY_KEY || "",
};

export default config;
