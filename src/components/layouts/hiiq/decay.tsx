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
			{/* Equal halves, the estimator's grid mirrored: copy leads in the stacked
			    layout, and on desktop the plot takes the left column. */}
			<div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
				<div className="lg:order-2">
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

				<Panel className="p-5 sm:p-8 lg:order-1">
					<MonoLabel>{t("chart.label")}</MonoLabel>

					{/* The plot keeps its own width down to a phone, so the panel bleeds
					    to the screen edge and scrolls rather than squashing it. */}
					<div className="-mx-5 mt-5 overflow-x-auto px-5 sm:-mx-8 sm:px-8">
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
