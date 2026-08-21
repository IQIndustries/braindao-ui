// next.config.ts
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
	skipTrailingSlashRedirect: true,

	// Must be rewrites, not redirects: posthog-js is configured with
	// `api_host: "/ingest"` so these have to be proxied server-side. A redirect
	// hands the browser the posthog.com URL and defeats the proxy entirely.
	async rewrites() {
		return [
			{
				source: "/ingest/static/:path*",
				destination: "https://us-assets.i.posthog.com/static/:path*",
			},
			{
				source: "/ingest/:path*",
				destination: "https://us.i.posthog.com/:path*",
			},
		];
	},
};

export default withNextIntl(nextConfig);
