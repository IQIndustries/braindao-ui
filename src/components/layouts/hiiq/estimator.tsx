import { Display, Eyebrow, Section } from "@/components/layouts/section-kit";
import { getTranslations } from "next-intl/server";
import { LockEstimator } from "./lock-estimator";

export const Estimator = async () => {
	const t = await getTranslations("hiiq.estimate");

	return (
		<Section id="estimate">
			<div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
				<div className="lg:col-span-5">
					<Eyebrow icon="calculator">{t("eyebrow")}</Eyebrow>

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
						{t("note")}
					</p>
				</div>

				<div className="lg:col-span-7">
					<LockEstimator />
				</div>
			</div>
		</Section>
	);
};
