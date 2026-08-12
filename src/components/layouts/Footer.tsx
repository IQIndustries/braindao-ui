import { getTranslations } from "next-intl/server";
import React from "react";
import ScrollToTopButton from "./scroll-to-top";

const products = [
	{ name: "IQ AI", href: "https://iqai.com/" },
	{ name: "IQ.wiki", href: "https://iq.wiki/" },
	{ name: "Sophia", href: "https://iqai.com/sophia" },
	{ name: "AIDEN", href: "https://iqai.com/aiden" },
	{ name: "IQ Dashboard", href: "https://iq.iqai.com/dashboard/" },
	{ name: "IQ Blog", href: "https://blog.iqai.com/" },
];

const socialLinks = [
	{ name: "X", href: "https://x.com/IQofficial" },
	{ name: "Discord", href: "https://discord.com/invite/x9EWvTcPXt" },
	{ name: "Telegram", href: "https://t.me/everipedia" },
];

const Footer = async () => {
	const t = await getTranslations("footer");

	return (
		<footer className="bg-neutral-950 mt-12 lg:mt-48 shadow-custom">
			<div className="xl:container xl:mx-auto px-4 md:px-10 xl:px-4 flex flex-col gap-6 py-12">
				<div className="flex flex-col lg:flex-row gap-6 w-full">
					<div className="flex flex-row w-full gap-6 md:gap-40 lg:gap-24 items-start">
						<div className="text-muted-foreground">
							<h2 className="text-sm font-bold mb-3 font-satoshi">
								{t("newsletter.title")}
							</h2>
							<p className="text-xs">{t("newsletter.description")}</p>
						</div>
						<a
							href="https://www.getdrip.com/forms/505929689/submissions/new"
							target="_blank"
							rel="noopener noreferrer"
							className="bg-primary hover:bg-primary/50 text-white px-4 sm:px-8 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap self-center lg:mb-10 inline-block text-center no-underline"
						>
							{t("newsletter.button")}
						</a>
					</div>
					<div className="flex flex-row w-full justify-between text-sm gap-8 lg:gap-0">
						<div>
							<h3 className="font-bold mb-4 text-muted-foreground text-sm">
								{t("business.title")}
							</h3>
							<div className="space-y-2">
								<p className="text-primary font-medium">
									{t("business.contact")}
								</p>
								<a
									className="text-muted-foreground hover:underline"
									href={`mailto:${t("business.email")}`}
								>
									{t("business.email")}
								</a>
							</div>
						</div>
						<div>
							<h3 className="font-bold mb-4 text-muted-foreground font-satoshi">
								{t("social.title")}
							</h3>
							<div className="space-y-2 flex flex-col text-left text-foreground hover:text-white transition-colors">
								{socialLinks.map((link) => (
									<a
										key={link.name}
										href={link.href}
										className="text-muted-foreground hover:text-primary transition-colors"
									>
										{link.name}
									</a>
								))}
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col lg:flex-row gap-6 w-full">
					<div className="flex flex-col gap-6 w-full">
						<h2 className="text-sm font-bold mb-0 font-satoshi text-white">
							{t("company.title")}
						</h2>
						<div className="flex flex-row items-center gap-x-6 sm:gap-x-4 md:gap-x-6 lg:gap-x-5 gap-y-2 flex-wrap xl:max-w-[420px]">
							{products.map((link, linkIndex) => (
								<React.Fragment key={link.name}>
									<a
										href={link.href}
										className="block text-white hover:text-gray-300 transition-colors text-sm sm:text-lg lg:text-2xl font-light whitespace-nowrap flex-shrink-0 relative overflow-hidden group"
										data-ph-capture-attribute-product-link-clicked={link.name.toLowerCase()}
									>
										<span className="relative z-10">{link.name}</span>
										<div className="absolute bottom-0 left-0 w-full h-0 bg-[#FF5CAA66] transition-all duration-300 ease-out group-hover:h-[50%]" />
									</a>
									{linkIndex < products.length - 1 &&
										(linkIndex + 1) % 3 !== 0 && (
											<div className="h-8 border-[0.5px] border-neutral-700 rotate-45 transform" />
										)}
									{(linkIndex + 1) % 3 === 0 && (
										<div className="hidden lg:block w-full" />
									)}
								</React.Fragment>
							))}
						</div>
					</div>
					<div className="flex flex-row items-start sm:items-center text-muted-foreground gap-20 sm:gap-60 w-full">
						<p className="flex-1 text-xs sm:text-sm">
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

						<ScrollToTopButton label={t("scrollTop")} />
					</div>
				</div>
			</div>
			<div className="bg-neutral-900">
				<div className="flex flex-col md:flex-row items-center gap-5 md:gap-0 justify-between py-4 xl:container xl:mx-auto text-sm text-[#F3F4F6] px-4 md:px-10 xl:px-4 w-full">
					<span>{t("powered", { year: new Date().getFullYear() })}</span>
					<div className="flex flex-row items-center justify-between sm:w-[50%] gap-9 sm:gap-0">
						<a
							href="https://iq.wiki/privacy"
							target="_blank"
							rel="noopener noreferrer"
							className="hover:text-primary transition-colors"
						>
							{t("legal.privacy")}
						</a>
						<span>{t("legal.rights")}</span>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
