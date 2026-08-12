import { getTranslations } from "next-intl/server";
import { FaFire, FaLock, FaScaleBalanced } from "react-icons/fa6";
import InViewAnimateBottom from "../transitions/InViewAnimateBottom";

const UTILITIES = [
	{ key: "governance", icon: FaScaleBalanced },
	{ key: "staking", icon: FaLock },
	{ key: "burn", icon: FaFire },
] as const;

const TokenUtility = async () => {
	const t = await getTranslations("utility");

	return (
		<section id="utility" className="text-muted-foreground">
			<div className="px-4 xl:container xl:mx-auto xl:px-4 py-12 sm:py-20">
				<InViewAnimateBottom>
					<h2 className="font-semibold text-foreground text-2xl sm:text-3xl xl:text-4xl font-satoshi">
						{t("title")}
					</h2>
				</InViewAnimateBottom>
				<InViewAnimateBottom>
					<p className="xl:text-lg mt-4 max-w-3xl">{t("description")}</p>
				</InViewAnimateBottom>

				<div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8 xl:gap-6 mt-12">
					{UTILITIES.map(({ key, icon: Icon }) => (
						<InViewAnimateBottom key={key}>
							<div className="h-full border border-neutral-800 rounded-2xl p-6 bg-neutral-950/60">
								<Icon
									size="1.5em"
									className="text-primary"
									aria-hidden="true"
								/>
								<h3 className="text-foreground font-semibold font-satoshi text-xl mt-4">
									{t(`${key}.title`)}
								</h3>
								<p className="mt-2 text-sm xl:text-base">
									{t(`${key}.description`)}
								</p>
							</div>
						</InViewAnimateBottom>
					))}
				</div>
			</div>
		</section>
	);
};

export default TokenUtility;
