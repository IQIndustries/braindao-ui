import { getIqStats } from "@/app/[locale]/_actions";
import { navLinks } from "@/data/Nav";
import { chains } from "@/data/chains";
import { getTvl } from "@/modules/getTVL";
import { numFormatter } from "@/modules/helpers/numFormatter";
import { getTranslations } from "next-intl/server";
import { unstable_cache } from "next/cache";
import Link from "next/link";
import ScrollToTopButton from "./scroll-to-top";
import { Container, MonoLabel } from "./section-kit";

const NEWSLETTER_URL =
	"https://www.getdrip.com/forms/505929689/submissions/new";

const socialLinks = [
	{ name: "X", href: "https://x.com/IQofficial" },
	{ name: "Discord", href: "https://discord.com/invite/x9EWvTcPXt" },
	{ name: "Telegram", href: "https://t.me/everipedia" },
];

const ecosystemLinks = [
	{ name: "IQ AI", href: "https://iqai.com/" },
	{ name: "IQ.wiki", href: "https://iq.wiki/" },
	{ name: "IQ Dashboard", href: "https://iq.iqai.com/dashboard/" },
	{ name: "IQ Blog", href: "https://blog.iqai.com/" },
];

// The layout renders the footer on every route, so the reads are cached
// separately from the homepage's own fetches.
const getFooterStats = unstable_cache(
	async () => {
		const [iqStats, locked] = await Promise.all([
			getIqStats(),
			getTvl().catch(() => null),
		]);
		return { price: iqStats.price, mcap: iqStats.mcap, locked };
	},
	["footer-stats"],
	{ revalidate: 300 },
);

const FooterLink = ({
	href,
	children,
	external,
	analyticsKey,
}: {
	href: string;
	children: React.ReactNode;
	external?: boolean;
	analyticsKey?: string;
}) => (
	<Link
		href={href}
		target={external ? "_blank" : undefined}
		rel={external ? "noopener noreferrer" : undefined}
		data-ph-capture-attribute-product-link-clicked={analyticsKey}
		className="text-sm text-neutral-400 transition-colors hover:text-white"
	>
		{children}
	</Link>
);

const FooterColumn = ({
	label,
	children,
}: { label: string; children: React.ReactNode }) => (
	<div>
		<MonoLabel>{label}</MonoLabel>
		<div className="mt-5 flex flex-col items-start gap-3">{children}</div>
	</div>
);

const Footer = async () => {
	const [t, stats] = await Promise.all([
		getTranslations("footer"),
		getFooterStats(),
	]);

	const miniStats = [
		{ label: t("now.price"), value: stats.price ? `$${stats.price}` : "—" },
		{ label: t("now.mcap"), value: stats.mcap ? `$${stats.mcap}` : "—" },
		{
			label: t("now.locked"),
			value: stats.locked ? `${numFormatter(stats.locked)} IQ` : "—",
		},
	];

	return (
		<footer className="border-t border-rule-soft bg-surface">
			<Container className="py-16 sm:py-20">
				<div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
					<div className="lg:col-span-5">
						<Link href="/" className="font-display text-3xl text-white">
							BrainDAO
						</Link>

						<p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-400 text-pretty">
							{t.rich("about.text", {
								link: (chunks) => (
									<a
										href="https://www.brainfund.com/"
										target="_blank"
										rel="noopener noreferrer"
										className="text-primary hover:underline"
									>
										{chunks}
									</a>
								),
							})}
						</p>

						<div className="mt-7 flex flex-wrap gap-2">
							{socialLinks.map((link) => (
								<a
									key={link.name}
									href={link.href}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex h-9 items-center rounded-full border border-rule-control px-4 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-400 transition-colors hover:border-primary/50 hover:text-primary"
								>
									{link.name}
								</a>
							))}
						</div>
					</div>

					<div className="lg:col-span-7">
						<MonoLabel>{t("now.title")}</MonoLabel>

						<div className="mt-5 grid gap-px overflow-hidden rounded-xl border border-rule bg-rule-soft sm:grid-cols-3">
							{miniStats.map((stat) => (
								<div key={stat.label} className="bg-surface-raised px-5 py-5">
									<MonoLabel>{stat.label}</MonoLabel>
									<p className="mt-3 font-mono text-lg text-white">
										{stat.value}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="mt-14 grid gap-10 border-t border-rule-soft pt-12 sm:grid-cols-2 lg:grid-cols-4">
					<FooterColumn label={t("columns.pages")}>
						{navLinks.map((link) => (
							<FooterLink
								key={link.key}
								href={link.href}
								external={link.target === "_blank"}
							>
								{t(`pages.${link.key}`)}
							</FooterLink>
						))}
					</FooterColumn>

					<FooterColumn label={t("columns.ecosystem")}>
						{ecosystemLinks.map((link) => (
							<FooterLink
								key={link.name}
								href={link.href}
								external
								analyticsKey={link.name.toLowerCase()}
							>
								{link.name}
							</FooterLink>
						))}
					</FooterColumn>

					<FooterColumn label={t("columns.resources")}>
						<FooterLink href="https://iq.wiki/wiki/iq" external>
							{t("resources.about")}
						</FooterLink>
						<FooterLink href={chains[0].explorer} external>
							{t("resources.contract")}
						</FooterLink>
						<FooterLink href={`mailto:${t("business.email")}`}>
							{t("business.contact")}
						</FooterLink>
					</FooterColumn>

					<div>
						<MonoLabel>{t("columns.newsletter")}</MonoLabel>
						<p className="mt-5 text-sm leading-relaxed text-neutral-400 text-pretty">
							{t("newsletter.description")}
						</p>
						<a
							href={NEWSLETTER_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="mt-5 inline-flex h-10 items-center rounded-full bg-white px-5 text-[13px] font-medium text-black transition-colors hover:bg-neutral-200"
						>
							{t("newsletter.button")}
						</a>
					</div>
				</div>
			</Container>

			<div className="border-t border-rule-soft">
				<Container className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
					<span className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-600">
						{t("powered", { year: new Date().getFullYear() })}
					</span>

					<div className="flex items-center gap-6">
						<a
							href="https://iq.wiki/privacy"
							target="_blank"
							rel="noopener noreferrer"
							className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-600 transition-colors hover:text-white"
						>
							{t("legal.privacy")}
						</a>
						<span className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-600">
							{t("legal.rights")}
						</span>
						<ScrollToTopButton label={t("scrollTop")} />
					</div>
				</Container>
			</div>
		</footer>
	);
};

export default Footer;
