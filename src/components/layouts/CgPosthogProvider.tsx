"use client";

import { env } from "@/env";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (typeof window !== "undefined") {
	posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
		api_host: "/ingest",
		ui_host: "https://us.posthog.com",
		// posthog-js defaults to "fallback", which probes /static/<version>/<ext>.js
		// first. The assets CDN does not serve that path, so every page load 404s
		// twice before retrying the unversioned URL.
		strict_script_versioning: false,
	});
}

export const CSPostHogProvider = ({ children }: React.PropsWithChildren) => {
	return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
};
