import { LiquidityRouting } from "@/components/illustrations/liquidity-routing";
import { chains } from "@/data/chains";
import { exchanges } from "@/data/exchanges";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Display, Eyebrow, MonoLabel, Panel, Section } from "./section-kit";

const Markets = async () => {
	const t = await getTranslations("markets");

	return (
		<Section id="markets">
			<div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
				<div className="lg:col-span-5">
					<Eyebrow icon="swap">{t("eyebrow")}</Eyebrow>

					<Display className="mt-5">
						{t.rich("title", {
							highlight: (chunks) => (
								<span className="text-primary">{chunks}</span>
							),
						})}
					</Display>

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
									className="inline-flex items-center gap-2 rounded-full border border-rule-control bg-surface-raised px-3.5 py-2 transition-colors hover:border-primary"
								>
									<Logo width={15} height={15} className="shrink-0" />
									<span className="font-mono text-[12px] text-white">
										{chain.name}
									</span>
									<span className="font-mono text-[12px] text-neutral-500">
										· {t(`chains.${chain.key}`)}
									</span>
								</Link>
							);
						})}
					</div>

					{/* Just the label, no header rule: the routing board is the panel's
					    only content, so a divider would cut it off from its title. */}
					<Panel className="mt-8 p-5 sm:p-6">
						<MonoLabel>{t("routing.label")}</MonoLabel>
						<LiquidityRouting
							label={t("routing.label")}
							rows={chains.map((chain) => ({
								key: chain.key,
								from: chain.name,
								to: t(`routing.to.${chain.key}`),
							}))}
						/>
					</Panel>
				</div>

				<Panel className="self-start divide-y divide-rule-soft lg:col-span-7">
					{exchanges.map((exchange) => {
						const Logo = exchange.logo;
						return (
							<Link
								key={exchange.key}
								href={exchange.link}
								target="_blank"
								rel="noopener noreferrer"
								data-ph-capture-attribute-exchange-clicked={exchange.key}
								className="group flex items-center gap-4 px-4 py-4 transition-colors hover:bg-white/[0.02] sm:px-5"
							>
								<span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-rule-control bg-surface-raised transition-colors group-hover:border-primary/40">
									<Logo width={18} height={18} />
								</span>

								<span className="min-w-0 flex-1 truncate text-[15px] font-medium text-white">
									{exchange.name}
								</span>

								<span className="font-mono text-[11px] text-neutral-500">
									{t(`venues.${exchange.key}`)}
								</span>

								<span className="inline-flex h-8 items-center rounded-full border border-rule-action px-4 text-[12px] font-medium text-white transition-colors group-hover:border-primary">
									{t("trade")}
								</span>
							</Link>
						);
					})}
				</Panel>
			</div>
		</Section>
	);
};

export default Markets;
