import { TreasuryRing } from "@/components/illustrations/treasury-ring";
import { numFormatter } from "@/modules/helpers/numFormatter";
import { getTranslations } from "next-intl/server";
import {
	Display,
	Eyebrow,
	MonoLabel,
	Panel,
	PanelHeader,
	PillLink,
	Section,
} from "./section-kit";

const Treasury = async ({
	totalIqLocked,
	totalHiiqSupply,
	circulatingSupply,
}: {
	totalIqLocked: number;
	totalHiiqSupply: number;
	circulatingSupply: number | null;
}) => {
	const t = await getTranslations("treasury");

	const lockedShare =
		circulatingSupply && circulatingSupply > 0
			? Math.min(totalIqLocked / circulatingSupply, 1)
			: null;

	return (
		<Section id="treasury">
			<div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
				<div className="lg:col-span-5">
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
							href="https://iq.iqai.com/dashboard/stake"
							external
							analyticsKey="treasury-stake"
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

				<Panel className="lg:col-span-7">
					<PanelHeader
						label={t("chart.label")}
						meta={t("chart.meta")}
						metaTone="primary"
					/>

					<div className="flex flex-col items-center gap-8 p-6 sm:flex-row sm:gap-10 sm:p-8">
						<div className="relative shrink-0">
							<TreasuryRing share={lockedShare} />

							{/* Off dead-centre on purpose: this lands the two baselines where
							    the ring export puts them, at 93 and 112 on its 180 board. */}
							<div className="absolute inset-0 flex flex-col items-center justify-center gap-[3px] pt-0.5">
								<span className="font-mono text-[32.5px] leading-none tracking-[-0.5px] text-white">
									{lockedShare !== null
										? `${(lockedShare * 100).toFixed(1)}%`
										: "—"}
								</span>
								<MonoLabel className="tracking-[0.1em]">
									{t("chart.center")}
								</MonoLabel>
							</div>
						</div>

						<dl className="w-full divide-y divide-rule-soft">
							<div className="flex items-baseline justify-between gap-4 pb-4">
								<dt className="flex items-center gap-2.5">
									<span
										aria-hidden="true"
										className="size-2 rounded-full bg-primary"
									/>
									<MonoLabel>{t("chart.locked")}</MonoLabel>
								</dt>
								<dd className="font-mono text-base text-white">
									{numFormatter(totalIqLocked)} IQ
								</dd>
							</div>

							<div className="flex items-baseline justify-between gap-4 py-4">
								<dt className="flex items-center gap-2.5">
									<span
										aria-hidden="true"
										className="size-2 rounded-full bg-white/15"
									/>
									<MonoLabel>{t("chart.circulating")}</MonoLabel>
								</dt>
								<dd className="font-mono text-base text-white">
									{circulatingSupply
										? `${numFormatter(circulatingSupply)} IQ`
										: "—"}
								</dd>
							</div>

							<div className="flex items-baseline justify-between gap-4 pt-4">
								<dt className="flex items-center gap-2.5">
									<span
										aria-hidden="true"
										className="size-2 rounded-full border border-rule-control"
									/>
									<MonoLabel>{t("chart.voting")}</MonoLabel>
								</dt>
								<dd className="font-mono text-base text-white">
									{numFormatter(totalHiiqSupply)} HiIQ
								</dd>
							</div>
						</dl>
					</div>

					<div className="border-t border-rule-soft px-4 py-3 sm:px-5">
						<MonoLabel>{t("chart.foot")}</MonoLabel>
					</div>
				</Panel>
			</div>
		</Section>
	);
};

export default Treasury;
