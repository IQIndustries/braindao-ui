import { IBM_Plex_Mono, Instrument_Serif, Montserrat } from "next/font/google";
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

export const instrumentSerif = Instrument_Serif({
	subsets: ["latin"],
	weight: ["400"],
	style: ["normal", "italic"],
	display: "swap",
	variable: "--font-instrument-serif",
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
