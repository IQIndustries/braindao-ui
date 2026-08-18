import { RewardFan } from "@/components/illustrations/reward-fan";
import { StakeChecklist } from "@/components/illustrations/stake-checklist";
import { Section } from "@/components/layouts/section-kit";
import { getTranslations } from "next-intl/server";

const REQUIREMENTS = ["iq", "gas", "lock"] as const;

export const Rewards = async () => {
	const t = await getTranslations("hiiq");

	return (
		<Section id="rewards">
			<div className="grid gap-px overflow-hidden rounded-xl border border-rule bg-rule-soft lg:grid-cols-2">
				<div className="bg-surface p-6 sm:p-8">
					{/* Fixed slots: the two boards differ in height, but the headings
					    under them sit on one line across the card. */}
					<div className="h-[100px]">
						<RewardFan
							source={t("payout.board.source")}
							target={t("payout.board.target")}
						/>
					</div>

					<h2 className="mt-5 text-lg font-medium tracking-[-0.01em] text-white">
						{t("payout.title")}
					</h2>

					<p className="mt-3 text-sm leading-relaxed text-neutral-400 text-pretty">
						{t("payout.description")}
					</p>
				</div>

				<div className="bg-surface p-6 sm:p-8">
					<div className="h-[100px]">
						<StakeChecklist />
					</div>

					<h2 className="mt-5 text-lg font-medium tracking-[-0.01em] text-white">
						{t("requirements.title")}
					</h2>

					<ul className="mt-4 flex flex-col gap-2.5">
						{REQUIREMENTS.map((requirement) => (
							<li
								key={requirement}
								className="flex gap-3 text-sm leading-relaxed text-neutral-400"
							>
								<span
									aria-hidden="true"
									className="mt-[7px] size-1.5 shrink-0 rounded-full bg-primary"
								/>
								<span className="text-pretty">
									{t(`requirements.${requirement}`)}
								</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</Section>
	);
};
