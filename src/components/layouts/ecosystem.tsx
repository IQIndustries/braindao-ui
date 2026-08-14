import { Glyph } from "@/components/illustrations/glyphs";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Display, Eyebrow, Section } from "./section-kit";

const PRODUCTS = [
	{ key: "iqai", href: "https://iqai.com/" },
	{ key: "wiki", href: "https://iq.wiki/" },
	{ key: "dashboard", href: "https://iq.iqai.com/dashboard" },
] as const;

const Ecosystem = async () => {
	const t = await getTranslations("ecosystem");

	return (
		<Section id="ecosystem">
			<div className="max-w-2xl">
				<Eyebrow icon="grid">{t("eyebrow")}</Eyebrow>

				<Display className="mt-5">
					{t.rich("title", {
						highlight: (chunks) => (
							<span className="text-primary">{chunks}</span>
						),
					})}
				</Display>

				<p className="mt-6 text-[15px] leading-relaxed text-neutral-400 text-pretty">
					{t("description")}
				</p>
			</div>

			<div className="mt-12 overflow-hidden rounded-xl border border-rule bg-surface divide-y divide-rule">
				{PRODUCTS.map((product) => (
					<Link
						key={product.key}
						href={product.href}
						target="_blank"
						rel="noopener noreferrer"
						data-ph-capture-attribute-product-link-clicked={product.key}
						className="group flex flex-col gap-4 px-5 py-6 transition-colors hover:bg-white/[0.02] sm:flex-row sm:items-center sm:gap-8 sm:px-7 sm:py-7"
					>
						<Glyph name={product.key} className="size-[30px]" />

						<div className="min-w-0 flex-1">
							<h3 className="text-base font-medium tracking-[-0.01em] text-white sm:text-lg">
								{t(`${product.key}.name`)}
							</h3>
							<p className="mt-1.5 text-sm leading-relaxed text-neutral-400 text-pretty">
								{t(`${product.key}.description`)}
							</p>
						</div>

						<span className="inline-flex h-9 shrink-0 items-center gap-1.5 self-start rounded-full border border-rule px-4 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-400 transition-colors group-hover:border-rule-strong group-hover:text-white sm:self-auto">
							{t("visit")}
							<span aria-hidden="true">↗</span>
						</span>
					</Link>
				))}
			</div>
		</Section>
	);
};

export default Ecosystem;
