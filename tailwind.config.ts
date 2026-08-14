import type { Config } from "tailwindcss";

function addScrollbarHideUtility({
	addUtilities,
}: {
	addUtilities: (
		utilities: Record<string, Record<string, string | Record<string, string>>>,
	) => void;
}) {
	const newUtilities = {
		".scrollbar-hide": {
			"-ms-overflow-style": "none",
			"scrollbar-width": "none",
			"&::-webkit-scrollbar": {
				display: "none",
			},
		},
		".text-stroke-black": {
			"-webkit-text-stroke": "1px black",
		},
		".text-stroke-white": {
			"-webkit-text-stroke": "1px white",
		},
	};
	addUtilities(newUtilities);
}

const config: Config = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				border: "hsl(var(--border))",
				// Hairline rules and panel fills carry the structure across the site.
				rule: "rgb(255 255 255 / 0.09)",
				"rule-strong": "rgb(255 255 255 / 0.18)",
				canvas: "#0E0E10",
				surface: "#0E0E10",
				"surface-raised": "#131316",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					"1": "hsl(var(--chart-1))",
					"2": "hsl(var(--chart-2))",
					"3": "hsl(var(--chart-3))",
					"4": "hsl(var(--chart-4))",
					"5": "hsl(var(--chart-5))",
				},
				sidebar: {
					DEFAULT: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
					border: "hsl(var(--sidebar-border))",
					ring: "hsl(var(--sidebar-ring))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			fontFamily: {
				sans: [
					"var(--font-dm-sans)",
					"ui-sans-serif",
					"system-ui",
					"sans-serif",
				],
				display: ["var(--font-instrument-serif)", "Georgia", "serif"],
				mono: ["var(--font-dm-mono)", "ui-monospace", "monospace"],
				satoshi: ["var(--font-satoshi)", "sans-serif"],
				"satoshi-light": ["var(--font-satoshi-light)", "sans-serif"],
			},
			animation: {
				ripple: "ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite",
				fadeIn: "fadeIn 0.5s ease-out",
			},
			keyframes: {
				ripple: {
					"0%, 100%": {
						transform: "translate(-50%, -50%) scale(1)",
					},
					"50%": {
						transform: "translate(-50%, -50%) scale(0.9)",
					},
				},
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
			},
			backgroundImage: {
				twitter: "url('/svgs/twitter-x-line.svg')",
				linkedln: "url('/svgs/linkedln.svg')",
				everipedia: "url('/svgs/everipedia.svg')",
			},
		},
	},
	plugins: [require("tailwindcss-animate"), addScrollbarHideUtility],
};

export default config;
