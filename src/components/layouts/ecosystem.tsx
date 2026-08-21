import { Glyph } from "@/components/illustrations/glyphs";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Display, Eyebrow, Section } from "./section-kit";

const PRODUCTS = [
	{ key: "iqai", href: "https://iqai.com/" },
	{ key: "wiki", href: "https://iq.wiki/" },
	{ key: "industries", href: "https://iqindustries.com/" },
] as const;

const Ecosystem = async () => {
	const t = await getTranslations("ecosystem");

	return (
		<Section id="ecosystem">
			<Eyebrow icon="grid">{t("eyebrow")}</Eyebrow>

			<Display className="mt-5">
				{t.rich("title", {
					highlight: (chunks) => <span className="text-primary">{chunks}</span>,
				})}
			</Display>

			<div className="mt-12 border-y border-rule-soft divide-y divide-rule-soft">
				{PRODUCTS.map((product) => (
					<Link
						key={product.key}
						href={product.href}
						target="_blank"
						rel="noopener noreferrer"
						data-ph-capture-attribute-product-link-clicked={product.key}
						className="group flex items-center gap-4 py-5 sm:gap-6 sm:py-6"
					>
						<span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-primary/[0.26] bg-primary/[0.07]">
							<Glyph name={product.key} className="size-[22px]" />
						</span>

						<h3 className="min-w-0 flex-1 truncate font-display text-[22px] tracking-[-0.01em] text-white sm:text-[26px]">
							{t(`${product.key}.name`)}
						</h3>

						<span className="hidden text-[13px] text-neutral-400 underline-offset-4 transition-colors group-hover:text-white group-hover:underline md:block">
							{t(`${product.key}.description`)}
						</span>

						<span className="inline-flex h-8 shrink-0 items-center rounded-full border border-rule-action px-4 text-[12px] font-medium text-white transition-colors group-hover:border-primary">
							{t("visit")}
						</span>
					</Link>
				))}
			</div>
		</Section>
	);
};

export default Ecosystem;
