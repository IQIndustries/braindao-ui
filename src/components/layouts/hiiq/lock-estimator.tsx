"use client";

import { BoostGauge } from "@/components/illustrations/boost-gauge";
import { MonoLabel, Panel } from "@/components/layouts/section-kit";
import { cn } from "@/lib/utils";
import { useFormatter, useTranslations } from "next-intl";
import { useState } from "react";

// A lock is measured in whole weeks up to four years, and the boost runs 1x..4x
// linearly over that span — so 104 weeks is 2.5x, which is the curve the decay
// section then walks back down.
const AMOUNT = 1000;
const MIN_WEEKS = 13;
const MAX_WEEKS = 208;
const MAX_BOOST = 4;
const WEEKS_PER_YEAR = 52;
const WEEKS_PER_MONTH = WEEKS_PER_YEAR / 12;
const TICKS = [13, 52, 104, 156, 208] as const;

export const LockEstimator = () => {
	const t = useTranslations("hiiq.estimate");
	const format = useFormatter();
	const [weeks, setWeeks] = useState(MAX_WEEKS);

	const boostFraction = weeks / MAX_WEEKS;
	const boost = 1 + (MAX_BOOST - 1) * boostFraction;
	const trackFraction = (weeks - MIN_WEEKS) / (MAX_WEEKS - MIN_WEEKS);

	// Weeks, not months, below a year: the boost moves with every week, so
	// rounding the live value would leave two positions reading alike.
	const duration = (value: number) =>
		value < WEEKS_PER_YEAR
			? t("duration.weeks", { count: value })
			: t("duration.years", {
					count: Math.round((value / WEEKS_PER_YEAR) * 10) / 10,
				});

	// The scale is read at a glance, so its ticks stay abbreviated — and short
	// enough that all five still fit on a phone-width track.
	const tickLabel = (value: number) =>
		value < WEEKS_PER_YEAR
			? t("duration-short.months", {
					count: Math.round(value / WEEKS_PER_MONTH),
				})
			: t("duration-short.years", { count: value / WEEKS_PER_YEAR });

	const amount = format.number(AMOUNT);
	const multiple = (value: number) =>
		`${format.number(value, { maximumFractionDigits: 2 })}×`;

	return (
		<Panel className="p-5 sm:p-8">
			<div className="flex items-center justify-between gap-4">
				<MonoLabel>{t("panel.label", { amount })}</MonoLabel>
				<span className="font-mono text-[17px] text-white">
					{duration(weeks)}
				</span>
			</div>

			<div className="mt-7">
				<input
					type="range"
					className="lock-range"
					min={MIN_WEEKS}
					max={MAX_WEEKS}
					step={1}
					value={weeks}
					onChange={(event) => setWeeks(Number(event.target.value))}
					aria-label={t("panel.slider")}
					aria-valuetext={duration(weeks)}
					style={
						{ "--range-pct": `${trackFraction * 100}%` } as React.CSSProperties
					}
				/>

				<div className="relative mt-3 h-4">
					{TICKS.map((tick, index) => (
						<span
							key={tick}
							className={cn(
								"absolute top-0 whitespace-nowrap font-mono text-[11px] text-neutral-600",
								index === 0 && "translate-x-0",
								index === TICKS.length - 1 && "-translate-x-full",
								index > 0 && index < TICKS.length - 1 && "-translate-x-1/2",
							)}
							style={{
								left: `${((tick - MIN_WEEKS) / (MAX_WEEKS - MIN_WEEKS)) * 100}%`,
							}}
						>
							{tickLabel(tick)}
						</span>
					))}
				</div>
			</div>

			<div className="mt-7 flex flex-col gap-6 border-t border-rule-soft pt-6 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<MonoLabel>{t("panel.receive")}</MonoLabel>

					<p className="mt-3 font-mono text-[28px] leading-none text-white sm:text-[32px]">
						{t.rich("panel.receive-value", {
							amount: format.number(Math.round(AMOUNT * boost)),
							iq: (chunks) => <span className="text-primary">{chunks}</span>,
						})}
					</p>

					{/* Sentence case, unlike the mono captions: this reads as a footnote
					    to the figure above it rather than a label of its own. */}
					<p className="mt-3 font-mono text-[11px] text-neutral-600">
						{t("panel.from", { amount })}
					</p>
				</div>

				<BoostGauge
					fraction={boostFraction}
					value={multiple(boost)}
					caption={t("panel.boost")}
					min={multiple(1)}
					max={multiple(MAX_BOOST)}
				/>
			</div>
		</Panel>
	);
};
