import { chains } from "@/data/chains";
import {
	type ExchangeInfo,
	centralizedExchanges,
	decentralizedExchanges,
} from "@/data/exchanges";
import { cn } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import {
	Display,
	Eyebrow,
	MonoLabel,
	Panel,
	PanelHeader,
	Section,
} from "./section-kit";

// Which venue actually holds the pool on each chain — the routing map is drawn
// from this rather than from an invented liquidity figure.
const ROUTES: Record<(typeof chains)[number]["key"], string[]> = {
	ethereum: ["Sushiswap", "1inch"],
	fraxtal: ["Fraxswap"],
	polygon: ["Quickswap"],
};

const ExchangeRow = ({
	exchange,
	cta,
}: { exchange: ExchangeInfo; cta: string }) => {
	const Logo = exchange.logo;

	return (
		<Link
			href={exchange.link}
			target="_blank"
			rel="noopener noreferrer"
			data-ph-capture-attribute-exchange-clicked={exchange.name.toLowerCase()}
			className="group flex items-center gap-4 px-4 py-4 transition-colors hover:bg-white/[0.02] sm:px-5"
		>
			<span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-rule bg-white/[0.03]">
				<Logo width={18} height={18} />
			</span>

			<span className="min-w-0 flex-1">
				<span className="block truncate text-sm text-white">
					{exchange.name}
				</span>
				<span className="mt-0.5 block font-ibm-plex-mono text-[10px] uppercase tracking-[0.16em] text-neutral-600">
					{exchange.pair}
				</span>
			</span>

			<span className="inline-flex h-8 items-center rounded-full border border-rule px-3.5 font-ibm-plex-mono text-[10px] uppercase tracking-[0.16em] text-neutral-400 transition-colors group-hover:border-rule-strong group-hover:text-white">
				{cta}
			</span>
		</Link>
	);
};

const Markets = async () => {
	const t = await getTranslations("markets");

	const groups = [
		{ label: t("centralized"), exchanges: centralizedExchanges },
		{ label: t("decentralized"), exchanges: decentralizedExchanges },
	];

	const venueCount =
		centralizedExchanges.length + decentralizedExchanges.length;

	return (
		<Section id="markets">
			<div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
				<div className="lg:col-span-5">
					<Eyebrow glyph="◈">{t("eyebrow")}</Eyebrow>

					<Display className="mt-5">
						{t.rich("title", {
							highlight: (chunks) => (
								<span className="text-primary">{chunks}</span>
							),
						})}
					</Display>

					<p className="mt-6 max-w-lg text-[15px] leading-relaxed text-neutral-400 text-pretty">
						{t("description")}
					</p>

					<MonoLabel className="mt-10 block">{t("chains.title")}</MonoLabel>

					<div className="mt-4 flex flex-wrap gap-2">
						{chains.map((chain) => {
							const Logo = chain.logo;
							return (
								<Link
									key={chain.key}
									href={chain.explorer}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 rounded-full border border-rule bg-white/[0.03] py-2 pl-2.5 pr-4 transition-colors hover:border-rule-strong"
								>
									<Logo width={16} height={16} className="shrink-0" />
									<span className="text-[13px] text-white">{chain.name}</span>
									<span className="font-ibm-plex-mono text-[10px] uppercase tracking-[0.14em] text-neutral-600">
										{t(`chains.${chain.key}`)}
									</span>
								</Link>
							);
						})}
					</div>

					<Panel className="mt-8">
						<PanelHeader label={t("routing.label")} meta={t("routing.meta")} />
						<div className="divide-y divide-rule">
							{chains.map((chain) => (
								<div
									key={chain.key}
									className="flex items-center gap-3 px-4 py-3.5 sm:px-5"
								>
									<span className="w-20 shrink-0 font-ibm-plex-mono text-[10px] uppercase tracking-[0.16em] text-neutral-500">
										{chain.name}
									</span>
									<span
										aria-hidden="true"
										className="flex flex-1 items-center gap-1.5"
									>
										<span className="h-px flex-1 bg-rule" />
										<span className="size-1.5 rounded-full bg-primary" />
										<span className="h-px flex-1 bg-rule" />
									</span>
									<span className="shrink-0 text-right font-ibm-plex-mono text-[11px] text-neutral-300">
										{ROUTES[chain.key].join(" · ")}
									</span>
								</div>
							))}
						</div>
					</Panel>
				</div>

				<Panel className="lg:col-span-7">
					<PanelHeader
						label={t("venues.label")}
						meta={t("venues.meta", { count: venueCount })}
					/>

					{groups.map((group, groupIndex) => (
						<div key={group.label}>
							<div
								className={cn(
									"bg-white/[0.02] px-4 py-2.5 sm:px-5",
									groupIndex > 0 && "border-t border-rule",
								)}
							>
								<MonoLabel>{group.label}</MonoLabel>
							</div>
							<div className="divide-y divide-rule border-t border-rule">
								{group.exchanges.map((exchange) => (
									<ExchangeRow
										key={exchange.name}
										exchange={exchange}
										cta={t("trade")}
									/>
								))}
							</div>
						</div>
					))}
				</Panel>
			</div>
		</Section>
	);
};

export default Markets;
