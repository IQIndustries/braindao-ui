import { Container, MonoLabel } from "@/components/layouts/section-kit";
import { cn } from "@/lib/utils";
import { formatNumber } from "@/modules/helpers/numFormatter";
import { getTranslations } from "next-intl/server";

export const HiIQStats = async ({
	totalIqLocked,
	totalHiiqSupply,
}: {
	totalIqLocked: number | null;
	totalHiiqSupply: number | null;
}) => {
	const t = await getTranslations("hiiq.stats");

	const compact = (value: number | null) =>
		formatNumber(value, { minDecimals: 2, compact: true }) ?? "—";

	const cells = [
		{
			label: t("locked.label"),
			value: compact(totalIqLocked),
			foot: t("locked.foot"),
		},
		{
			label: t("supply.label"),
			value: compact(totalHiiqSupply),
			foot: t("supply.foot"),
		},
	];

	return (
		<section className="border-y border-rule-soft">
			<Container>
				{/* Flush with the column every other section's copy starts at, so the
				    divider lands on the page's centre line. */}
				<div className="grid sm:grid-cols-2">
					{cells.map((cell, index) => (
						<div
							key={cell.label}
							className={cn(
								"flex flex-col gap-2 border-rule-soft py-[30px]",
								index === 0 && "sm:pr-8",
								index === 1 && "border-t sm:border-l sm:border-t-0 sm:pl-8",
							)}
						>
							<MonoLabel>{cell.label}</MonoLabel>

							<span className="font-mono text-[28px] leading-tight text-white">
								{cell.value}
							</span>

							<span className="font-mono text-xs text-neutral-500">
								{cell.foot}
							</span>
						</div>
					))}
				</div>
			</Container>
		</section>
	);
};
