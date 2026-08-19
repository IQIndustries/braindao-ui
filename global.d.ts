// global.d.ts
import type en from "./messages/en.json";

// Use type safe message keys with `next-intl`
declare module "next-intl" {
	interface AppConfig {
		Messages: typeof en;
	}
}
