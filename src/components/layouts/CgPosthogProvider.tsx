"use client";

import { env } from "@/env";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (typeof window !== "undefined") {
	posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
		api_host: "/ingest",
		ui_host: "https://us.posthog.com",
	});
}

export const CSPostHogProvider = ({ children }: React.PropsWithChildren) => {
	return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
};
