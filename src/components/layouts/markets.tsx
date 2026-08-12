import { chains } from "@/data/chains";
import {
	type ExchangeInfo,
	centralizedExchanges,
	decentralizedExchanges,
} from "@/data/exchanges";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import InViewAnimateBottom from "../transitions/InViewAnimateBottom";

const ExchangeGrid = ({ exchanges }: { exchanges: ExchangeInfo[] }) => (
	<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
		{exchanges.map((exchange) => {
			const Logo = exchange.logo;
			return (
				<Link
					key={exchange.name}
					href={exchange.link}
					target="_blank"
					rel="noopener noreferrer"
					data-ph-capture-attribute-exchange-clicked={exchange.name.toLowerCase()}
					className="flex items-center justify-between gap-3 border border-neutral-800 rounded-xl p-3 hover:border-primary/60 transition-colors"
				>
					<div className="flex items-center gap-2">
						<Logo width={20} height={20} />
						<span className="text-sm font-medium text-foreground">
							{exchange.name}
						</span>
					</div>
					<span className="text-[10px] text-muted-foreground">
						{exchange.pair}
					</span>
				</Link>
			);
		})}
	</div>
);

const Markets = async () => {
	const t = await getTranslations("markets");

	return (
		<section id="markets" className="text-muted-foreground">
			<div className="px-4 xl:container xl:mx-auto xl:px-4 py-12 sm:py-20">
				<InViewAnimateBottom>
					<h2 className="font-semibold text-foreground text-2xl sm:text-3xl xl:text-4xl font-satoshi">
						{t("title")}
					</h2>
				</InViewAnimateBottom>
				<InViewAnimateBottom>
					<p className="xl:text-lg mt-4 max-w-3xl">{t("description")}</p>
				</InViewAnimateBottom>

				<div className="grid lg:grid-cols-2 gap-10 mt-12">
					<div>
						<h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
							{t("centralized")}
						</h3>
						<ExchangeGrid exchanges={centralizedExchanges} />
					</div>
					<div>
						<h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-4">
							{t("decentralized")}
						</h3>
						<ExchangeGrid exchanges={decentralizedExchanges} />
					</div>
				</div>

				<div className="mt-16">
					<InViewAnimateBottom>
						<h3 className="text-foreground font-semibold font-satoshi text-xl xl:text-2xl">
							{t("chains.title")}
						</h3>
					</InViewAnimateBottom>
					<InViewAnimateBottom>
						<p className="mt-2 max-w-3xl text-sm xl:text-base">
							{t("chains.description")}
						</p>
					</InViewAnimateBottom>

					<div className="grid sm:grid-cols-3 gap-4 mt-6">
						{chains.map((chain) => {
							const Logo = chain.logo;
							return (
								<InViewAnimateBottom key={chain.key}>
									<Link
										href={chain.explorer}
										target="_blank"
										rel="noopener noreferrer"
										className="flex h-full items-start gap-3 border border-neutral-800 rounded-xl p-4 hover:border-primary/60 transition-colors"
									>
										<Logo width={28} height={28} className="shrink-0" />
										<div>
											<span className="text-foreground font-medium block">
												{chain.name}
											</span>
											<span className="text-sm">
												{t(`chains.${chain.key}`)}
											</span>
										</div>
									</Link>
								</InViewAnimateBottom>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Markets;
