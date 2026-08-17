import {
	EyebrowIcon,
	type EyebrowIconName,
} from "@/components/icons/eyebrow-icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type React from "react";

export const Container = ({
	children,
	className,
}: { children: React.ReactNode; className?: string }) => (
	<div className={cn("mx-auto w-full max-w-[1180px] px-5 sm:px-8", className)}>
		{children}
	</div>
);

export const Section = ({
	id,
	children,
	className,
}: { id?: string; children: React.ReactNode; className?: string }) => (
	<section
		id={id}
		className={cn(
			"border-t border-rule-soft py-20 sm:py-24 lg:py-28",
			className,
		)}
	>
		<Container>{children}</Container>
	</section>
);

export const Eyebrow = ({
	icon,
	children,
	className,
}: {
	icon: EyebrowIconName;
	children: React.ReactNode;
	className?: string;
}) => (
	<p
		className={cn(
			"flex items-center gap-[9px] font-mono text-xs uppercase tracking-[0.14em] text-primary",
			className,
		)}
	>
		<EyebrowIcon name={icon} />
		{children}
	</p>
);

export const Display = ({
	children,
	className,
	as: Tag = "h2",
}: {
	children: React.ReactNode;
	className?: string;
	as?: "h1" | "h2" | "h3";
}) => (
	<Tag
		className={cn(
			"font-display font-normal tracking-[-0.01em] text-white text-balance",
			Tag === "h1"
				? "text-[37px] leading-[1.02] min-[481px]:text-[46px] min-[769px]:text-[64px] min-[1025px]:text-[92px]"
				: "text-[27px] leading-[1.11] min-[481px]:text-[31px] min-[769px]:text-[38px] min-[1025px]:text-[48px]",
			className,
		)}
	>
		{children}
	</Tag>
);

export const MonoLabel = ({
	children,
	className,
}: { children: React.ReactNode; className?: string }) => (
	<span
		className={cn(
			"font-mono text-xs uppercase tracking-[0.2em] text-neutral-500",
			className,
		)}
	>
		{children}
	</span>
);

export const Panel = ({
	children,
	className,
}: { children: React.ReactNode; className?: string }) => (
	<div
		className={cn(
			"rounded-xl border border-rule bg-surface overflow-hidden",
			className,
		)}
	>
		{children}
	</div>
);

export const PanelHeader = ({
	label,
	meta,
	metaTone = "muted",
}: { label: string; meta?: string; metaTone?: "muted" | "primary" }) => (
	<div className="flex items-center justify-between gap-4 border-b border-rule-soft px-4 py-3 sm:px-5">
		<MonoLabel>{label}</MonoLabel>
		{meta && (
			<span
				className={cn(
					"font-mono text-xs uppercase tracking-[0.2em]",
					metaTone === "primary" ? "text-primary" : "text-neutral-600",
				)}
			>
				{meta}
			</span>
		)}
	</div>
);

const pillBase =
	"inline-flex items-center justify-center gap-2 rounded-full h-10 px-5 text-[13px] font-medium transition-colors whitespace-nowrap";

export const pillStyles = {
	solid: cn(pillBase, "bg-white text-black hover:bg-neutral-200"),
	outline: cn(
		pillBase,
		"border border-rule-action text-white hover:border-primary hover:bg-surface-raised",
	),
	// The hairline greys vanish over the hero video, so that one button gets a
	// white-alpha edge and a tinted backdrop of its own.
	veil: cn(
		pillBase,
		"border border-white/[0.34] bg-canvas/40 text-white backdrop-blur-lg hover:border-primary hover:bg-surface-raised/60",
	),
	ghost: cn(pillBase, "text-neutral-400 hover:text-white"),
};

export const PillLink = ({
	href,
	children,
	variant = "solid",
	external = false,
	className,
	analyticsKey,
}: {
	href: string;
	children: React.ReactNode;
	variant?: keyof typeof pillStyles;
	external?: boolean;
	className?: string;
	analyticsKey?: string;
}) => (
	<Link
		href={href}
		target={external ? "_blank" : undefined}
		rel={external ? "noopener noreferrer" : undefined}
		data-ph-capture-attribute-product-link-clicked={analyticsKey}
		className={cn(pillStyles[variant], className)}
	>
		{children}
	</Link>
);
