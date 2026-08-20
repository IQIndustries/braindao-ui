import { LockBoost } from "@/components/illustrations/lock-boost";
import {
	Display,
	Eyebrow,
	MonoLabel,
	Panel,
	Section,
} from "@/components/layouts/section-kit";
import { getTranslations } from "next-intl/server";

export const Mechanism = async () => {
	const t = await getTranslations("hiiq.mechanism");

	return (
		<Section id="mechanism">
			<div className="max-w-2xl">
				<Eyebrow icon="clock">{t("eyebrow")}</Eyebrow>

				<Display className="mt-5">
					{t.rich("title", {
						highlight: (chunks) => (
							<span className="text-primary">{chunks}</span>
						),
					})}
				</Display>

				<p className="mt-6 text-[15px] leading-relaxed text-neutral-400 text-pretty">
					{t("description")}
				</p>
			</div>

			{/* No header rule: the board is the panel's only content, so a divider
			    would cut it off from its own title. */}
			<Panel className="mt-12 p-5 sm:p-7">
				<div className="flex items-center justify-between gap-4">
					<MonoLabel>{t("board.label")}</MonoLabel>
					<span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
						{t("board.meta")}
					</span>
				</div>

				{/* The board keeps its own width down to a phone, so the panel bleeds
				    to the screen edge and scrolls rather than squashing it. */}
				<div className="-mx-5 mt-8 overflow-x-auto px-5 sm:-mx-7 sm:px-7">
					<LockBoost
						labels={{
							source: t("board.source"),
							deposit: t("board.deposit"),
							lock: t("board.lock"),
							lockCaption: t("board.lock-caption"),
							mint: t("board.mint"),
							boost: t("board.boost"),
							boostUnit: t("board.boost-unit"),
							boostCaption: t("board.boost-caption"),
							decay: t("board.decay"),
						}}
					/>
				</div>
			</Panel>
		</Section>
	);
};
