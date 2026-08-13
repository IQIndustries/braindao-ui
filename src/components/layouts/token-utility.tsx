import { getTranslations } from "next-intl/server";
import { Display, Eyebrow, MonoLabel, PillLink, Section } from "./section-kit";

const UTILITIES = ["governance", "staking", "burn"] as const;

const TokenUtility = async () => {
	const t = await getTranslations("utility");

	return (
		<Section id="utility">
			<div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
				<div className="max-w-2xl">
					<Eyebrow glyph="◇">{t("eyebrow")}</Eyebrow>

					<Display className="mt-5">
						{t.rich("title", {
							highlight: (chunks) => (
								<span className="text-primary">{chunks}</span>
							),
						})}
					</Display>

					<p className="mt-6 max-w-xl text-[15px] leading-relaxed text-neutral-400 text-pretty">
						{t("description")}
					</p>
				</div>

				<PillLink href="/hiiq" variant="outline" className="self-start">
					{t("cta")}
				</PillLink>
			</div>

			<div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-3">
				{UTILITIES.map((key, index) => (
					<div key={key} className="bg-surface p-6 sm:p-7">
						<MonoLabel>{String(index + 1).padStart(2, "0")}</MonoLabel>

						<h3 className="mt-5 font-display text-2xl font-normal text-white">
							{t(`${key}.title`)}
						</h3>

						<p className="mt-3 text-sm leading-relaxed text-neutral-400 text-pretty">
							{t(`${key}.description`)}
						</p>
					</div>
				))}
			</div>
		</Section>
	);
};

export default TokenUtility;
