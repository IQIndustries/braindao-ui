import { DecayCurve } from "@/components/illustrations/decay-curve";
import {
	Display,
	Eyebrow,
	MonoLabel,
	Panel,
	Section,
} from "@/components/layouts/section-kit";
import { getTranslations } from "next-intl/server";

export const Decay = async () => {
	const t = await getTranslations("hiiq.decay");

	return (
		<Section id="decay">
			<div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
				{/* Copy leads in the stacked layout; on desktop the plot takes the left
				    column, the way the estimator's panel takes the right. */}
				<div className="lg:order-2 lg:col-span-5">
					<Eyebrow icon="decay">{t("eyebrow")}</Eyebrow>

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

					<p className="mt-4 max-w-lg text-[15px] leading-relaxed text-neutral-400 text-pretty">
						{t.rich("transfer", {
							strong: (chunks) => (
								<strong className="font-medium text-white">{chunks}</strong>
							),
						})}
					</p>
				</div>

				<Panel className="p-5 sm:p-7 lg:order-1 lg:col-span-7">
					<MonoLabel>{t("chart.label")}</MonoLabel>

					<div className="mt-5">
						<DecayCurve
							labels={{
								extend: t("chart.extend"),
								start: t("chart.start"),
								expiry: t("chart.expiry"),
							}}
						/>
					</div>

					<div className="mt-5 flex flex-wrap items-center gap-6 border-t border-rule-soft pt-5">
						<span className="flex items-center gap-2.5">
							<span
								aria-hidden="true"
								className="h-[2px] w-5 rounded-full bg-primary"
							/>
							<MonoLabel>{t("chart.legend.balance")}</MonoLabel>
						</span>
						<span className="flex items-center gap-2.5">
							<span
								aria-hidden="true"
								className="h-[2px] w-5 rounded-full bg-[repeating-linear-gradient(to_right,#8a8a94_0_4px,transparent_4px_8px)]"
							/>
							<MonoLabel>{t("chart.legend.extended")}</MonoLabel>
						</span>
					</div>
				</Panel>
			</div>
		</Section>
	);
};
