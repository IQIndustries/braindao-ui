"use client";

import { ThemeProvider } from "next-themes";
import type { PropsWithChildren } from "react";
import { CSPostHogProvider } from "./CgPosthogProvider";

const ClientProviders = ({ children }: PropsWithChildren) => {
	return (
		<ThemeProvider attribute="class" defaultTheme="dark">
			<CSPostHogProvider>{children}</CSPostHogProvider>
		</ThemeProvider>
	);
};

export default ClientProviders;
