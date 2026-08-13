"use client";

import { appLinks, navLinks } from "@/data/Nav";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { RiCloseLine, RiMenu3Line } from "react-icons/ri";
import LocaleSwitcher from "./locale-switcher";

const STAKE_HREF = appLinks[1].href;

const Navbar = ({ isChristmasTheme }: { isChristmasTheme: boolean }) => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const activeSection = useActiveSection();
	const pathname = usePathname();
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
					"mx-auto flex h-12 w-fit items-center rounded-full border pl-5 pr-1.5 transition-colors duration-300",
					isScrolled
						? "border-rule-strong bg-surface/90 backdrop-blur-xl"
						: "border-rule bg-surface/70 backdrop-blur-md",
				)}
			>
				<Link
					href="/"
					className="flex shrink-0 items-center"
					aria-label="BrainDAO"
				>
					<Image
						src={
							isChristmasTheme
								? "/svgs/Braindao-logo-christmas.svg"
								: "/svgs/Braindao-logo.svg"
						}
						alt="BrainDAO"
						width={110}
						height={32}
						className={cn("h-8 w-auto", isChristmasTheme && "pb-3")}
						priority
					/>
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

				<div className="ml-3 flex items-center gap-1.5 md:ml-0">
					<LocaleSwitcher className="h-8 gap-1 border-rule px-2.5 text-[11px] text-neutral-300" />

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
						className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-rule text-white transition-colors hover:bg-white/10 md:hidden"
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
				<div className="mx-auto mt-2 max-w-[860px] overflow-hidden rounded-2xl border border-rule-strong bg-canvas/95 backdrop-blur-xl md:hidden">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							target={link.target}
							rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
							onClick={() => setIsMenuOpen(false)}
							className="flex h-12 items-center border-b border-rule px-5 text-sm text-neutral-300 transition-colors hover:bg-white/5 hover:text-white"
						>
							{t(`links.${link.key}`)}
						</Link>
					))}
					<Link
						href={STAKE_HREF}
						target="_blank"
						rel="noopener noreferrer"
						onClick={() => setIsMenuOpen(false)}
						className="flex h-12 items-center px-5 text-sm font-medium text-primary"
					>
						{t("stake")}
					</Link>
				</div>
			)}
		</header>
	);
};

export default Navbar;
