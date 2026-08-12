import { z } from "zod";

export const cmcTokenDataSchema = z.object({
	current_price: z.number(),
	market_cap: z.number(),
	price_change_percentage_24h: z.number(),
	market_cap_change_percentage_24h: z.number(),
});

export type CMCTokenData = z.infer<typeof cmcTokenDataSchema>;
