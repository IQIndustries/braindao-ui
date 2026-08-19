import {
	Container,
	Display,
	Eyebrow,
	MonoLabel,
	PillLink,
	Section,
} from "@/components/layouts/section-kit";
import { alternatesFor } from "@/lib/helpers/alternates";
import { getLockOverview } from "@/modules/getLockOverview";
import { getTvl } from "@/modules/getTVL";
import { numFormatter } from "@/modules/helpers/numFormatter";
import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

const SECTIONS = [
	"what",
	"how",
	"non-transferable",
	"decay",
	"rewards",
	"requirements",
] as const;

export async function generateMetadata(): Promise<Metadata> {
	const [t, locale] = await Promise.all([
		getTranslations("hiiq.meta"),
		getLocale(),
	]);

	return {
		title: t("title"),
		description: t("description"),
		alternates: alternatesFor(locale, "/hiiq"),
		openGraph: {
			title: t("title"),
			description: t("description"),
			url: "https://braindao.org/hiiq",
			type: "website",
		},
	};
}

export default async function HiIQPage() {
	const [totalIqLocked, lockOverview, t] = await Promise.all([
		getTvl(),
		getLockOverview(),
		getTranslations("hiiq"),
	]);

	const stats = [
		{
			label: t("stats.locked"),
			value: totalIqLocked ? `${numFormatter(totalIqLocked)} IQ` : "—",
		},
		{
			label: t("stats.supply"),
			value: lockOverview.totalHiiqSupply
				? `${numFormatter(lockOverview.totalHiiqSupply)} HiIQ`
				: "—",
		},
	];

	return (
		<main>
			<section className="relative isolate overflow-hidden">
				<div aria-hidden="true" className="absolute inset-0 -z-10">
					<div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_0%,rgba(255,26,136,0.16),transparent_70%)]" />
				</div>

				<Container className="pb-16 pt-32 sm:pt-40">
					<Eyebrow icon="lock">{t("eyebrow")}</Eyebrow>

					<Display as="h1" className="mt-5 max-w-3xl">
						{t("title")}
					</Display>

					<p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-neutral-400 text-pretty">
						{t("description")}
					</p>

					<div className="mt-9 flex flex-wrap gap-3">
						<PillLink
							href="https://iq.iqai.com/dashboard/stake"
							external
							analyticsKey="stake-iq"
						>
							{t("cta")}
						</PillLink>
						<PillLink href="/#treasury" variant="outline">
							{t("secondary-cta")}
						</PillLink>
					</div>

					<div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-rule bg-rule-soft sm:grid-cols-2">
						{stats.map((stat) => (
							<div key={stat.label} className="bg-surface px-5 py-6 sm:px-6">
								<MonoLabel>{stat.label}</MonoLabel>
								<p className="mt-3 font-mono text-xl text-white sm:text-2xl">
									{stat.value}
								</p>
							</div>
						))}
					</div>
				</Container>
			</section>

			<Section>
				<div className="grid gap-px overflow-hidden rounded-xl border border-rule bg-rule-soft sm:grid-cols-2">
					{SECTIONS.map((section, index) => (
						<div key={section} className="bg-surface p-6 sm:p-7">
							<MonoLabel>{String(index + 1).padStart(2, "0")}</MonoLabel>
							<h2 className="mt-5 text-lg font-medium tracking-[-0.01em] text-white">
								{t(`sections.${section}.title`)}
							</h2>
							<p className="mt-3 text-sm leading-relaxed text-neutral-400 text-pretty">
								{t(`sections.${section}.description`)}
							</p>
						</div>
					))}
				</div>

				<p className="mt-10 font-mono text-xs uppercase tracking-[0.14em] text-neutral-600">
					{t.rich("source", {
						link: (chunks) => (
							<a
								href="https://iq.wiki/wiki/hiiq"
								target="_blank"
								rel="noopener noreferrer"
								className="text-primary hover:underline"
							>
								{chunks}
							</a>
						),
					})}
				</p>
			</Section>
		</main>
	);
}
