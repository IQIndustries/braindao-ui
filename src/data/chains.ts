import { EthereumIcon } from "@/components/icons/ethereum";
import FraxIcon from "@/components/icons/frax";
import { PolygonIcon } from "@/components/icons/polygon";

export interface ChainInfo {
	key: "ethereum" | "fraxtal" | "polygon";
	name: string;
	logo: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	explorer: string;
}

export const chains: ChainInfo[] = [
	{
		key: "ethereum",
		name: "Ethereum",
		logo: EthereumIcon,
		explorer:
			"https://etherscan.io/token/0x579cea1889991f68acc35ff5c3dd0621ff29b0c9",
	},
	{
		key: "fraxtal",
		name: "Fraxtal",
		logo: FraxIcon,
		explorer:
			"https://fraxscan.com/token/0x6efb84bda519726fa1c65558e520b92b51712101",
	},
	{
		key: "polygon",
		name: "Polygon",
		logo: PolygonIcon,
		explorer:
			"https://polygonscan.com/token/0xb9638272ad6998708de56bbc0a290a1de534a578",
	},
];
