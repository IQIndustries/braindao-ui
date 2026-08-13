import { IBM_Plex_Mono, Montserrat, Playfair_Display } from "next/font/google";
import localFont from "next/font/local";

export const montserrat = Montserrat({
	subsets: ["latin"],
	display: "swap",
});

export const ibmPlexMono = IBM_Plex_Mono({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	display: "swap",
	variable: "--font-ibm-plex-mono",
});

export const playfairDisplay = Playfair_Display({
	subsets: ["latin"],
	weight: ["400", "500"],
	style: ["normal", "italic"],
	display: "swap",
	variable: "--font-playfair",
});

export const satoshi = localFont({
	src: [
		{
			path: "../../public/fonts/satoshi-light.woff2",
			weight: "300",
			style: "normal",
		},
		{
			path: "../../public/fonts/satoshi-variable.woff2",
			weight: "300 900",
			style: "normal",
		},
		{
			path: "../../public/fonts/satoshi-variable-italic.woff2",
			weight: "300 900",
			style: "italic",
		},
	],
	variable: "--font-satoshi",
	display: "swap",
});
