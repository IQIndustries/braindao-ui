import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const isProd = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

export const env = createEnv({
	client: {
		NEXT_PUBLIC_IQ_ADDRESS: z
			.string()
			.min(1)
			.default("0x579cea1889991f68acc35ff5c3dd0621ff29b0c9"),
		NEXT_PUBLIC_HIIQ_ADDRESS: z
			.string()
			.min(1)
			.default("0x1bf5457ecaa14ff63cc89efd560e251e814e16ba"),
		NEXT_PUBLIC_IQ_GATEWAY_URL: z
			.string()
			.url()
			.default("https://gateway.braindao.org"),
		NEXT_PUBLIC_POSTHOG_KEY: z
			.string()
			.min(1)
			.default(
				isProd
					? "phc_4MsVVKQqCaAJUKqSLTIbPpEEl4fWW8h8FKV8mj7Wjsf"
					: "phc_cRzhhwKmv122zsoEzDViTsRWaFNxPP9GeZJ5p4eWniZ",
			),
		NEXT_PUBLIC_ALCHEMY_API_KEY: z.string().min(1),
		NEXT_PUBLIC_IQ_GATEWAY_KEY: z.string().min(1),
	},
	experimental__runtimeEnv: {
		NEXT_PUBLIC_IQ_ADDRESS: process.env.NEXT_PUBLIC_IQ_ADDRESS,
		NEXT_PUBLIC_HIIQ_ADDRESS: process.env.NEXT_PUBLIC_HIIQ_ADDRESS,
		NEXT_PUBLIC_IQ_GATEWAY_URL: process.env.NEXT_PUBLIC_IQ_GATEWAY_URL,
		NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
		NEXT_PUBLIC_ALCHEMY_API_KEY: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
		NEXT_PUBLIC_IQ_GATEWAY_KEY: process.env.NEXT_PUBLIC_IQ_GATEWAY_KEY,
	},
	emptyStringAsUndefined: true,
});
