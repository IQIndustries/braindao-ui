import { Container } from "@/components/layouts/section-kit";
import { cn } from "@/lib/utils";
import { numFormatter } from "@/modules/helpers/numFormatter";
import { getTranslations } from "next-intl/server";
import type { getIqStats } from "../_actions";
import { StatCell, type StatCellProps } from "./token-metric";

type IQStatsData = Awaited<ReturnType<typeof getIqStats>>;

interface IQStatsProps {
	iqStatsData: IQStatsData;
	circulatingSupply: number | null;
	totalIqLocked: number;
}

const DASHBOARD = "https://iq.iqai.com/dashboard";

export async function IQStats({
	iqStatsData,
	circulatingSupply,
	totalIqLocked,
}: IQStatsProps) {
	const t = await getTranslations("introduction.stats");
	const { price, iqPriceChange, mcap, formattedPriceChange } = iqStatsData;

	const cells: StatCellProps[] = [
		{
			label: t("iq-price-title"),
			value: price,
			foot: t("units.change"),
			change: {
				iqChange: iqPriceChange,
				formattedChange: formattedPriceChange,
			},
			link: DASHBOARD,
			errorMessage: t("errors.iq-price"),
		},
		{
			label: t("market-cap-title"),
			value: mcap,
			foot: t("units.usd"),
			link: DASHBOARD,
			errorMessage: t("errors.market-cap"),
		},
		{
			label: t("circulating-supply-title"),
			value: circulatingSupply ? numFormatter(circulatingSupply) : null,
			foot: t("units.iq"),
			link: DASHBOARD,
			errorMessage: t("errors.circulating-supply"),
		},
		{
			label: t("total-locked-title"),
			value: totalIqLocked ? numFormatter(totalIqLocked) : null,
			foot: t("units.locked"),
			link: "/hiiq",
			external: false,
			errorMessage: t("errors.total-locked"),
		},
	];

	return (
		<section className="border-y border-rule bg-[#060607]">
			<Container>
				<div className="-mx-5 grid grid-cols-2 lg:grid-cols-4">
					{cells.map((cell, index) => (
						<StatCell
							key={cell.label}
							{...cell}
							className={cn(
								index % 2 === 1 && "border-l",
								index >= 2 && "border-t",
								"lg:border-l lg:border-t-0",
								index === 0 && "lg:border-l-0",
							)}
						/>
					))}
				</div>
			</Container>
		</section>
	);
}
