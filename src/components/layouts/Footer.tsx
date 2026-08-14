import { getIqStats } from "@/app/[locale]/_actions";
import { SocialIcon, type SocialName } from "@/components/icons/socials";
import { navLinks } from "@/data/Nav";
import { getTvl } from "@/modules/getTVL";
import { formatNumber } from "@/modules/helpers/numFormatter";
import { getTranslations } from "next-intl/server";
import { unstable_cache } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { Container, MonoLabel } from "./section-kit";

const NEWSLETTER_ACTION = "https://www.getdrip.com/forms/505929689/submissions";

const socialLinks: { name: SocialName; label: string; href: string }[] = [
	{ name: "x", label: "X", href: "https://x.com/IQofficial" },
	{
		name: "discord",
		label: "Discord",
		href: "https://discord.com/invite/x9EWvTcPXt",
	},
	{ name: "telegram", label: "Telegram", href: "https://t.me/everipedia" },
];

const ecosystemLinks = [
	{ name: "IQ AI", href: "https://iqai.com/" },
	{ name: "IQ.wiki", href: "https://iq.wiki/" },
	{ name: "IQ Industries", href: "https://iqindustries.ai/" },
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
		className="font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-400 transition-colors hover:text-white"
	>
		{children}
	</Link>
);

const FooterPanel = ({
	label,
	children,
}: { label: string; children: React.ReactNode }) => (
	<div className="rounded-xl border border-rule p-6">
		<MonoLabel>{label}</MonoLabel>
		<div className="mt-5 border-t border-rule-soft pt-5">{children}</div>
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
			value: stats.locked
				? formatNumber(stats.locked, { minDecimals: 2, compact: true })
				: "—",
		},
	];

	return (
		<footer className="border-t border-rule-soft bg-surface">
			<Container className="py-16 sm:py-20">
				<div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
					<div className="lg:col-span-5">
						<Link href="/" className="inline-flex" aria-label="BrainDAO">
							<Image
								src="/svgs/Braindao-logo.svg"
								alt="BrainDAO"
								width={110}
								height={32}
								className="h-8 w-auto"
							/>
						</Link>

						<p className="mt-5 max-w-sm text-sm leading-relaxed text-neutral-400 text-pretty">
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

						<div className="mt-7 flex gap-2.5">
							{socialLinks.map((link) => (
								<a
									key={link.name}
									href={link.href}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={link.label}
									className="inline-flex size-10 items-center justify-center rounded-lg border border-rule-control text-neutral-400 transition-colors hover:border-primary/50 hover:text-primary"
								>
									<SocialIcon name={link.name} />
								</a>
							))}
						</div>
					</div>

					<div className="lg:col-span-7">
						<MonoLabel>
							{t.rich("now.title", {
								iq: (chunks) => <span className="text-primary">{chunks}</span>,
							})}
						</MonoLabel>

						<div className="mt-5 grid gap-3 sm:grid-cols-3">
							{miniStats.map((stat) => (
								<div
									key={stat.label}
									className="rounded-xl border border-rule bg-surface-raised px-5 py-5"
								>
									<MonoLabel>{stat.label}</MonoLabel>
									<p className="mt-3 font-mono text-lg text-white">
										{stat.value}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
					<FooterPanel label={t("columns.pages")}>
						<div className="flex flex-col items-start gap-3.5">
							{navLinks.map((link) => (
								<FooterLink
									key={link.key}
									href={link.href}
									external={link.target === "_blank"}
								>
									{t(`pages.${link.key}`)}
								</FooterLink>
							))}
						</div>
					</FooterPanel>

					<FooterPanel label={t("columns.ecosystem")}>
						<div className="flex flex-col items-start gap-3.5">
							{ecosystemLinks.map((link) => (
								<FooterLink
									key={link.name}
									href={link.href}
									external
									analyticsKey={link.name.toLowerCase().replace(/[\s.]/g, "-")}
								>
									{link.name}
								</FooterLink>
							))}
						</div>
					</FooterPanel>

					<FooterPanel label={t("columns.resources")}>
						<div className="flex flex-col items-start gap-3.5">
							<FooterLink href="https://iq.wiki/wiki/hiiq" external>
								{t("resources.hiiq")}
							</FooterLink>
							<FooterLink href="https://learn.everipedia.org" external>
								{t("resources.learn")}
							</FooterLink>
							<FooterLink href="https://iq.wiki/privacy" external>
								{t("resources.privacy")}
							</FooterLink>
							<FooterLink href={`mailto:${t("business.email")}`}>
								{t("resources.contact")}
							</FooterLink>
						</div>
					</FooterPanel>

					<FooterPanel label={t("columns.newsletter")}>
						<p className="text-sm leading-relaxed text-neutral-400 text-pretty">
							{t("newsletter.description")}
						</p>
						<form
							action={NEWSLETTER_ACTION}
							method="post"
							target="_blank"
							className="mt-4 flex gap-2"
						>
							<input
								type="email"
								name="fields[email]"
								required
								placeholder={t("newsletter.placeholder")}
								className="h-10 min-w-0 flex-1 rounded-full border border-rule-control bg-transparent px-4 text-[13px] text-white placeholder:text-neutral-600 focus:border-primary/60 focus:outline-none"
							/>
							<button
								type="submit"
								className="h-10 shrink-0 rounded-full bg-white px-4 text-[13px] font-medium text-black transition-colors hover:bg-neutral-200"
							>
								{t("newsletter.button")}
							</button>
						</form>
					</FooterPanel>
				</div>
			</Container>

			<div className="border-t border-rule-soft">
				<Container className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
					<div className="flex items-center gap-6">
						<a
							href="https://iq.wiki/privacy"
							target="_blank"
							rel="noopener noreferrer"
							className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-600 transition-colors hover:text-white"
						>
							{t("legal.privacy")}
						</a>
						<a
							href="https://www.brainfund.com/"
							target="_blank"
							rel="noopener noreferrer"
							className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary/80 transition-colors hover:text-primary"
						>
							BrainFund
						</a>
					</div>

					<span className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-600">
						{t("powered", { year: new Date().getFullYear() })}
					</span>

					<span className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-600">
						{t.rich("legal.tagline", {
							iq: (chunks) => <span className="text-primary">{chunks}</span>,
						})}
					</span>
				</Container>
			</div>
		</footer>
	);
};

export default Footer;
