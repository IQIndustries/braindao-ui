export interface NavLink {
	key: "home" | "hiiq" | "treasury" | "dashboard";
	href: string;
	target?: string;
	section?: string;
}

export const navLinks: NavLink[] = [
	{
		key: "home",
		href: "/",
	},
	{
		key: "hiiq",
		href: "/hiiq",
	},
	{
		key: "treasury",
		href: "/#treasury",
		section: "treasury",
	},
	{
		key: "dashboard",
		href: "https://iq.iqai.com/dashboard",
		target: "_blank",
	},
];

export const appLinks = [
	{
		title: "IQ Dashboard",
		href: "https://iq.iqai.com/dashboard",
	},
	{
		title: "Stake IQ",
		href: "https://iq.iqai.com/dashboard/stake",
	},
];
