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
				<div className="-mx-5 grid sm:grid-cols-2">
					{cells.map((cell, index) => (
						<div
							key={cell.label}
							className={cn(
								"flex flex-col gap-1.5 border-rule-soft p-[30px]",
								index === 1 && "border-t sm:border-l sm:border-t-0",
							)}
						>
							<MonoLabel>{cell.label}</MonoLabel>

							<span className="font-mono text-2xl text-white">
								{cell.value}
							</span>

							<span className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-600">
								{cell.foot}
							</span>
						</div>
					))}
				</div>
			</Container>
		</section>
	);
};
