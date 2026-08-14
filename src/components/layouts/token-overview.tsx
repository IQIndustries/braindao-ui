import { TokenFlow } from "@/components/illustrations/token-flow";
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

				<Panel className="lg:col-span-7">
					<PanelHeader
						label={t("flow.label")}
						meta={t("flow.meta")}
						metaTone="primary"
					/>
					<div className="p-4 sm:p-5">
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
					<div className="flex items-center gap-2 border-t border-rule px-4 py-3 sm:px-5">
						<span aria-hidden="true" className="h-px w-5 bg-primary" />
						<MonoLabel>{t("flow.legend")}</MonoLabel>
					</div>
				</Panel>
			</div>
		</Section>
	);
};

export default TokenOverview;
