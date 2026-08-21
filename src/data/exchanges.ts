import type { IconProps } from "@/components/icons";
import BinanceIcon from "@/components/icons/binance";
import FraxIcon from "@/components/icons/frax";
import { OneInchIcon } from "@/components/icons/one-inch";
import UpbitIcon from "@/components/icons/upbit";

export interface ExchangeInfo {
	key: "binance" | "upbit" | "oneinch" | "frax";
	name: string;
	logo: React.ComponentType<IconProps>;
	link: string;
}

// The four flagship venues the design features — one row each, no CEX/DEX
// grouping. Row metas ("IQ / USDT", "DEX aggregator", …) live in messages
// under markets.venues, keyed by `key`.
export const exchanges: ExchangeInfo[] = [
	{
		key: "binance",
		name: "Binance",
		logo: BinanceIcon,
		link: "https://www.binance.com/en/trade/IQ_USDT?theme=dark&type=spot",
	},
	{
		key: "upbit",
		name: "Upbit",
		logo: UpbitIcon,
		link: "https://upbit.com/exchange?code=CRIX.UPBIT.KRW-IQ",
	},
	{
		key: "oneinch",
		name: "1inch",
		logo: OneInchIcon,
		link: "https://app.1inch.io/#/1/simple/swap/USDT/IQ",
	},
	{
		key: "frax",
		name: "Frax Finance",
		logo: FraxIcon,
		link: "https://frax.com/swap/?tokenB=0x6efb84bda519726fa1c65558e520b92b51712101&origin&destinationChainId=252",
	},
];
