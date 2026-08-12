"use client";

import ExchangesMenubar from "@/app/[locale]/_components/exchange-menu";
import { appLinks, navLinks } from "@/data/Nav";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { RiMenu3Line } from "react-icons/ri";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import LocaleSwitcher from "./locale-switcher";

const Navbar = ({ isChristmasTheme }: { isChristmasTheme: boolean }) => {
	const [state, setState] = useState({
		isScrolled: false,
		isMobileMenuOpen: false,
		isLaunchAppOpen: false,
	});

	const activeSection = useActiveSection();
	const scrollHandlerRef = useRef<(() => void) | null>(null);
	const t = useTranslations("navbar");

	const handleScroll = React.useCallback(() => {
		setState((prev) => ({ ...prev, isScrolled: window.scrollY > 50 }));
	}, []);

	useEffect(() => {
		scrollHandlerRef.current = handleScroll;
		window.addEventListener("scroll", handleScroll);
		handleScroll();
		return () => {
			if (scrollHandlerRef.current) {
				window.removeEventListener("scroll", scrollHandlerRef.current);
			}
		};
	}, [handleScroll]);

	return (
		<motion.div
			className={cn(
				"fixed top-0 left-0 right-0 w-full mx-auto max-w-[1440px] z-50 transition-all duration-300 text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent backdrop-blur-md",
				state.isScrolled
					? "bg-black/40 backdrop-blur-md max-w-6xl mt-0 md:mt-2 lg:mt-5 md:rounded-full"
					: "bg-transparent",
			)}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
		>
			<header className="flex flex-col z-50 lg:px-4 px-3 py-1">
				<div className="flex justify-between items-center w-full transition-all duration-300">
					<motion.div
						className="flex gap-2 items-center text-lg font-medium w-fit"
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3, delay: 0.1 }}
					>
						<Link href="/" className="w-fit">
							{isChristmasTheme ? (
								<Image
									src="/svgs/Braindao-logo-christmas.svg"
									alt="BrainDAO Logo"
									width={120}
									height={120}
									objectPosition="top"
									objectFit="contain"
									className="pb-4"
								/>
							) : (
								<Image
									src="/svgs/Braindao-logo.svg"
									alt="BrainDAO Logo"
									width={144}
									height={144}
								/>
							)}
						</Link>
					</motion.div>

					<motion.nav
						initial="hidden"
						animate="visible"
						className="hidden xl:flex gap-8 xl:gap-6 text-sm lg:text-base"
					>
						{navLinks.map((link, index) => {
							const isActive = Boolean(
								link.section && link.section === activeSection,
							);

							return (
								<motion.a
									key={link.href}
									href={link.href}
									target={link.target}
									rel={
										link.target === "_blank" ? "noopener noreferrer" : undefined
									}
									className={cn(
										"transition-colors duration-200",
										isActive ? "text-primary" : "hover:text-primary",
									)}
									variants={{
										hidden: { opacity: 0, x: -20 },
										visible: {
											opacity: 1,
											x: 0,
											transition: { delay: index * 0.1, duration: 0.3 },
										},
									}}
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									{t(`links.${link.key}`)}
								</motion.a>
							);
						})}
					</motion.nav>

					<motion.div
						className="flex gap-2 items-center"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.3, delay: 0.3 }}
					>
						<div className="hidden xl:flex gap-2 items-center">
							<LocaleSwitcher className="transition-all duration-200" />
							<ExchangesMenubar />
							<Popover
								open={state.isLaunchAppOpen}
								onOpenChange={(open) =>
									setState((prev) => ({ ...prev, isLaunchAppOpen: open }))
								}
							>
								<PopoverTrigger asChild>
									<motion.div
										whileHover={{ scale: 1.03 }}
										whileTap={{ scale: 0.97 }}
									>
										<Button
											type="button"
											size={state.isScrolled ? "sm" : "lg"}
											className={cn(
												"capitalize",
												state.isScrolled
													? "text-xs px-3 h-9"
													: "text-sm px-4 h-11",
											)}
										>
											<span>{t("launch-app")}</span>
											<ChevronDown
												className={cn(state.isScrolled ? "h-3 w-3" : "h-4 w-4")}
											/>
										</Button>
									</motion.div>
								</PopoverTrigger>
								<PopoverContent
									className="w-44 px-4 bg-black border-border rounded-xl"
									align="start"
									sideOffset={10}
									alignOffset={-40}
								>
									<div className="space-y-2">
										{appLinks.map((link) => (
											<motion.a
												key={link.href}
												href={link.href}
												target="_blank"
												rel="noopener noreferrer"
												className="w-full h-8 flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200 group"
												whileHover={{ x: 3 }}
												onClick={() =>
													setState((prev) => ({
														...prev,
														isLaunchAppOpen: false,
													}))
												}
											>
												{link.title}
											</motion.a>
										))}
									</div>
								</PopoverContent>
							</Popover>
						</div>

						<div className="xl:hidden flex gap-2 items-center">
							<LocaleSwitcher className="transition-all duration-200" />
							<ExchangesMenubar />
							<Popover
								open={state.isMobileMenuOpen}
								onOpenChange={(open) =>
									setState((prev) => ({ ...prev, isMobileMenuOpen: open }))
								}
							>
								<PopoverTrigger asChild>
									<motion.div whileTap={{ scale: 0.95 }}>
										<Button
											type="button"
											size="lg"
											className="rounded-full border border-white/20 bg-transparent hover:bg-white/10 p-3"
										>
											<RiMenu3Line className="h-10 w-10" />
										</Button>
									</motion.div>
								</PopoverTrigger>

								<PopoverContent
									className="w-64 p-6 bg-black border-neutral-700 rounded-xl"
									align="end"
									sideOffset={10}
								>
									<div className="space-y-2">
										{navLinks.map((link, index) => (
											<motion.a
												key={link.href}
												href={link.href}
												target={link.target}
												rel={
													link.target === "_blank"
														? "noopener noreferrer"
														: undefined
												}
												className="block text-muted-foreground hover:text-primary text-sm py-2 transition-colors duration-200"
												initial={{ opacity: 0, x: -10 }}
												animate={{
													opacity: 1,
													x: 0,
													transition: { delay: index * 0.05 + 0.2 },
												}}
												whileTap={{ scale: 0.95 }}
												onClick={() =>
													setState((prev) => ({
														...prev,
														isMobileMenuOpen: false,
													}))
												}
											>
												{t(`links.${link.key}`)}
											</motion.a>
										))}

										<div className="border-t border-neutral-700 !mt-4 pt-2">
											{appLinks.map((link) => (
												<motion.a
													key={link.href}
													href={link.href}
													target="_blank"
													rel="noopener noreferrer"
													className="block text-muted-foreground hover:text-primary text-sm py-2 transition-colors duration-200"
													whileTap={{ scale: 0.95 }}
													onClick={() =>
														setState((prev) => ({
															...prev,
															isMobileMenuOpen: false,
														}))
													}
												>
													{link.title}
												</motion.a>
											))}
										</div>
									</div>
								</PopoverContent>
							</Popover>
						</div>
					</motion.div>
				</div>
			</header>
		</motion.div>
	);
};

export default Navbar;
