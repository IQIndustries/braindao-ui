import { TreasuryRing } from "@/components/illustrations/treasury-ring";
import { formatNumber } from "@/modules/helpers/numFormatter";
import { getTranslations } from "next-intl/server";
import {
	Display,
	Eyebrow,
	MonoLabel,
	Panel,
	PillLink,
	Section,
} from "./section-kit";

const Treasury = async ({
	totalIqLocked,
	circulatingSupply,
}: {
	totalIqLocked: number | null;
	circulatingSupply: number | null;
}) => {
	const t = await getTranslations("treasury");

	const lockedShare =
		totalIqLocked && circulatingSupply && circulatingSupply > 0
			? Math.min(totalIqLocked / circulatingSupply, 1)
			: null;

	const percent =
		lockedShare !== null ? `${Math.round(lockedShare * 100)}%` : "—";

	return (
		<Section id="treasury">
			<div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
				{/* Copy stays first in the DOM for the stacked layout; on desktop the
				    panel takes the left column, mirroring the token section above. */}
				<div className="lg:order-2 lg:col-span-5">
					<Eyebrow icon="vault">{t("eyebrow")}</Eyebrow>

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

					<div className="mt-8 flex flex-wrap gap-3">
						<PillLink
							href="https://iq.iqai.com/dashboard/treasury"
							external
							analyticsKey="treasury-open"
						>
							{t("primary-cta")}
						</PillLink>
						<PillLink
							href="https://iq.iqai.com/dashboard"
							variant="outline"
							external
							analyticsKey="treasury-dashboard"
						>
							{t("secondary-cta")}
						</PillLink>
					</div>
				</div>

				<Panel className="p-6 sm:p-8 lg:order-1 lg:col-span-7">
					<div className="flex items-center justify-between gap-4">
						<MonoLabel>{t("chart.label")}</MonoLabel>
						<span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400">
							<span
								aria-hidden="true"
								className="size-1.5 rounded-full bg-emerald-400"
							/>
							{t("chart.meta")}
						</span>
					</div>

					<div className="mt-8 flex flex-col items-center gap-8 sm:flex-row sm:gap-12">
						<div className="relative shrink-0">
							<TreasuryRing share={lockedShare} />

							{/* Off dead-centre on purpose: this lands the two baselines where
							    the ring export puts them, at 93 and 112 on its 180 board. */}
							<div className="absolute inset-0 flex flex-col items-center justify-center gap-[3px] pt-0.5">
								<span className="text-[34px] leading-none font-medium tracking-[-0.01em] text-white">
									{percent}
								</span>
								<MonoLabel className="tracking-[0.1em]">
									{t("chart.center")}
								</MonoLabel>
							</div>
						</div>

						<div className="flex flex-col items-center sm:items-start">
							<span className="font-mono text-[32px] leading-none text-white">
								{totalIqLocked
									? formatNumber(totalIqLocked, {
											minDecimals: 2,
											compact: true,
										})
									: "—"}
							</span>

							<div className="mt-6 flex flex-col gap-3">
								<span className="flex items-center gap-2.5">
									<span
										aria-hidden="true"
										className="h-[2px] w-5 rounded-full bg-primary"
									/>
									<MonoLabel>{t("chart.locked")}</MonoLabel>
								</span>
								<span className="flex items-center gap-2.5">
									<span
										aria-hidden="true"
										className="h-[2px] w-5 rounded-full bg-rule-control"
									/>
									<MonoLabel>{t("chart.circulating")}</MonoLabel>
								</span>
							</div>
						</div>
					</div>

					<div className="mt-8 border-t border-rule-soft pt-5">
						<p className="text-sm leading-relaxed text-neutral-400">
							{t("chart.foot", { percent })}
						</p>
					</div>
				</Panel>
			</div>
		</Section>
	);
};

export default Treasury;
