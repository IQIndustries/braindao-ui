import type { Metadata } from "next";
import { getPathname, routing } from "../../../i18n/routing";
import { locales } from "../../../messages/_schema";

// Canonicals have to be built per page, not in the layout, because the layout
// has no access to the pathname and would canonicalise every route to `/`.
export function alternatesFor(
	locale: string,
	href: string,
): Metadata["alternates"] {
	const languages: Record<string, string> = {};

	for (const entry of locales) {
		// `ko` is a hidden alias of `kr` sharing the same URL; emitting both
		// would give two hreflang tags for one page.
		if (entry.isHidden) continue;
		languages[entry.localization] = getPathname({ href, locale: entry.locale });
	}

	languages["x-default"] = getPathname({
		href,
		locale: routing.defaultLocale,
	});

	return { canonical: getPathname({ href, locale }), languages };
}
