import { TokenBrief } from "@/app/[locale]/_components/token-brief";
import { numFormatter } from "@/modules/helpers/numFormatter";
import { getTranslations } from "next-intl/server";
import DetailCard from "./detailed-card";
import exchangeImage from "./images/treasury/exchange.svg";
import lockImage from "./images/treasury/lock.svg";
import statImage from "./images/treasury/stat.svg";
import VotingImage from "./images/treasury/voting.svg";
import { StatsPointers } from "./stats-pointer";

const Treasury = async ({
	totalIqLocked,
	totalHiiqSupply,
}: {
	totalIqLocked: number;
	totalHiiqSupply: number;
}) => {
	const t = await getTranslations("treasury");

	return (
		<div id="treasury" className="bg-black text-muted-foreground">
			<div className="px-4 xl:container xl:mx-auto xl:px-4 py-12 sm:py-20 xl:py-32">
				<TokenBrief
					title={t("title")}
					description={t("description")}
					action="https://iq.iqai.com/dashboard"
					buttonText={t("button")}
				/>

				<div className="grid sm:grid-cols-2 gap-12 xl:gap-6 mt-16 w-full">
					<StatsPointers
						title={`${numFormatter(totalIqLocked)} IQ`}
						content={t("holdings.total-locked")}
						className="h-[80px] xl:h-[95px] justify-between"
					/>
					<StatsPointers
						title={`${numFormatter(totalHiiqSupply)} HiIQ`}
						content={t("holdings.total-hiiq")}
						className="h-[80px] xl:h-[95px] justify-between"
					/>
				</div>

				<div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-12 xl:gap-6 mt-16 w-full">
					<StatsPointers
						title={t("stats.swap.title")}
						headerSize="text-xl"
						content={t("stats.swap.description")}
						className="gap-4"
					/>
					<StatsPointers
						title={t("stats.lock.title")}
						headerSize="text-xl"
						content={t("stats.lock.description")}
						className="gap-4"
					/>
					<StatsPointers
						title={t("stats.vote.title")}
						headerSize="text-xl"
						content={t("stats.vote.description")}
						className="gap-4"
					/>
					<StatsPointers
						title={t("stats.monitor.title")}
						headerSize="text-xl"
						content={t("stats.monitor.description")}
						className="gap-4"
					/>
				</div>

				<div className="mt-16 w-full flex flex-col gap-6 md:gap-8">
					<div className="flex flex-col sm:flex-row w-full justify-center gap-6 md:gap-6">
						<div className="w-full sm:w-[70%]">
							<DetailCard
								title={t("cards.vote")}
								image={VotingImage}
								alt={t("cards.vote")}
								className="w-full"
								containerClassName="px-10"
								imageClassName="w-full mt-2"
							/>
						</div>

						<div className="w-full sm:w-[35%]">
							<DetailCard
								title={t("cards.exchanges")}
								image={exchangeImage}
								alt={t("cards.exchanges")}
								className="w-full border-l border-t"
								imageClassName="pl-9"
								imageContainerPadding="flex justify-end items-end"
							/>
						</div>
					</div>

					<div className="flex flex-col sm:flex-row w-full justify-center gap-6 md:gap-6">
						<div className="w-full sm:w-[50%]">
							<DetailCard
								title={t("cards.lock")}
								image={lockImage}
								alt={t("cards.lock")}
								className="w-full"
							/>
						</div>

						<div className="w-full sm:w-[50%]">
							<DetailCard
								title={t("cards.stats")}
								image={statImage}
								alt={t("cards.stats")}
								className="w-full"
								imageClassName="pl-11"
								imageContainerPadding="flex justify-end"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Treasury;
