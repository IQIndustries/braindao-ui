import { DM_Mono, DM_Sans, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";

export const dmSans = DM_Sans({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-dm-sans",
});

export const dmMono = DM_Mono({
	subsets: ["latin"],
	weight: ["300", "400", "500"],
	display: "swap",
	variable: "--font-dm-mono",
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
