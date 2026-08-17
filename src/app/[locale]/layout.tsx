import "../globals.css";
import ClientProviders from "@/components/layouts/ClientProviders";
import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
import ThemeWinterSnow from "@/components/themes/theme-winter-snow";
import { Theme, isTheme } from "@/lib/helpers/theme";
import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { dmMono, dmSans, instrumentSerif, montserrat, satoshi } from "../font";

const TITLE = "BrainDAO - The DAO behind the IQ token.";
const DESCRIPTION =
	"BrainDAO is the legal entity that launched IQ. Track live IQ token stats, stake IQ for HiIQ, and explore the BrainDAO treasury.";

export const metadata: Metadata = {
	title: TITLE,
	description: DESCRIPTION,
	metadataBase: new URL("https://braindao.org"),
	openGraph: {
		title: TITLE,
		url: "https://braindao.org",
		type: "website",
		description: DESCRIPTION,
		images: [
			{
				url: "https://braindao.org/images/og-image.png",
				alt: TITLE,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: TITLE,
		description: DESCRIPTION,
		images: ["https://braindao.org/images/og-image.png"],
		site: "@IQofficial",
		creator: "@IQofficial",
	},
};

export const viewport: Viewport = {
	width: "device-width",
	initialScale: 1.0,
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [locale, messages] = await Promise.all([getLocale(), getMessages()]);

	const isChristmasTheme = isTheme(Theme.enum.christmas);

	return (
		<html
			lang={locale}
			className={`${dmSans.variable} ${dmMono.variable} ${satoshi.variable} ${instrumentSerif.variable} ${montserrat.variable}`}
		>
			<head>
				<link rel="canonical" />
				<link rel="icon" href="/favicon.ico" type="image/x-icon" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin=""
				/>
			</head>
			<body>
				<NextIntlClientProvider locale={locale} messages={messages}>
					<ClientProviders>
						<div>
							<Navbar isChristmasTheme={isChristmasTheme} />
							{children}
							{isChristmasTheme && <ThemeWinterSnow />}
							<Footer />
						</div>
					</ClientProviders>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
