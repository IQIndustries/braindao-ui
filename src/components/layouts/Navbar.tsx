"use client";

import { appLinks, navLinks } from "@/data/Nav";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { RiCloseLine, RiMenu3Line } from "react-icons/ri";
import {
	Link as LocaleLink,
	usePathname as useLocalePathname,
} from "../../../i18n/routing";
import { locales } from "../../../messages/_schema";
import { BrandLogo } from "./brand-logo";
import LocaleSwitcher from "./locale-switcher";

const STAKE_HREF = appLinks[1].href;
const visibleLocales = locales.filter((loc) => !loc.isHidden);

const Navbar = ({ isChristmasTheme }: { isChristmasTheme: boolean }) => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const activeSection = useActiveSection();
	const pathname = usePathname();
	const localePathname = useLocalePathname();
	const locale = useLocale();
	const t = useTranslations("navbar");

	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 12);
		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const isLinkActive = (link: (typeof navLinks)[number]) => {
		if (link.section) return link.section === activeSection;
		if (link.href === "/") {
			return (
				!activeSection && !pathname.replace(/^\/(en|kr|ko|zh)/, "").slice(1)
			);
		}
		return pathname.endsWith(link.href);
	};

	return (
		<header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:pt-5">
			{/* The pill hugs its content rather than stretching to a column width. */}
			<nav
				className={cn(
					"mx-auto flex h-12 w-fit items-center rounded-full border border-rule-control pl-5 pr-1.5 transition-colors duration-300",
					isScrolled
						? "bg-surface/90 backdrop-blur-xl"
						: "bg-surface/70 backdrop-blur-md",
				)}
			>
				<Link href="/" className="flex shrink-0 items-center">
					<BrandLogo christmas={isChristmasTheme} priority />
				</Link>

				<ul className="mx-5 hidden items-center gap-1 md:flex">
					{navLinks.map((link) => {
						const active = isLinkActive(link);
						return (
							<li key={link.href}>
								<Link
									href={link.href}
									target={link.target}
									rel={
										link.target === "_blank" ? "noopener noreferrer" : undefined
									}
									className={cn(
										"inline-flex h-8 items-center px-3 text-[14px] transition-colors",
										active
											? "font-medium text-white"
											: "text-neutral-400 hover:text-white",
									)}
								>
									{t(`links.${link.key}`)}
								</Link>
							</li>
						);
					})}
				</ul>

				<div className="ml-10 flex items-center gap-1.5 md:ml-0">
					<LocaleSwitcher className="hidden h-8 gap-1 px-2.5 text-[11px] text-neutral-300 md:flex" />

					<Link
						href={STAKE_HREF}
						target="_blank"
						rel="noopener noreferrer"
						data-ph-capture-attribute-product-link-clicked="stake-iq"
						className="hidden h-9 items-center rounded-full bg-white px-5 text-[14px] font-semibold text-black transition-colors hover:bg-neutral-200 sm:inline-flex"
					>
						{t("stake")}
					</Link>

					<button
						type="button"
						aria-label="Menu"
						aria-expanded={isMenuOpen}
						onClick={() => setIsMenuOpen((open) => !open)}
						className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-rule-control text-neutral-300 transition-colors hover:border-primary hover:text-primary md:hidden"
					>
						{isMenuOpen ? (
							<RiCloseLine className="h-4 w-4" />
						) : (
							<RiMenu3Line className="h-4 w-4" />
						)}
					</button>
				</div>
			</nav>

			{isMenuOpen && (
				<div className="mx-auto mt-2 overflow-hidden rounded-xl border border-rule-control bg-surface/95 backdrop-blur-xl md:hidden">
					{navLinks.map((link, index) => (
						<Link
							key={link.href}
							href={link.href}
							target={link.target}
							rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
							onClick={() => setIsMenuOpen(false)}
							className={cn(
								"flex h-14 items-center px-5 text-[17px] text-white transition-colors hover:bg-white/5",
								index < navLinks.length - 1 && "border-b border-rule-soft",
							)}
						>
							{t(`links.${link.key}`)}
						</Link>
					))}

					{visibleLocales.map((loc, index) => (
						<LocaleLink
							key={loc.locale}
							locale={loc.locale}
							href={localePathname}
							onClick={() => setIsMenuOpen(false)}
							aria-label={`Change language to ${loc.name}`}
							className={cn(
								"flex h-14 items-center gap-3 border-b border-rule-soft px-5 text-[17px] transition-colors hover:bg-white/5",
								index === 0 && "border-t border-rule",
								loc.locale === locale ? "text-white" : "text-neutral-400",
							)}
						>
							<Image
								src={loc.icon}
								alt=""
								width={28}
								height={20}
								aria-hidden="true"
								className="rounded-sm"
							/>
							{loc.name}
						</LocaleLink>
					))}

					<Link
						href={STAKE_HREF}
						target="_blank"
						rel="noopener noreferrer"
						onClick={() => setIsMenuOpen(false)}
						className="flex h-14 items-center px-5 text-[17px] font-medium text-primary"
					>
						{t("stake")}
					</Link>
				</div>
			)}
		</header>
	);
};

export default Navbar;
