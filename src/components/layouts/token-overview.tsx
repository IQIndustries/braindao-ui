import { TokenFlow } from "@/components/illustrations/token-flow";
import { getTranslations } from "next-intl/server";
import {
	Display,
	Eyebrow,
	MonoLabel,
	Panel,
	PillLink,
	Section,
} from "./section-kit";

const TokenOverview = async () => {
	const t = await getTranslations("token");

	return (
		<Section id="token">
			<div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
				<div className="lg:col-span-5">
					<Eyebrow icon="token">{t("eyebrow")}</Eyebrow>

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
							href="https://iq.wiki/wiki/iq"
							variant="outline"
							external
							analyticsKey="about-iq"
						>
							{t("primary-cta")}
						</PillLink>
						<PillLink href="/#treasury" variant="outline">
							{t("secondary-cta")}
						</PillLink>
					</div>
				</div>

				{/* No header rule or legend rule here: the inset frame around the
				    diagram carries the panel's structure on its own. */}
				<Panel className="p-4 sm:p-5 lg:col-span-7">
					<div className="flex items-center justify-between gap-4 pb-4">
						<MonoLabel>{t("flow.label")}</MonoLabel>
						<span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
							{t("flow.meta")}
						</span>
					</div>
					<div className="rounded-lg border border-rule-soft p-3 sm:p-4">
						<TokenFlow
							source={t("flow.source")}
							labels={{
								governance: {
									kicker: t("flow.governance.kicker"),
									value: t("flow.governance.value"),
								},
								staking: {
									kicker: t("flow.staking.kicker"),
									value: t("flow.staking.value"),
								},
								burn: {
									kicker: t("flow.burn.kicker"),
									value: t("flow.burn.value"),
								},
							}}
						/>
					</div>
					<div className="mt-4 flex items-center gap-6">
						<span className="flex items-center gap-2">
							<span
								aria-hidden="true"
								className="h-[2px] w-5 rounded-full bg-primary"
							/>
							<MonoLabel>{t("flow.legend.flow")}</MonoLabel>
						</span>
						<span className="flex items-center gap-2">
							<span
								aria-hidden="true"
								className="h-[2px] w-5 rounded-full bg-rule-control"
							/>
							<MonoLabel>{t("flow.legend.rail")}</MonoLabel>
						</span>
					</div>
				</Panel>
			</div>
		</Section>
	);
};

export default TokenOverview;
