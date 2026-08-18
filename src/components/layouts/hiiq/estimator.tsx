import { Display, Eyebrow, Section } from "@/components/layouts/section-kit";
import { getTranslations } from "next-intl/server";
import { LockEstimator } from "./lock-estimator";

export const Estimator = async () => {
	const t = await getTranslations("hiiq.estimate");

	return (
		<Section id="estimate">
			{/* Equal halves: the panel is a peer of the copy here, not the wider
			    exhibit the board sections lead with. */}
			<div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
				<div>
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

				<LockEstimator />
			</div>
		</Section>
	);
};
